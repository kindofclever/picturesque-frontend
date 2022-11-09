import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-7 pb-7">
      <div className="flex text-green-900 rounded-lg justify-start items-center w-full bg-white border-none">
        <IoMdSearch size={30} className="mx-2" />
        <input
          type="text"
          value={searchTerm}
          className="placeholder-green-300 w-full outline-none"
          placeholder="Look for..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onFocus={() => navigate('/search')}
        />
        <div className="flex  items-center">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img
              src={user.image}
              alt={`${user.userName}'s profile pic`}
              className="w-16 h-12"
            />
          </Link>
          <Link
            to="/create-image"
            className="w-16 h-12 flex justify-center items-center text-green-100 bg-green-900 rounded-tr-lg rounded-br-lg">
            <IoMdAdd size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
