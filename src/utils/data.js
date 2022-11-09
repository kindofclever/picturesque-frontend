export const userQuery = (userId) => {
  const query = `*[_type=="user" && _id=="${userId}"]`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type=="card" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}'*]{
    image {
      asset -> {
        url
      }
    }, 
    _id,
    destinationUrl,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id, 
        userName,
        image
      },
    },
  }`;
  return query;
};

export const allCardsQuery = `*[_type=="card"] | order(_createdAt desc)
  {image {
    asset -> {
      url
    }
  }, 
  _id,
  destinationUrl,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id, 
      userName,
      image
    },
  },
}`;
