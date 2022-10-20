import styles from "./Item.module.css";
import buttonstyles from "./Button.module.css";

const Item = ({ item, removeItemHandler }) => {
  return (
    <li className={styles.item}>
      <span style={{ width: "40%" }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: "30%" }}>{item.author}</span>
      <span style={{ width: "10%" }}>{item.num_comments}</span>
      <span style={{ width: "10%" }}>{item.points}</span>
      <span style={{ width: "10%" }}>
        <button
          className={(buttonstyles.button, buttonstyles.button_small)}
          onClick={() => removeItemHandler(item)}
        >
          Dismiss
        </button>
      </span>
    </li>
  );
};

export default Item;
