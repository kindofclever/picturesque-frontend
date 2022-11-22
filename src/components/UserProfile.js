import React, { useState, useEffect } from 'react';

import {
  userQuery,
  userSavedCardsQuery,
  userCreatedCardsQuery,
} from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import profileBackground from '../assets/profilebackground.png';

import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

const activeButtonStyle =
  'bg-orange-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveButtonStyle =
  'text-green-900 font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState(null);
  const [text, setText] = useState('Created');
  const [activeButton, setActiveButton] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => setUser(data[0]));
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedCardsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setCards(data);
      });
    } else {
      const savedPinsQuery = userSavedCardsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setCards(data);
      });
    }
  }, [text, userId]);

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
            <div className="w-full h-[150px] object-cover bg-green-900">
              {/* <img
                src={profileBackground}
                className="object-cover h-full w-full"
                alt="banner"
              /> */}
            </div>
            <div className="-mt-20 h-40 w-40 rounded-full bg-white flex justify-center items-center">
              <img
                src={user.image}
                className="rounded-full w-30 h-30  object-cover"
                alt="user"
              />
            </div>
            <h2 className="text-green-900 font-bold capitalize text-3xl 2xl:5xl text-center mt-3">
              {user.userName}
            </h2>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <GoogleLogout
                  clientId={clientId}
                  buttonText="Sign out"
                  onLogoutSuccess={onSuccess}
                  cookiePolicy={'https://picturesque-by-sandra.netlify.app/'}
                  isSignedIn={true}
                  icon={false}
                />
              )}
            </div>
          </div>
          <div className="text-center text-green-900 mb-7 mt-5">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveButton('created');
              }}
              className={`${
                activeButton === 'created'
                  ? activeButtonStyle
                  : notActiveButtonStyle
              }`}>
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveButton('saved');
              }}
              className={`${
                activeButton === 'saved'
                  ? activeButtonStyle
                  : notActiveButtonStyle
              }`}>
              Saved
            </button>
          </div>
          <div className="px-2">
            <MasonryLayout cards={cards} />
          </div>

          {cards?.length === 0 && (
            <div className="text-green-900 flex justify-center font-bold items-center w-full text-1xl mt-2">
              No images found... Create or save some posts!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
