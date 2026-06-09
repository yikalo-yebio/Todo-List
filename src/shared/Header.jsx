import { useAuth } from "../contexts/AuthContext";
import Navigation from "./Navigation";

function Header() {
    
    const {isAuthenticated, logout, email} = useAuth(); 


    return (
        <>
          <h1>Todo List</h1>
            <Navigation />

            {isAuthenticated && (
                <div>
                     <p>Logged in as: {email}</p>
                </div>
                
            )}
        </>
    )
}

export default Header;
