import { useEffect, useState } from "react";
import ContactsDisplay from "./components/ContactsDisplay";
import PersonForm from "./components/PersonForm";
import Search from "./components/Search";
import personsService from "./services/persons";
import { Person } from "./types";

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    personsService.getAll().then((res) => setPersons(res));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Search persons={persons} setPersons={setPersons} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <ContactsDisplay
        heading="Numbers"
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
