import personsService from "../services/persons";
import { NotificationType, Person } from "../types";

interface ContactsDisplayProps {
  heading?: string;
  persons: Person[];
  setPersons: React.Dispatch<React.SetStateAction<Person[]>>;
  setNotification: React.Dispatch<React.SetStateAction<NotificationType>>;
}

const ContactsDisplay = ({
  heading,
  persons,
  setPersons,
  setNotification,
}: ContactsDisplayProps) => {
  const handleContactDelete = (id: Person["id"], name: Person["name"]) => {
    if (window.confirm(`Delete ${name} ?`))
      personsService
        .delete_(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error(error);
          setNotification({
            message: `Failed to delete contact: ${name}`,
            type: "failure",
          });
        });
  };

  return (
    <div>
      {heading ? <h2>{heading}</h2> : <></>}
      <table>
        <tbody>
          {persons.map((person) => {
            return (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleContactDelete(person.id, person.name)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsDisplay;
