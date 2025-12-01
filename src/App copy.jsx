import { useState } from "react";
import Login from "./components/Login/Login";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import "./styles/layout.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app-wrapper">
      {!isAuthenticated ? (
        <Login onSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <AdminPanel />
      )}
    </div>
  );
}
