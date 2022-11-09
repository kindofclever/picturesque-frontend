import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ seacrchterm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex text-green-900 justify-start items-center w-full px-2 bg-white border-none">
        <IoMdSearch size={30} className="mx-2" />
        <input
          type="text"
          className="placeholder-green-300 outline-none"
          placeholder="Look for..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Navbar;
