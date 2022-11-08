import React, { useEffect } from 'react';

import shareVideo from '../assets/shareVideo.mp4';
import logo from '../assets/logo.png';
import { client } from '../client';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = async (res) => {
    try {
      localStorage.setItem('user', JSON.stringify(res.profileObj));
      const { imageUrl, name, googleId } = res.profileObj;
      const doc = {
        _id: googleId,
        _type: 'user',
        userName: name,
        image: imageUrl,
      };
      await client
        .createIfNotExists(doc)
        .then(() => navigate('/'), { replace: true });
    } catch (err) {
      console.log('ERROR:', err);
    }
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen">
      <div className="relative h-full w-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          control="false"
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay">
          <div className="p-5 flex justify-center items-center">
            <img src={logo} width="60px" alt="logo" />
            <div className="text-white text-5xl">Picturesque.</div>
          </div>
          <div className="">
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
