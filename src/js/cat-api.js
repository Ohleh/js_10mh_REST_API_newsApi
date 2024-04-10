import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_HLM1hsQ0tkLTQgU4vMq98s2XjilsTWNx2KVDtgfwRZOhNbaF9uBwUUnvoBxWLSc5';
const BASE_URL = 'https://api.thecatapi.com/v1';

let breedsData;

const breedsGet = data => {
  return data.map(breed => ({ id: breed.id, name: breed.name }));
};

const getbreeds = axios
  .get(`${BASE_URL}/breeds`)
  .then(({ data }) => {
    breedsData = breedsGet(data);
  })
  .catch(function (error) {
    console.log(error);
  });

const promiseBreed = () => {
  return getbreeds.then(e => {
    return breedsData;
  });
};
export { promiseBreed };
