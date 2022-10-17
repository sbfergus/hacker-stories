const Search = ({ onSearch, searchTerm }) => {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" onChange={onSearch} value={searchTerm} />
    </div>
  );
};
export default Search;
