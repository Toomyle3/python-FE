import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ContactForm from "./ContactForm";

interface Contact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  location: string;
}

interface Props {
  contacts: Contact[];
  fetchContacts: () => void;
}

const ContactList: React.FC<Props> = ({ contacts, fetchContacts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateContact, setIsUpdateContact] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleUpdateContact = (contactData: Contact) => {
    setIsOpen(true);
    setFormData(contactData);
    setIsUpdateContact(true);
  };

  const handleDeleteContact = async (id: number) => {
    const response = await fetch(
      `http://127.0.0.1:5000/delete_contact/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    if (data?.message === "User deleted!") {
      fetchContacts();
    }
  };

  return (
    <div className="container">
      <h2>Contacts</h2>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        Add new contact
      </button>
      <div
        className={`modal fade ${isOpen ? "in" : ""}`}
        id="exampleModal"
        role="dialog"
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Contact Form
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ContactForm
                setFormData={setFormData}
                formData={formData}
                fetchContacts={fetchContacts}
                setIsOpen={setIsOpen}
                isUpdateContact={isUpdateContact}
                setIsUpdateContact={setIsUpdateContact}
              />
            </div>
          </div>
        </div>
      </div>
      <table
        style={{
          marginTop: "20px",
        }}
        className="table table-hover table-dark table-bordered table-striped"
      >
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact: any, index: number) => {
            return (
              <tr key={index}>
                <th scope="row">{contact?.firstName}</th>
                <td>{contact?.lastName}</td>
                <td>{contact?.email}</td>
                <td>{contact?.phone}</td>
                <td>{contact?.location}</td>
                <td
                  style={{
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <button onClick={() => handleUpdateContact(contact)}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteContact(contact?.id)}>
                    Delete
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

export default ContactList;
