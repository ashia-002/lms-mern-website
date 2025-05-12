import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Button } from "../ui/button";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Navbar() {
    const { isAuthenticated, handleLogout} = useContext(AuthContext);
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b-2">
            <Link to="/" className="flex items-center justify-center">
                <GraduationCap className="h-8 w-8 mr-4" />
                <span className="font-extrabold">E-Learn</span>
            </Link>
            <div>
            {isAuthenticated ? (
                    <div className="flex items-center justify-between gap-2">
                        <Button>
                        <Link to="/my-enrollments">My Courses</Link>
                        </Button>
                        <Button onClick={handleLogout}>
                        <Link to="/">Logout</Link>
                        </Button>
                    </div>
                ) : (
                    <Button>
                        <Link to="/auth">Login</Link>
                    </Button>
                )}
                {/* <Button>
                        <Link to="/auth">Login</Link>
                </Button> */}
            </div>
        </header>
    );
}

export default Navbar;
