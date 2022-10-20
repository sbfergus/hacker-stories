import { useRef, useEffect } from "react";
import styles from "./InputWithLabel.module.css";

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      &nbsp;
      <input
        ref={inputRef}
        type={type}
        id={id}
        onChange={onInputChange}
        value={value}
        autoFocus={isFocused}
        className={styles.input}
      />
    </>
  );
};
export default InputWithLabel;
