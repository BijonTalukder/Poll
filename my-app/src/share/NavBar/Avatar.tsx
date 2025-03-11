import React, { ReactNode } from "react";
import Dropdown from "./DropDown";
interface AvatarProps {
    handleLogout: () => void; // Define handleLogout as a function that returns void
  }
  
const Avatar:React.FC<AvatarProps> = ({handleLogout}) => {
  return (
    <Dropdown
      trigger={
        <div className="w-10 rounded-full">
          <img
          className="overflow-hidden rounded-full"
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      }
    >
      <li>
        <a className="justify-between">
          Profile
          <span className="badge">New</span>
        </a>
      </li>
      <li><a>Settings</a></li>
      <li onClick={handleLogout}><a>Logout</a></li>
    </Dropdown>
  );
};

export default Avatar;
