import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Logon() {

   const { login } = useAuth();

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [authError , setAuthError] = useState("");
    const [isLoggingOn , setIsLoggingOn] = useState(false);

    async function handleSubmit(event) {
        
        event.preventDefault();
        setIsLoggingOn(true);
        setAuthError("");

      try {
        const result = await login(email, password);

        if (!result.success) {
          setAuthError(result.error);
        }
      }catch (error) {
         setAuthError(`Error:  ${error.message}`);
} finally {
     setIsLoggingOn(false);
}
}


return (
    <>
     <form onSubmit={handleSubmit}>
        {authError && <p>{authError}</p>}
        <label htmlFor="email">Email</label>
        <input 
            value={email}  
            type="email" 
            name="" 
            id="email"
            onChange={(e) => {setEmail(e.target.value)}}
             />
        <label htmlFor="password">Password</label>
        <input 
            value={password} 
            type="password" 
            name="" 
            id="password"
            onChange={(e) => {setPassword(e.target.value)}}
             />
        <button type="submit" disabled={isLoggingOn}>
            {isLoggingOn ? "Logging in..." : "Log On"}
        </button>
     </form>
    </>
)
    
}

export default Logon;
