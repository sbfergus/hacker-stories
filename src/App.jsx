import * as React from "react";

const title = "React!";

const welcome = {
  title: "React",
  greeting: "Hey",
};

const list = [
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

function App() {
  return (
    <div>
      <h1>
        {welcome.greeting}, {welcome.title}
      </h1>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" />
      {list.map((item) => {
        return (
          <div key={item.objectID}>
            <a href={item.url}>
              <h2>{item.title}</h2>
            </a>

            <p>{item.author}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
