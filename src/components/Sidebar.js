import React from 'react';

import logo from '../assets/logo.png';
import { categories } from '../utils/data';

import { NavLink, Link, useNavigate } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-green-500 hover:text-green-900 transition-all duration-300 ease-in-out capitalize';
const isActiveStyle =
  'flex items-center px-5 gap-3 font-extrabold border-r-2 border-green-900 text-green-900 transition-all duration-300 ease-in-out capitalize';

const Sidebar = ({ user, closeSidebar, sidebar }) => {
  const navigate = useNavigate();
  const onSuccess = () => {
    localStorage.clear();
    navigate('/login');
  };
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
            <RiHomeFill size={22} className="m-1" />
            Home
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
                <img
                  src={category.image}
                  className="w-8 h-8 rounded-full shadow-sm"
                  alt="category"
                />
                {category.name}
              </NavLink>
            );
          })}
          <div className="ml-5">
            <GoogleLogout
              clientId={clientId}
              buttonText="Sign out"
              onLogoutSuccess={onSuccess}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
              icon={false}
            />
          </div>
        </div>
      </div>
      {user && (
        <Link
          onClick={handleClose}
          to={`/user-profile/${user._id}`}
          className="flex my-5 ml-5 mb-3 gap-2 capitalize items-center text-green-500">
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
