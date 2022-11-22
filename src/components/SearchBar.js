import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const SearchBar = ({ searchTerm }) => {
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setCards(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setCards(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching for images" />}
      {cards?.length !== 0 && <MasonryLayout cards={cards} />}
      {cards?.length === 0 && searchTerm !== '' && !loading && (
        <div className="text-green-900 mt-10 text-center text-xl ">
          No images found!
        </div>
      )}
    </div>
  );
};

export default SearchBar;
