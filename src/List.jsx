import React from "react";
import Item from "./Item";

const List = React.memo(
  ({ list, removeItemHandler }) =>
    console.log("B:List") || (
      <ul>
        {list.map((item) => (
          <Item
            item={item}
            key={item.objectID}
            removeItemHandler={removeItemHandler}
          />
        ))}
      </ul>
    )
);

export default List;
