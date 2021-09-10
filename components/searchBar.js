import { useCallback } from "react";
/**
 * A search bar that only mutates the query value, passed from the parent, when the user presses enter
 */
export default function SearchBar({ query, setQuery }) {
  const handleKeyDown = useCallback((event) => {
    if (event.key === "Enter") {
      const q = event.target.value;
      setQuery(q);
    }
  }, []);
  return (
    <>
      <input
        defaultValue={query}
        onKeyDown={handleKeyDown}
        placeholder="Search posts"
        type="text"
      />
    </>
  );
}
