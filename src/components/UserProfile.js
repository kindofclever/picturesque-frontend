import React, { useState, useEffect } from 'react';

import {
  userQuery,
  userSavedCardQuery,
  userCreatedCardQuery,
} from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import profileBackground from '../assets/profilebackground.png';

import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

const randomImage = 'https://picsum.photos/1600/900?nature ';
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState(null);
  const [text, setText] = useState('Created');
  const [activeButton, setActiveButton] = useState('Cretaed');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => setUser(data[0]));
  }, [userId]);

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }

  const onSuccess = () => {
    localStorage.clear();
    navigate('/login');
  };

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7 ">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-[300px] object-cover">
              <img
                src={profileBackground}
                className="object-cover h-full w-full"
                alt="banner"
              />
            </div>
            <div className="-mt-20 h-40 w-40 rounded-full bg-white flex justify-center items-center">
              <img
                src={user.image}
                className="rounded-full w-30 h-30  object-cover"
                alt="user"
              />
            </div>
            <h2 className="text-green-900 font-bold text-3xl 2xl:5xl text-center mt-3">
              {user.userName}
            </h2>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <GoogleLogout
                  clientId={clientId}
                  buttonText="Sign out"
                  onLogoutSuccess={onSuccess}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
