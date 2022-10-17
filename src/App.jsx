import * as React from "react";
import { useState, useEffect, useReducer } from "react";

import List from "./List";
import InputWithLabel from "./InputWithLabel";
import Item from "./Item";

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
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

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    fetch(`${API_ENDPOINT}react`)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.hits,
        });
        setIsLoading(false);
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const removeItemHandler = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const searchedStories = stories.data.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      {stories.isError && <p>Something went wrong...</p>}

      {stories.isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <List list={searchedStories} removeItemHandler={removeItemHandler} />
      )}
    </div>
  );
};

export default App;
