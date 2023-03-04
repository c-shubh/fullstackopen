import { useState } from "react";
import ContactsDisplay from "./components/ContactsDisplay";
import PersonForm from "./components/PersonForm";
import Search from "./components/Search";

const sampleData = [
  { id: crypto.randomUUID(), name: "Alan Turing", number: "414-379-2649" },
  { id: crypto.randomUUID(), name: "Steve Wozniak", number: "409-978-4352" },
  { id: crypto.randomUUID(), name: "Tim Berners-Lee", number: "617-957-0662" },
  { id: crypto.randomUUID(), name: "Charles Babbage", number: "828-209-0165" },
  { id: crypto.randomUUID(), name: "Grace Hopper", number: "540-217-4858" },
];

const App = () => {
  const [persons, setPersons] = useState(sampleData);

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
