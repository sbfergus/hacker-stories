import * as React from "react";
import { useState, useEffect } from "react";

import List from "./List";
import InputWithLabel from "./InputWithLabel";

const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [stories, setStories] = useState([
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Wilke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clarke",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const removeItemHandler = (id) => {
    return setStories(stories.filter((story) => story.objectID !== id));
  };

  const searchedStories = stories.filter((story) =>
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

      <List list={searchedStories} removeItemHandler={removeItemHandler} />
    </div>
  );
};

export default App;
