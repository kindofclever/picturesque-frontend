import React, { useEffect, useRef, useState } from 'react';

import { Sidebar, UserProfile } from '../components';
import Cards from '../container/Cards';
import { client } from '../client';
import logo from '../assets/logo.png';
import { userQuery } from '../utils/data';

import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Routes, Route, Link } from 'react-router-dom';

const Home = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [user, setUser] = useState({});
  const userInfo =
    localStorage.getItem('user') !== undefined
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    const fetchData = async (q) => {
      try {
        const userInfos = await client.fetch(q);
        const user = userInfos[0];
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(query);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen transition-height duration-75 ease-out bg-green-50">
      <div className="hidden md:flex h-screen flex-initial ">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row justify-center items-center">
        <div className="flex justify-around items-center mx-1 mt-5 gap-10 w-full cursor-pointer text-green-900">
          <HiMenu
            size={30}
            className="cursor-pointe"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          />

          <Link to="/">
            <div className="flex justify-center items-center cursor-pointer">
              <img src={logo} width="40px" alt="logo" />
              <div className="text-green-900 text-xl">Picturesque</div>
            </div>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} className="w-10 rounded-full" alt="user" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
