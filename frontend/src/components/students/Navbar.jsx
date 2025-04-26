import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

function Navbar() {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center border-b-2">
            <Link to="/" className="flex items-center justify-center">
                <GraduationCap className="h-8 w-8 mr-4" />
                <span className="font-extrabold">E-Learn</span>
            </Link>
        </header>
    );
}

export default Navbar;
