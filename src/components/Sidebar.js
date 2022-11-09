import React from 'react';

import logo from '../assets/logo.png';

import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

const Sidebar = ({ user, closeSidebar }) => {
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link to="/" className="flex items-center px-5 gap-2 my-5 pt-1 w-190 ">
          <div className="p-5 flex justify-center items-center">
            <img src={logo} width="40px" alt="logo" />
            <div className="text-green-900 text-3xl">Picturesque</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
