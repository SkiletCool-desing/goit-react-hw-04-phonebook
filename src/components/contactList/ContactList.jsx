export const ContactList = ({ contacts, onDelit }) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <li key={contact.id}>
            <span>{contact.name}</span>: <b>{contact.number}</b>{' '}
            <button type="button" onClick={() => onDelit(contact.id)}>
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
};
