// import React, { useState } from 'react';

// const Sidebar = () => {
//   // State to manage dropdown visibility
//   const [isBrowseOpen, setIsBrowseOpen] = useState(false);

//   const toggleBrowseMenu = () => {
//     setIsBrowseOpen(!isBrowseOpen);
//   };

//   return (
//     <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-6">
//       {/* Company Name */}
//       <div className="text-2xl font-bold mb-10 text-center">
//         Company Name
//       </div>
      
//       {/* Navigation Links */}
//       <ul className="space-y-6">
//         <li>
//           <a href="#home" className="block py-2 px-4 rounded hover:bg-gray-700">
//             Home
//           </a>
//         </li>

//         {/* Browse with Dropdown */}
//         <li>
//           <button
//             onClick={toggleBrowseMenu}
//             className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700 focus:outline-none"
//           >
//             Browse
//           </button>

//           {/* Sub-menu for Browse */}
//           {isBrowseOpen && (
//             <ul className="ml-4 space-y-4">
//               <li>
//                 <a href="#browse-1" className="block py-2 px-4 rounded hover:bg-gray-700">
//                   Browse Sub-item 1
//                 </a>
//               </li>
//               <li>
//                 <a href="#browse-2" className="block py-2 px-4 rounded hover:bg-gray-700">
//                   Browse Sub-item 2
//                 </a>
//               </li>
//             </ul>
//           )}
//         </li>

//         <li>
//           <a href="#menu" className="block py-2 px-4 rounded hover:bg-gray-700">
//             Menu
//           </a>
//         </li>
//         <li>
//           <a href="#restaurant" className="block py-2 px-4 rounded hover:bg-gray-700">
//             Restaurant
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import CartDropdown from './CartDropDown';
import Avatar from './Avatar';
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../../redux/feature/Auth/AuthSlice";
import { RootState } from "../../redux/store";
import { FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Navbar = () => {
    
    const userData = useSelector((state:RootState) => state.user.userData);
    const dispatch = useDispatch();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setUser(null));
      };
      console.log(userData)
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          MyApp
        </a>
      </div>
      <div className="flex-none">
        <CartDropdown />


        {
            !!userData.email? <Avatar handleLogout={handleLogout}/>:
            
            <div className="bg-[#03081F] text-white  rounded-3xl p-2 shadow-lg transition-transform transform hover:scale-105">
      <div className="grid grid-cols-3 items-center w-full px-2 sm:px-1">
     
        <div className="hidden col-span-1 md:flex lg:flex justify-center">
          <div className="rounded-full h-8 w-8 p-2 bg-orange-400 flex items-center justify-center shadow-md transition-transform transform hover:scale-110">
            <FaUserPlus size={16} />
          </div>
        </div>

   
        <div className="md:col-span-2 lg:md:col-span-2 col-span-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold hover:text-orange-300 cursor-pointer"><Link to={'/Login'}>Login</Link></h4>
            <span className="text-gray-400">/</span>
            <h4 className="font-semibold  hover:text-orange-300 cursor-pointer"><Link to={'/Sign-up'}>Sign Up</Link></h4>
          </div>
        </div>
      </div>
    </div>
            
        }
       
      </div>
    </nav>
  );
};

export default Navbar;
