import type { FormEvent } from "react";
import { ChangeEvent, useState } from "react";
import personsService from "../services/persons";
import { Person } from "../types";

interface PersonFormProps {
  persons: Person[];
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
}

const PersonForm = ({ persons, setPersons }: PersonFormProps) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNumber(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isDuplicatePerson =
      persons.findIndex((person) => person.name === newName) === -1
        ? false
        : true;
    if (isDuplicatePerson) alert(`${newName} is already added to phonebook`);
    else {
      personsService
        .create({ name: newName, number: newNumber })
        .then((res) => setPersons([...persons, res]));
    }

    // clear input values
    setNewName("");
    setNewNumber("");

    (e.target as any).name.focus();
  };

  return (
    <div>
      <h2>Add a new contact</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              type={"text"}
              onChange={handleNameChange}
              value={newName}
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="number">Number: </label>
            <input
              id="number"
              type="tel"
              onChange={handleNumberChange}
              value={newNumber}
              placeholder="xxx-xxx-xxxx"
              maxLength={12}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
