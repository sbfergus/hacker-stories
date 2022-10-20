import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import React from "react";

import { storiesReducer, SearchForm } from "./App";
import Item from "./Item";
import { InputWithLabel } from "./InputWithLabel";
import { List } from "./List";
import App from "./App";
import axios from "axios";

vi.mock("axios");

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBeTruthy();
  });

  it("false to be false", () => {
    expect(false).toBeFalsy();
  });
});

const storyOne = {
  title: "React",
  url: "https://reactjs.org/",
  author: "Jordan Wilke",
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: "Redux",
  url: "https://redux.js.org/",
  author: "Dan Abramov, Andrew Clarke",
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe("storiesReducer", () => {
  it("removes a story from all stories", () => {
    const action = { type: "REMOVE_STORY", payload: storyOne };
    const state = { data: stories, isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});

describe("Item", () => {
  it("renders all properties", () => {
    render(<Item item={storyOne} />);
  });
  // expect(screen.getByText("Jordan Wilke")).toBeInTheDocument();
  // expect(screen.getByText("React")).toHaveAttribute(
  //   "href",
  //   "https://reactjs.org/"

  //   it("renders a clickable dismiss button", () => {
  //     render(<Item item={storyOne} />);
  //     //screen.getRoleBy("");
  //     expect(screen.getByRole("button")).toBeInTheDocument();
  //   });

  //   it("clicking the dismiss button calls the callback handler", () => {
  //     const handleRemoveItem = vi.fn();

  //     render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);

  //     fireEvent.click(screen.getRoleBy("button"));

  //     expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  //   });
});

// describe("SearchForm", () => {
//   const searchFormProps = {
//     searchTerm: "React",
//     onSearchInput: vi.fn(),
//     onSearchSubmit: vi.fn(),
//   };

//   it("renders the input with its value", () => {
//     render(<SearchForm {...searchFormProps} />);
//     expect(screen.getByDisplayValue("React")).toBeInTheDocument();
//   });

//   it("renders the correct label", () => {
//     render(<SearchForm {...searchFormProps} />);

//     expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
//   });

//   it("calls onSearchInput on input field change", () => {
//     render(<SearchForm {...searchFormProps} />);

//     fireEvent.change(screen.getByDisplayValue("React"), {
//       target: { value: "Redux" },
//     });

//     expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
//   });

//   it("calls onSearchSubmit on button submit click", () => {
//     render(<SearchForm {...searchFormProps} />);

//     fireEvent.submit(screen.getByRole("button"));

//     expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
//   });
// });

describe("App", () => {
  // it("succeeds fetching data", async () => {
  //   const promise = Promise.resolve({
  //     data: {
  //       hits: stories,
  //     },
  //   });

  //   axios.get.mockImplementationOnce(() => promise);

  //   render(<App />);

  //   expect(screen.queryByText(/Loading/)).toBeInTheDocument();

  //   screen.debug();

  //   await waitFor(async () => await promise);

  //   expect(screen.queryByText(/Loading/)).toBeNull();

  //   expect(screen.getByText("React")).toBeInTheDocument();
  //   expect(screen.getByText("Redux")).toBeInTheDocument();
  //   expect(screen.getAllByText("Dismiss").length).toBe(2);
  // });

  // it("fails fetching data", async () => {
  //   const promise = Promise.reject();

  //   axios.get.mockImplementationOnce(() => promise);

  //   render(<App />);

  //   expect(screen.getByText(/Loading/)).toBeInTheDocument();

  //   try {
  //     await waitFor(async () => await promise);
  //   } catch (error) {
  //     expect(screen.queryByText(/Loading/)).toBeNull();
  //     expect(screen.queryByText(/went wrong/)).toBeInTheDocument();
  //   }
  // });

  it("removes a story", async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    await waitFor(async () => await promise);

    expect(screen.getAllByText("Dismiss").length).toBe(2);
    expect(screen.getByText("Jordan Walke")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("Dismiss")[0]);

    expect(screen.getAllByText("Dismiss").length).toBe(1);
    expect(screen.queryByText("Jordan Walke")).toBeNull();
  });
});
