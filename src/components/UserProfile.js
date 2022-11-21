import React, { useState, useEffect } from 'react';

import {
  userQuery,
  userSavedCardQuery,
  userCreatedCardQuery,
} from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

const randomImage = 'https://picsum.photos/1600/900';
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

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7 ">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 object-cover"
              alt="banner"
            />
            <img
              src={user.image}
              className="rounded-full w-30 h-30 -mt-10 object-cover"
              alt="banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
