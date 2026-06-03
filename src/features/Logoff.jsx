import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Logoff() {
  const { logout, email } = useAuth();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    const result = await logout();

    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <div>
      <p>Logged in as: {email}</p>

      <button onClick={handleLogout}>
        Logout
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Logoff;
