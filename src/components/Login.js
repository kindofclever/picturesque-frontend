import React from 'react';

import shareVideo from '../assets/shareVideo.mp4';
import logoWhite from '../assets/logowhite.png';

import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
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
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
