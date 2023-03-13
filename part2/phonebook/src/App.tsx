import axios from "axios";
import { useEffect, useState } from "react";
import ContactsDisplay from "./components/ContactsDisplay";
import PersonForm from "./components/PersonForm";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/persons`)
      .then((res) => setPersons(res.data));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Search persons={persons} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <ContactsDisplay persons={persons} heading="Numbers" />
    </div>
  );
};

export default App;
