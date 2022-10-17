import Item from "./Item";

const List = ({ list, removeItemHandler }) => (
  <ul>
    {list.map((item) => (
      <Item
        item={item}
        key={item.objectID}
        removeItemHandler={removeItemHandler}
      />
    ))}
  </ul>
);

export default List;
