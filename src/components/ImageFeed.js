import React, { useState, useEffect } from 'react';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { searchQuery, allCardsQuery } from '../utils/data';

import { useParams } from 'react-router-dom';

const ImageFeed = () => {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      const fetchData = async (q) => {
        try {
          const cards = await client.fetch(q);
          setCards(cards);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData(query);
    } else {
      const fetchData = async (q) => {
        try {
          const cards = await client.fetch(q);
          setCards(cards);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData(allCardsQuery);
    }
  }, [categoryId]);

  if (!cards?.length)
    return (
      <h2 className="text-green-900">
        There are no pictures in this categroy at the moment
      </h2>
    );

  if (loading) return <Spinner message="Loading images" />;

  return <div>{cards && <MasonryLayout cards={cards} />}</div>;
};

export default ImageFeed;
