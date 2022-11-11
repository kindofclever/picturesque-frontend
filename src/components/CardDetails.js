import React, { useState, useEffect } from 'react';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { cardDetailMoreCardQuery, cardDetailQuery } from '../utils/data';
import Spinner from './Spinner';

import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const CardDetails = ({ user }) => {
  const [cards, setCards] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const { imageId } = useParams();

  const fetchImageDetails = async (id) => {
    let query = cardDetailQuery(id);
    if (query) {
      try {
        const fullfilledQuery = await client.fetch(query);
        setCardDetails(fullfilledQuery[0]);
        if (fullfilledQuery[0]) {
          query = cardDetailMoreCardQuery(fullfilledQuery[0]);
          const moreDetailedResponse = await client.fetch(query);
          setCards(moreDetailedResponse);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchImageDetails(imageId);
  }, [imageId]);

  if (!cardDetails) return <Spinner message="Loading image details..." />;
  return (
    <div
      style={{ maxWidth: '1500px', borderRadius: '32px' }}
      className="flex flex-col 2xl:flex-row  m-auto bg-white">
      <div className="flex justify-center items-center md:items-start flex-initial h-full">
        <img
          className="rounded-lg mt-5"
          src={cardDetails?.image && urlFor(cardDetails.image).url()}
          alt="user-post"
        />
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <a
              href={`${cardDetails.image?.asset?.url}?dl=`}
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
          <a
            rel="noreferrer"
            className="text-green-900"
            href={cardDetails.destinationUrl}
            target="blank">
            {cardDetails.destinationUrl}
          </a>
        </div>
        <div>
          <h1 className="text-green-900 text-4xl font-bold break-words mt-5">
            "{cardDetails.title}"
          </h1>
          <p className="text-lg text-green-900">"{cardDetails.about}"</p>
        </div>
        <div className="flex text-green-900 items-center">
          <Link
            to={`/user-profile/${cardDetails.postedBy?._id}`}
            className="flex gap-2 mt-5 items-center bg-white rounded-full">
            <img
              src={cardDetails.postedBy?.image}
              alt={`${user.userName}'s profile pic`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="text-green-900">{cardDetails.postedBy?.userName}</p>
          </Link>
        </div>
        {cardDetails?.comments && (
          <>
            <h2 className="mt-5 text-green-900 text-2xl ">Comments:</h2>
            <div clasName="max-h-370 overflow-y-auto">
              {cardDetails?.comments?.map((comment) => (
                <div
                  className="flex gap-2 mt-5 items-center bg-white rounded-lg"
                  key={uuid()}>
                  <img
                    classNAme="w-10 h-10 rounded-full cursor-pointer "
                    src={comment.postedBy.image}
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold text-green-900">
                      {comment.postedBy.userName}
                    </p>
                    <p className=" text-green-900">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex mt-6 gap-3 items-start">
          <div className="flex flex-col">
            <label className="text-green-900 py-2" htmlFor="comment">
              {`Would you like to leave a comment, ${cardDetails.postedBy?.userName}?`}
            </label>
            <input
              name="comment"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-2 placeholder-green-900 placeholder-opacity-50 rounded-lg p-2 w-full flex border-green-900 outline-green-500 justify-center items-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
