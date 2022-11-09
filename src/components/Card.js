import React from 'react';

import { urlFor } from '../client';

const Card = ({ card: { image, postedBy, _id, destinationUrl } }) => {
  return (
    <div>
      <img
        src={urlFor(image).width(250).url()}
        alt="user-post"
        className="rounded-lg w-full"
      />
    </div>
  );
};

export default Card;
