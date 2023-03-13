import Fuse from "fuse.js";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { Person } from "../types";
import ContactsDisplay from "./ContactsDisplay";

const fuse = new Fuse([], {
  keys: ["name"],
});

interface SearchProps {
  persons: Person[];
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
}

const Search = ({ persons, setPersons }: SearchProps) => {
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
        setPersons={setPersons}
      />
    </div>
  );
};

export default Search;
