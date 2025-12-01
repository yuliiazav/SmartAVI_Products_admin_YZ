import { useState } from "react";
import "./login.css";

const AUTH_KEY = "isAuth";

export default function Login({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const correctPassword = "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (password === correctPassword) {
      try {
        localStorage.setItem(AUTH_KEY, "true");

        onSuccess();
      } catch (storageError) {
        setError(
          "Login successful, but session could not be saved (Storage blocked)."
        );

        onSuccess();
      }
    } else {
      setError("Incorrect Password!");
      setPassword("");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2> SmartAvi Products Pricelist Admin</h2>
        <p>Log In : </p>
        {error && <div className="custom-alert">{error}</div>}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
