import * as React from "react";
import { useState } from "react";

import List from "./List";
import Search from "./Search";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("react");
  const stories = [
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
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch} searchTerm={searchTerm} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

export default App;
