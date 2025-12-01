import "./searchBar.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by part number or description..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
