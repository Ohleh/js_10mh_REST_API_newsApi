// https://thecatapi.com
import { promiseBreed, fetchCatByBreed } from './js/cat-api';

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

promiseBreed()
  .then(breeds => {
    renderOptionsSelect(breeds);
    breedsList = breeds;
  })
  .catch(err => {
    console.log('errr', err);
  });

const findBreedId = selectBreedName => {
  const breedItem = breedsList.map(catName => {
    if (catName.name === selectBreedName) {
      const getCat = fetchCatByBreed(catName.id);
      getCat.then(data => {
        data.map(catCard => {
          console.log(catCard.url);
          catCard.breeds.map(breed => console.log(breed.description));
        });
      });
    }
  });
};

const onSelect = e => {
  const selectBreedName = selectRef.value; // ім'я
  findBreedId(selectBreedName);
};

selectRef.addEventListener('change', onSelect);
