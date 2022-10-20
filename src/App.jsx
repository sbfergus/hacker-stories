import * as React from "react";
import axios from "axios";
import { sortBy } from "lodash";
import { useState, useEffect, useReducer, useCallback, useRef } from "react";

import List from "./List";
import Item from "./Item";
import SearchForm from "./SearchForm";

import "./App.css";

const useStorageState = (key, initialState) => {
  const isMounted = useRef(false);
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const extractSearchTerm = (url) => url.replace(API_ENDPOINT, "");

const getLastSearches = (urls) => urls.slice(-5).map(extractSearchTerm);

const getUrl = (searchTerm) => `${API_ENDPOINT}${searchTerm}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [urls, setUrls] = useState([getUrl(searchTerm)]);

  const handleFetchStories = useCallback(async () => {
    if (searchTerm === "") return;

    dispatchStories({ type: "STORIES_FETCH_INIT" });

    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch (error) {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [urls]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (searchTerm) => {
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
  };

  const handleSearchSubmit = (e) => {
    handleSearch(searchTerm);

    e.preventDefault();
  };

  const handleLastSearch = (searchTerm) => {
    handleSearch(searchTerm);
  };

  const lastSearches = getLastSearches(urls);

  const removeItemHandler = React.useCallback((item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  }, []);

  console.log("B:App");

  return (
    <div className="container">
      <h1 className="headline-primary">My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        handleSearchInput={handleSearchInput}
        handleSearchSubmit={handleSearchSubmit}
      />

      {lastSearches.map((searchTerm, index) => (
        <button
          key={searchTerm + index}
          type="button"
          onClick={() => handleLastSearch(searchTerm)}
        >
          {searchTerm}
        </button>
      ))}

      <hr />

      {stories.isError && <p>Something went wrong...</p>}

      {stories.isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <List list={stories.data} removeItemHandler={removeItemHandler} />
      )}
    </div>
  );
};

export default App;

export { storiesReducer, SearchForm, Item };
