const Item = ({ item, removeItemHandler }) => {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <button onClick={() => removeItemHandler(item)}>Dismiss</button>
    </li>
  );
};

export default Item;
