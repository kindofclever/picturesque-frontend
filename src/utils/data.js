export const categories = [
  {
    name: 'Forests',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  },
  {
    name: 'Mountains',
    image:
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80',
  },
  {
    name: 'Water',
    image:
      'https://images.unsplash.com/photo-1488188840666-e2308741a62f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80',
  },
  {
    name: 'Desert',
    image:
      'https://images.unsplash.com/photo-1511860810434-a92f84c6f01e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'Jungle',
    image:
      'https://images.unsplash.com/photo-1565138146061-e29b079736c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
  },
  {
    name: 'Islands',
    image:
      'https://images.unsplash.com/photo-1573548842355-73bb50e50323?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
  {
    name: 'Snow',
    image:
      'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  },
];

export const userQuery = (userId) => {
  const query = `*[_type=="user" && _id=="${userId}"]`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "card" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destinationUrl,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
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

export const cardDetailQuery = (imgId) => {
  const query = `*[_type == "card" && _id == '${imgId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destinationUrl,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const cardDetailMoreCardQuery = (img) => {
  const query = `*[_type == "card" && category == '${img.category}' && _id != '${img._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destinationUrl,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userCreatedCardsQuery = (userId) => {
  const query = `*[ _type == 'card' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destinationUrl,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedCardsQuery = (userId) => {
  const query = `*[_type == 'card' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destinationUrl,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
