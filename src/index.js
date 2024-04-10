// https://thecatapi.com
// 'api_key=live_HLM1hsQ0tkLTQgU4vMq98s2XjilsTWNx2KVDtgfwRZOhNbaF9uBwUUnvoBxWLSc5'
// https://api.thecatapi.com/v1/images/search

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
  })
  .catch(err => {
    console.log('errr', err);
  });

// const KEY =
//   'live_HLM1hsQ0tkLTQgU4vMq98s2XjilsTWNx2KVDtgfwRZOhNbaF9uBwUUnvoBxWLSc5';
// const BASE_URL = 'https://api.thecatapi.com/v1/images';
// console.log('hi');

// fetch(`${BASE_URL}/search?breed_ids=mcoo&api_key=${KEY}`)
//   .then(res => {
//     if (!res.ok) {
//       throw new Error(res.status);
//     }
//     return res.json();
//   })
//   .then(data => console.log(data))
//   .catch(e => console.log('erroe', e));

// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_HLM1hsQ0tkLTQgU4vMq98s2XjilsTWNx2KVDtgfwRZOhNbaF9uBwUUnvoBxWLSc5';
// const BASE_URL = 'https://api.thecatapi.com/v1';

// axios
//     .get(`${BASE_URL}/breeds`)
//   .then(res => {
//     console.log(res);
//     breedsList = res;
//     console.log(breedsList.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
