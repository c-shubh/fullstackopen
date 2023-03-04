import Fuse from "fuse.js";
import { useState } from "react";
import ContactsDisplay from "./ContactsDisplay";

const fuse = new Fuse([], {
  keys: ["name"],
});

const Search = ({ persons }) => {
  const [filterStr, setFilterStr] = useState("");
  fuse.setCollection(persons);

  const handleFilterStrChange = (e) => setFilterStr(e.target.value);

  return (
    <div>
      <div>
        <label htmlFor="name-filter">Fuzzy search by name: </label>
        <input
          type="text"
          id="name-filter"
          onChange={handleFilterStrChange}
          value={filterStr}
        />
      </div>
      <ContactsDisplay
        persons={fuse.search(filterStr).map((res) => res.item)}
      />
    </div>
  );
};

export default Search;
