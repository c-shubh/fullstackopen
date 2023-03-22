import Fuse from "fuse.js";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { NotificationType, Person } from "../types";
import ContactsDisplay from "./ContactsDisplay";

const fuse = new Fuse([], {
  keys: ["name"],
});

interface SearchProps {
  persons: Person[];
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
  setNotification: React.Dispatch<React.SetStateAction<NotificationType>>;
}

const Search = ({ persons, setPersons, setNotification }: SearchProps) => {
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
        setNotification={setNotification}
      />
    </div>
  );
};

export default Search;
