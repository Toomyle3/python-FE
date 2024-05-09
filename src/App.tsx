import { useState, useEffect } from "react";

import "./App.css";
import ContactList from "./ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data?.contacts);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return <ContactList contacts={contacts} fetchContacts={fetchContacts} />;
}

export default App;
