import React, { useEffect, useRef, useState } from 'react';

import { Sidebar, UserProfile } from '../components';
import Cards from './Cards';
import { client } from '../client';
import logo from '../assets/logo.png';
import { userQuery } from '../utils/data';

import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Routes, Route, Link } from 'react-router-dom';

const Home = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [user, setUser] = useState({});
  const scrollRef = useRef(null);

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

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen transition-height duration-75 ease-out bg-green-100">
      <div className="hidden md:flex h-screen flex-initial ">
        <Sidebar user={user && user} />
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
              <img src={logo} width="35px" alt="logo" />
              <div className="text-green-900 text-xl">Picturesque</div>
            </div>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} className="w-8 rounded-full" alt="user" />
          </Link>
        </div>
      </div>
      {sidebarVisible && (
        <div className="fixed w-4/5 h-screen bg-white overflow-y-auto z-10 animate-in fade-in zoom-in duration-1000">
          <div className="absolute w-full flex text-green-900 justify-end items-center p-5">
            <AiFillCloseCircle
              size={35}
              className="cursor-pointer"
              onClick={() => setSidebarVisible(!sidebarVisible)}
            />
          </div>
          <Sidebar
            user={user && user}
            closeSidebar={setSidebarVisible}
            sidebar={sidebarVisible}
          />
        </div>
      )}
      <div className="pb-5 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Cards user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
