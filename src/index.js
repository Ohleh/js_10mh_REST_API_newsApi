// https://thecatapi.com

import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_HLM1hsQ0tkLTQgU4vMq98s2XjilsTWNx2KVDtgfwRZOhNbaF9uBwUUnvoBxWLSc5';
const BASE_URL = 'https://api.thecatapi.com/v1/images';

let breedsList;
const selectRef = document.querySelector('.breed-select');

const createSelectItem = breed =>
  `<option value="${breed.name}">${breed.name}</option>`;

const createSelectList = breeds =>
  breeds.reduce((acc, breed) => acc + createSelectItem(breed), '');

const renderOptionsSelect = breeds => {
  const list = createSelectList(breeds);
  selectRef.insertAdjacentHTML('afterbegin', list);
};

import { promiseBreed } from './js/cat-api';
promiseBreed()
  .then(breeds => {
    renderOptionsSelect(breeds);
    breedsList = breeds;
  })
  .catch(err => {
    console.log('errr', err);
  });
///////////

const getCatInfo = currentId => {
  axios.get(`${BASE_URL}/search?breed_ids=${currentId}`).then(({ data }) => {
    console.log(data);
    data.map(catCard => {
      console.log(catCard.url);
      catCard.breeds.map(breed => console.log(breed.description));
    });
  });
};

const findBreedId = selectBreedName => {
  console.log(selectBreedName);
  console.log(breedsList);
  const breedItem = breedsList.map(catName => {
    if (catName.name === selectBreedName) {
      getCatInfo(catName.id);
      console.log(catName.id);
    }
  });
};

const onSelect = e => {
  const selectBreedName = selectRef.value; // ім'я
  //   console.log(selectRef.value);
  findBreedId(selectBreedName);
  //   getCatInf(breedsList);
};

selectRef.addEventListener('change', onSelect);
