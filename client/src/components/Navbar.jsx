import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-indigo-600 text-white fixed w-full z-50 h-16 shadow-md">
      <div className="flex items-center h-full pl-4 pr-6">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-indigo-700 mr-4"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="text-white h-6 w-6" />
        </button>

        <h1 className="text-xl font-semibold mx-auto md:ml-16">
          Task Management
        </h1>

        <div className="flex space-x-3 ml-auto">
          <Link
            to="/me"
            className="px-4 py-2 rounded-md text-sm font-medium bg-white text-indigo-600 hover:bg-gray-100"
          >
            User
          </Link>
          {/* <Link
            to="/signup"
            className="hidden sm:block px-4 py-2 rounded-md text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-700"
          >
            Sign Up
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
