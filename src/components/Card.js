import React, { useState } from 'react';

import { urlFor, client } from '../client';
import { fetchUserFromLS } from '../utils/fetchUserFromLS';

import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

const Card = ({ card: { image, postedBy, _id, destinationUrl, save } }) => {
  const [cardHovered, setCardHovered] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const navigate = useNavigate();
  const user = fetchUserFromLS();

  let saved = save?.filter((item) => item?.postedBy?._id === user?.googleId);

  saved = saved?.length > 0 ? saved : [];

  const saveThisCard = async (id) => {
    if (saved?.length === 0) {
      try {
        setSaveCard(true);

        await client
          .patch(id)
          .setIfMissing({ save: [] })
          .insert('after', 'save[-1]', [
            {
              _key: uuid(),
              userId: user?.googleId,
              postedBy: {
                _type: 'postedBy',
                _ref: user?.googleId,
              },
            },
          ])
          .commit();

        window.location.reload();
        setSaveCard(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteThisCard = async (id) => {
    try {
      await client.delete(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-2 border-green-200 border-2 rounded-xl hover:bg-white">
      <div
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
        onClick={() => navigate(`/image-details/${_id}`)}
        className="relative cursor-zoom-in w-auto rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
        <img
          src={urlFor(image).width(250).url()}
          alt="user-post"
          className="rounded-lg w-full"
        />
        {cardHovered && (
          <div className="absolute w-full h-[100%] flex flex-col justify-between p-1 pr-2 py-2  z-50 top-0 ">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 ">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  className="flex justify-center items-center opacity-70 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}>
                  <MdDownloadForOffline
                    className="text-green-900 hover:text-orange-500 bg-white rounded-full"
                    size={30}
                  />
                </a>
              </div>
              {saved?.length !== 0 ? (
                <button
                  type="button"
                  className="bg-orange-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-lg  outline-none">
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveThisCard(_id);
                  }}
                  type="button"
                  className="bg-orange-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-lg outline-none">
                  {save?.length} {saveCard ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destinationUrl && (
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  href={destinationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-sm flex items-center gap-2 text-green-900 font-bold px-5 py-1 rounded-lg opacity-70 hover:opacity-100">
                  <BsFillArrowUpRightCircleFill size={30} />
                  Link
                </a>
              )}
              {postedBy?._id === user.googleId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteThisCard(_id);
                  }}
                  type="button"
                  className="bg-orange-500 opacity-70 hover:opacity-100 text-white font-bold p-1  rounded-full outline-none">
                  <AiTwotoneDelete size={25} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="pl-2 flex gap-2 my-2 items-center justify-center rounded-lg">
        <img
          className="w-8 h-8 rounded-full object-cover "
          src={postedBy?.image}
          alt="creator"
        />
        <p className="text-sm text-green-900 capitalize hover:font-semibold">
          {postedBy?.userName}
        </p>
      </Link>
    </div>
  );
};

export default Card;
