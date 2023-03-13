import { Person } from "../types";

interface ContactsDisplayProps {
  persons: Person[];
  heading?: string;
}

const ContactsDisplay = ({ persons, heading }: ContactsDisplayProps) => {
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsDisplay;
