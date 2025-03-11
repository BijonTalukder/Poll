// DropDown.tsx
import React, { ReactNode } from 'react';


interface DropdownProps {
  trigger: ReactNode; 
  children: ReactNode; 
  position?: 'start' | 'end';
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children, position = "end" }) => {
  return (
    <div className={`dropdown dropdown-${position}`}>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        {trigger}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
