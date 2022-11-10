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
      <div className="flex flex-col lg:flex-row bg-white w-full lg:p-5 p-3 lg:w-4/5 justify-center items-center">
        <div className="bg-green-100 p-3 flex flex-0.7 w-full border-2 border-dotted border-green-200">
          <div className="flex justify-center items-center flex-col p-3 w-full h-[420px]">
            {loading && <Spinner />}
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
              <p className="text-orange-500 text-xl flex justify-center items-center flex-clo lg:flex-row">
                somethingelse
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
