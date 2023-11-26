import { useState, useEffect } from 'react';
import { ContactList } from 'components/contactList/ContactList';
import { ContactForm } from 'components/contactForm/ContactForm';
import { Filter } from 'components/filter/Filter';

export function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = window.localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localContacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contactData => {
    if (
      contacts.some(
        contact =>
          contact.name.toLocaleLowerCase() ===
          contactData.name.toLocaleLowerCase()
      )
    ) {
      alert(`${contactData.name} is already in contacts.`);
      return;
    }
    setContacts(prevState => [...prevState, contactData]);
  };

  const removeContacts = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const handlFiltration = event => {
    setFilter(event.target.value);
  };

  const filteredContacts = () => {
    const normalizedContacts = filter.toLocaleLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(normalizedContacts);
    });
  };

  const afterFiltration = filteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} globalContacts={contacts} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handlFiltration} />
      <ContactList contacts={afterFiltration} onDelit={removeContacts} />
    </div>
  );
}
