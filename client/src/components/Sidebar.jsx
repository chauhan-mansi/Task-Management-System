import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { label: "Home", path: "/home" },
    { label: "To Do", path: "/todo" },
    { label: "Project 1", path: "/project1" },
    { label: "Project 2", path: "/project2" },
    { label: "Project 3", path: "/project3" },
    { label: "Project 4", path: "/project4" }
  ];

  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-100 z-40 shadow-xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="flex justify-end p-4">
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <CloseIcon />
        </button>
      </div>
      
      <nav className="mt-4">
        <ul className="space-y-1 px-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  navigate(item.path);
                  toggleSidebar();
                }}
                className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-200 text-gray-800 font-medium"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;