import Item from "./Item";

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item item={item} key={item.objectID} />
    ))}
  </ul>
);

export default List;
