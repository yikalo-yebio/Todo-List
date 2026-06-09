import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Navigation() {
    
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const navLinkStyle = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        textDecoration: isActive ? 'underline' : 'none',
        cursor: "pointer"
    });

    const handleLogout = async () => {
        const result = await logout();

        if (result.success) {
            navigate("/login");
        }
    };

    return (
      <nav>
        <ul
            style={{
                listStyle:'none',
                display: 'flex',
                gap: '1rem',
                padding: 0,
            }}
        > 
                <li>
                    <NavLink to="/about" style={navLinkStyle}>
                        About
                    </NavLink>
                  </li>
                {isAuthenticated ? (
                <>
                  <li>
                    <NavLink to="/todos" style={navLinkStyle}>
                        Todos
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/profile" style={navLinkStyle}>
                        Profile
                    </NavLink>
                  </li>
                  <li>
                    <span onClick={handleLogout} style={navLinkStyle({isActive: false})}>
                        Logout
                    </span>
                  </li>
                </>
              ) : (
                 <li>
                    <NavLink to="/login" style={navLinkStyle}>
                        Login
                    </NavLink>
                  </li>
              )}
        </ul>
    </nav>
    )
}

export default Navigation;
