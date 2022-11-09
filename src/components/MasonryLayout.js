import React from 'react';
import Card from './Card';

import Masonry from 'react-masonry-css';

const breakpoints = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  600: 1,
};

const MasonryLayout = ({ cards }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpoints}>
      {cards?.map((card) => (
        <Card key={card._id} card={card} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
