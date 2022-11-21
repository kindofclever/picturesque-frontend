import React, { useState } from 'react';

import { client } from '../client';
import Spinner from './Spinner';
import { categories } from '../utils/data';

import { MdDelete } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const CreateCard = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const saveImage = async () => {
    if (title && destination && about && imageAsset?._id && category) {
      const doc = {
        _type: 'card',
        title,
        about,
        destinationUrl: destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };
      await client.create(doc);
      navigate('/');
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 3000);
    }
  };

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    if (
      type === 'image/png' ||
      type === 'image/gif' ||
      type === 'image/jpeg' ||
      type === 'image/tiff' ||
      type === 'image/gif' ||
      type === 'image/svg'
    ) {
      setWrongImageType(false);
      setLoading(true);

      const uploadToSanity = async (picture) => {
        try {
          const document = await client.assets.upload('image', picture, {
            contentType: type,
            filename: name,
          });
          setImageAsset(document);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setWrongImageType(true);
        }
      };

      uploadToSanity(e.target.files[0]);
    } else {
      setWrongImageType(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-orange-500 mb-5 text-xl transition-all duration-300 ease-in">
          Please provide all fields
        </p>
      )}
      <div className="flex flex-col bg-white w-full lg:p-5 p-3 lg:w-4/5 justify-center items-center">
        <div className="bg-green-100 p-3 flex flex-0.7 w-full border-2 border-dotted border-green-200">
          <div className="flex justify-center items-center flex-col p-3 w-full h-[420px]">
            {loading && <Spinner message="Image gets uploaded" />}
            {wrongImageType && (
              <p className="text-orange-500 text-xl flex justify-center items-center flex-clo lg:flex-row">
                Wrong image type
              </p>
            )}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full ">
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-green-900">
                      <AiOutlineCloudUpload size={30} />
                    </p>
                    <p className="text-lg text-green-900">
                      Click to upload an image
                    </p>
                  </div>
                  <p className="mt-20 text-lg text-green-900">
                    Please use high resolution JPG, SVG, PNG, GIF or TIFF images
                    (max. size is 20 MB)
                  </p>
                </div>
                <input
                  className="w-0 h-0"
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                />
              </label>
            ) : (
              <div classNAme="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded pic"
                  className="w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => setImageAsset(null)}
                  className="absolute bottom-3 right-5 p-3  rounded-full bg-white text-xl cursor-pointer outline-none duration-300 text-green-900 hover:bg-green-900 hover:text-white transition-all ease-in ">
                  <MdDelete size={30} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 gap-6 lg:pl-5 mt-5 w-full flex-col justify text-green-900">
          <div className="flex flex-col">
            <label className=" py-2" htmlFor="title">
              Add the title of the image
            </label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 rounded-lg p-2 w-full flex border-green-900 outline-green-500 justify-center items-center"
            />
          </div>
          <div className="flex flex-col">
            <label className=" py-2" htmlFor="about">
              What is this image about?
            </label>
            <input
              name="about"
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="border-2 rounded-lg p-2 w-full flex border-green-900 outline-green-500 justify-center items-center"
            />
          </div>
          <div className="flex flex-col">
            <label className=" py-2" htmlFor="destination">
              Add a link to this image
            </label>
            <input
              name="destination"
              placeholder="https://..."
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border-2 placeholder-green-900 placeholder-opacity-50 rounded-lg p-2 w-full flex border-green-900 outline-green-500 justify-center items-center"
            />
          </div>
          <div className="flex flex-col">
            <label className=" py-2" htmlFor="category">
              Choose a category
            </label>
            <select
              name="category"
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              className="decoration-none border-2 rounded-lg p-2 w-full bg-white flex border-green-900 outline-green-500 decoration-none">
              <option value="all">All</option>
              {categories.map((category) => (
                <option value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end items-end mt-5">
            <button
              type="button"
              onClick={saveImage}
              className="bg-orange-500 text-white font-bold p-2 rounded-full w-28">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
