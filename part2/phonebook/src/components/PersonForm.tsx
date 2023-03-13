import axios from "axios";
import { useState } from "react";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isDuplicatePerson =
      persons.findIndex((person) => person.name === newName) === -1
        ? false
        : true;
    if (isDuplicatePerson) alert(`${newName} is already added to phonebook`);
    else {
      // store this person

      // to db
      axios
        .post(`${import.meta.env.VITE_API_URL}/persons`, {
          name: newName,
          number: newNumber,
        })
        .then((res) => {
          // in frontend
          setPersons([...persons, res.data]);
        });
    }

    // clear input values
    setNewName("");
    setNewNumber("");

    e.target.name.focus();
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
