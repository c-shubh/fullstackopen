import { useEffect, useState } from "react";
import ContactsDisplay from "./components/ContactsDisplay";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Search from "./components/Search";
import personsService from "./services/persons";
import { NotificationType, Person } from "./types";

const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [notification, setNotification] = useState<NotificationType>({
    message: "",
    type: "success",
  });

  useEffect(() => {
    personsService
      .getAll()
      .then((res) => setPersons(res))
      .catch((error) => {
        console.error(error);
        setNotification({
          message: "Failed to fetch all contacts",
          type: "failure",
        });
      });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} type={notification.type} />
      <Search persons={persons} setPersons={setPersons} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <ContactsDisplay
        heading="Numbers"
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
