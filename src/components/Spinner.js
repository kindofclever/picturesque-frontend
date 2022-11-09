import React from 'react';

import { ThreeCircles as Circles } from 'react-loader-spinner';

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col mt-10 justify-center items-center w-full h-full">
      <Circles color="#23623c" />
      <p className="text-green-900 mt-5">{message}</p>
    </div>
  );
};

export default Spinner;
