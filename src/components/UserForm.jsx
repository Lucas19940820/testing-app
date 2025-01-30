import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserForm({ setUserDetails }) {
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{13}$/.test(idNumber)) {
      setError("ID Number must be exactly 13 digits long.");
      return;
    }

    setUserDetails({ name, idNumber });
    navigate("/quiz");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Enter Your Details</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ID Number"
        value={idNumber}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            setIdNumber(e.target.value);
          }
        }}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Start Test</button>
    </form>
  );
}

export { UserForm };
