// Packages

// Types and Schemas

// Data and styles
import "./sidebar.css";

// Functions and Hooks

// Components
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import Chats from "../Chats/Chats";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </aside>
  );
};

export default Sidebar;
