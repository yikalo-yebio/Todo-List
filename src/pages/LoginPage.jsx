import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [authError , setAuthError] = useState("");
  const [isLoggingOn , setIsLoggingOn] = useState(false);
  
  // Get intended destination from location state, default to /todos
  const from = location.state?.from?.pathname || '/todos';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Handle login form submission
  async function handleSubmit(e) {
    e.preventDefault();
    // ... existing login logic
    setIsLoggingOn(true);
        setAuthError("");

      try {
        const result = await login(email, password);

        if (!result.success) {
          setAuthError(result.error);
        }

        if (result.success) {
         // useEffect will handle redirect
       }
      }catch (error) {
         setAuthError(`Error: ${error.message}`);
} finally {
     setIsLoggingOn(false);
}
    
  }
  
  // ... rest of component with form JSX
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

export default LoginPage;
