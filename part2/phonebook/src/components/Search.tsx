import Fuse from "fuse.js";
import { Person } from "../types";
import { useState } from "react";
import ContactsDisplay from "./ContactsDisplay";
import type { ChangeEvent } from "react";

const fuse = new Fuse([], {
  keys: ["name"],
});

interface SearchProps {
  persons: Person[];
}

const Search = ({ persons }: SearchProps) => {
  const [filterStr, setFilterStr] = useState("");
  fuse.setCollection(persons as any);

  const handleFilterStrChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilterStr(e.target.value);

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
