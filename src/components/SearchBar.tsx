import { useState, useCallback } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onReset: () => void;
  loading?: boolean;
}

export const SearchBar = ({
  onSearch,
  onReset,
  loading = false,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleReset = useCallback(() => {
    setSearchTerm("");
    onReset();
  }, [onReset]);

  return (
    <div className="search-container">
      <p>Search</p>
      <p>
        Searching for: <span id="search-term">{searchTerm}</span>
      </p>
      <input
        style={{ border: "1px solid black" }}
        onChange={handleSearchChange}
        value={searchTerm}
        placeholder="Search advocates..."
        disabled={loading}
      />
      <button onClick={handleReset} disabled={loading}>
        Reset Search
      </button>
    </div>
  );
};
