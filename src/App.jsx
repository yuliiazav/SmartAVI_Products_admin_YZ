import { useState } from "react";
import Login from "./components/Login/Login";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import "./styles/layout.css";

const AUTH_KEY = "isAuth";

export default function App() {
  const initialAuthStatus = localStorage.getItem(AUTH_KEY) === "true";
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthStatus);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
          <AdminPanel />
        </>
      ) : (
        <Login onSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
