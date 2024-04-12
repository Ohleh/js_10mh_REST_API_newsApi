// https://thecatapi.com
// axios.defaults.headers.common['x-api-key'] =
//   'live_HLM1hsQ0tkLTQgU4vMq98s2XjilsTWNx2KVDtgfwRZOhNbaF9uBwUUnvoBxWLSc5';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_HLM1hsQ0tkLTQgU4vMq98s2XjilsTWNx2KVDtgfwRZOhNbaF9uBwUUnvoBxWLSc5';
const BASE_URL = {
  BREED: 'https://api.thecatapi.com/v1',
  ID: 'https://api.thecatapi.com/v1/images',
};

let breedsData;

const breedsGet = data => {
  return data.map(breed => ({ id: breed.id, name: breed.name }));
};

const fetchBreeds = axios
  .get(`${BASE_URL.BREED}/breeds`)
  .then(({ data }) => {
    breedsData = breedsGet(data);
  })
  .catch(function (error) {
    console.log(error);
  });

const promiseBreed = () => {
  return fetchBreeds.then(e => {
    return breedsData;
  });
};

// const catGet = dataId => {
//   return dataId.map(catCard => {
//     console.log(catCard.url);
//     catCard.breeds.map(breed => console.log(breed.description));
//     return { url: catCard.url, description: breed.description };
//   });
// };

const fetchCatByBreed = currentId => {
  const result = axios
    .get(`${BASE_URL.ID}/search?breed_ids=${currentId}`)
    .then(({ data }) => {
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return result;
};

export { promiseBreed, fetchCatByBreed };
