import React from "react";
import Item from "./Item";

const List = React.memo(({ list, removeItemHandler }) => (
  <ul>
    <li style={{ display: "flex" }}>
      <span style={{ width: "40%" }}>Title</span>
      <span style={{ width: "30%" }}>Author</span>
      <span style={{ width: "10%" }}>Comments</span>
      <span style={{ width: "10%" }}>Points</span>
      <span style={{ width: "10%" }}>Actions</span>
    </li>

    {list.map((item) => (
      <Item
        item={item}
        key={item.objectID}
        removeItemHandler={removeItemHandler}
      />
    ))}
  </ul>
));

export default List;
