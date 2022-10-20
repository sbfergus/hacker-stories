import InputWithLabel from "./InputWithLabel";
import buttonstyles from "./Button.module.css";
import styles from "./SearchForm.module.css";

const SearchForm = ({ searchTerm, handleSearchInput, handleSearchSubmit }) => {
  return (
    <form onSubmit={handleSearchSubmit} className={styles.search_form}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <button
        type="submit"
        disabled={!searchTerm}
        className={(buttonstyles.button, buttonstyles.button_large)}
      >
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
