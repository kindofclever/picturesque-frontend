import React, { useState } from 'react';

import {
  Navbar,
  ImageFeed,
  CardDetails,
  CreateCard,
  SearchBar,
} from '../components';

import { Routes, Route } from 'react-router-dom';

const Cards = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="px-2 md:px-5">
      <div className="bg-green-100">
        <Navbar
          searchTerm={searchTerm}
          setSeacrhTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<ImageFeed />} />
          <Route path="/category/:categoryId" element={<ImageFeed />} />
          <Route path="/image/:imageId" element={<CardDetails user={user} />} />
          <Route path="/create-card" element={<CreateCard user={user} />} />
          <Route
            path="/search"
            element={
              <SearchBar
                searchTerm={searchTerm}
                setSeacrhTerm={setSearchTerm}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Cards;
