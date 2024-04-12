// https://thecatapi.com
import { promiseBreed, fetchCatByBreed } from './js/cat-api';

let breedsList;
const selectRef = document.querySelector('select.breed-select');
const catInfoRef = document.querySelector('div.cat-info');

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

const renderMarkup = (url, name, description) => {
  const markup = `<img src=${url} alt=${name} height=300> <H3>${name} </H3> <p>${description}</p>`;
  catInfoRef.insertAdjacentHTML('beforeend', markup);
};

const findBreedId = selectBreedName => {
  breedsList.map(catName => {
    if (catName.name === selectBreedName) {
      fetchCatByBreed(catName.id).then(data => {
        data.map(catCard => {
          const catUrl = catCard.url;
          catCard.breeds.map(breed => {
            const catDescr = breed.description;
            const catName = breed.name;
            renderMarkup(catUrl, catName, catDescr);
          });
        });
      });
    }
  });
};

const onSelect = e => {
  catInfoRef.textContent = '';
  const selectBreedName = selectRef.value; // ім'я
  findBreedId(selectBreedName);
};

selectRef.addEventListener('change', onSelect);
