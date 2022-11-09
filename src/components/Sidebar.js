import React from 'react';

import logo from '../assets/logo.png';

import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-green-500 hover:text-green-900 transition-all duration-300 ease-in-out capitalize';
const isActiveStyle =
  'flex items-center px-5 gap-3 font-extrabold border-r-2 border-green-900 text-green-900 transition-all duration-300 ease-in-out capitalize';

const categories = [
  { name: 'Forests', image: '' },
  { name: 'Mountains', image: '' },
  { name: 'Water', image: '' },
  { name: 'Desert', image: '' },
  { name: 'Jungle', image: '' },
  { name: 'Islands', image: '' },
  { name: 'Snow', image: '' },
];
const Sidebar = ({ user, closeSidebar, sidebar }) => {
  const handleClose = () => {
    if (closeSidebar) {
      closeSidebar(!sidebar);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          onClick={handleClose}
          to="/"
          className="flex items-center px-5 my-5 w-210 ">
          <div className=" flex justify-center items-center">
            <img src={logo} width="40px" alt="logo" />
            <div className="text-green-900 text-3xl">Picturesque</div>
          </div>
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            onClick={handleClose}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            Home
            <RiHomeFill size={15} />
          </NavLink>
          {categories.map((category) => {
            return (
              <NavLink
                key={category.name}
                onClick={handleClose}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                to={`/category/${category.name.toLowerCase()}`}>
                {category.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      {user && (
        <Link
          onClick={handleClose}
          to={`/user-profile/${user._id}`}
          className="flex my-5 ml-5 mb-3 gap-2 items-center text-green-500">
          <img
            src={user.image}
            alt={`${user.userName}'s profile`}
            className="w-12 h-12 rounded-full"
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
