import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { cardDetailMoreCardQuery, cardDetailQuery } from '../utils/data';
import Spinner from './Spinner';

const CardDetails = ({ user }) => {
  const { imageId } = useParams();
  const [cards, setCards] = useState();
  const [cardDetails, setCardDetails] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchPinDetails = () => {
    const query = cardDetailQuery(imageId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setCardDetails(data[0]);
        if (data[0]) {
          const query1 = cardDetailMoreCardQuery(data[0]);
          client.fetch(query1).then((res) => {
            setCards(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();

    const interval = setInterval(() => {
      fetchPinDetails();
    }, 10000);

    return () => clearInterval(interval);
  }, [imageId, comment]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(imageId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuid(),
            postedBy: { _type: 'postedBy', _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  if (!cardDetails) {
    return <Spinner message="Showing pin" />;
  }

  return (
    <>
      {cardDetails && (
        <div
          className="flex flex-col m-auto bg-white text-green-900"
          style={{
            maxWidth: '1500px',
            borderRadius: '32px',
          }}>
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-lg max-h-[450px] mt-5 "
              src={cardDetails?.image && urlFor(cardDetails?.image).url()}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${cardDetails.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100">
                  <MdDownloadForOffline />
                </a>
              </div>
              <a
                href={cardDetails.destination}
                target="_blank"
                rel="noreferrer">
                {cardDetails.destination?.slice(8)}
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-2">
                {cardDetails.title}
              </h1>
              <p className="mt-2">{cardDetails.about}</p>
            </div>
            <Link
              to={`/user-profile/${cardDetails?.postedBy._id}`}
              className="flex gap-2 mt-2 items-center bg-white rounded-lg text-green-900">
              Posted by:
              <img
                src={cardDetails?.postedBy.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{cardDetails?.postedBy.userName}</p>
            </Link>
            <h2 className="mt-2 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {cardDetails?.comments?.map((comment) => (
                <div
                  className="flex gap-2 mt-2 items-center bg-white rounded-lg"
                  key={uuid()}>
                  <img
                    src={comment.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{comment.postedBy?.userName}</p>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-start mt-6 gap-3">
              <Link to={`/user-profile/${user._id}`}>
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
              </Link>
              <label className=" py-2" htmlFor="comment">
                Do you want to add a comment?
              </label>
              <input
                placeholder="It will take a short time to upload comment"
                name="comment"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="placeholder-green-900 placeholder-opacity-40 border-2 rounded-lg p-2 w-full flex border-green-900 outline-green-500 justify-center items-center"
              />
            </div>
            <div className="flex flex-wrap justify-center mt-2 gap-3">
              <button
                type="button"
                className="bg-orange-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}>
                {addingComment ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
      {cards?.length > 0 ? (
        <>
          <h2 className="text-green-900 text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout cards={cards} />
        </>
      ) : (
        <Spinner message="Loading more images" />
      )}
    </>
  );
};

export default CardDetails;
