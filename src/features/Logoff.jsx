import { useState } from "react";
import { useNavigate } from 'react-router';
import { useAuth } from "../contexts/AuthContext";

function Logoff() {
  const { logout, email } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoggingOff, setIsLoggingOff] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOff(true);
    setError('');

    try {
      const result = await logout();

         if (result.success) {
              navigate('/login');
         } else{
              setError(result.error);
         }
      
    } catch (err) {
      setError(err.message);
    }finally{
      setIsLoggingOff(false);
    }
    
  };

  return (
    <div>
      <p>Logged in as: {email}</p>

      <button onClick={handleLogout} disabled={isLoggingOff}>
        {isLoggingOff ? "Logging out..." : "Logout"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Logoff;
