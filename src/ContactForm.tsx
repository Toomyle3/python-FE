import "bootstrap/dist/css/bootstrap.min.css";
interface FormData {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
}

interface Props {
  formData: FormData;
  setFormData: (value: FormData) => void;
  fetchContacts: () => void;
  setIsOpen: (value: boolean) => void;
  setIsUpdateContact: (value: boolean) => void;
  isUpdateContact: boolean;
}

const ContactForm: React.FC<Props> = ({
  formData,
  setFormData,
  fetchContacts,
  setIsOpen,
  setIsUpdateContact,
  isUpdateContact,
}) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    isUpdateContact ? updateContact() : postContacts();
  };

  const postContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/create_contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to post contacts");
    }

    const data = await response.json();

    if (data?.message === "User created") {
      fetchContacts();
    }
    setIsOpen(false);
  };

  const updateContact = async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/update_contact/${formData?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();

    if (data?.message === "User updated") {
      fetchContacts();
    }
    setIsUpdateContact(false);
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          className="form-control"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          className="form-control"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        ></input>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
