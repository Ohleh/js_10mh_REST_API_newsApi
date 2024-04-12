// https://thecatapi.com
import { promiseBreed, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';

let breedsList;
const selectRef = document.querySelector('select.breed-select');
const catInfoRef = document.querySelector('div.cat-info');
const errorMes = document.querySelector('p.error');

const runSlim = () => {
  new SlimSelect({
    select: selectRef,
    settings: {
      placeholderText: 'Сhoose breed',
    },
  });
};

const createSelectItem = breed =>
  `<option value="${breed.name}">${breed.name}</option>`;

const createSelectList = breeds =>
  breeds.reduce((acc, breed) => acc + createSelectItem(breed), '');

const renderOptionsSelect = breeds => {
  const list = createSelectList(breeds);
  selectRef.insertAdjacentHTML('afterbegin', list);
  runSlim();
};

promiseBreed()
  .then(breeds => {
    renderOptionsSelect(breeds);
    breedsList = breeds;
  })
  .catch(err => {
    console.log('errr', err);
    errorMes.classList.remove('hide');
  });

const renderMarkup = (url, name, description) => {
  const markup = `<img src=${url} alt=${name} height=300> <H3>${name} </H3> <p>${description}</p>`;
  catInfoRef.insertAdjacentHTML('beforeend', markup);
};

const findBreedId = selectBreedName => {
  breedsList.map(catName => {
    if (catName.name === selectBreedName) {
      fetchCatByBreed(catName.id)
        .then(data => {
          data.map(catCard => {
            const catUrl = catCard.url;
            if (catCard.breeds.length === 0) {
              return errorMes.classList.remove('hide');
            }
            catCard.breeds.map(breed => {
              const catDescr = breed.description;
              const catName = breed.name;

              renderMarkup(catUrl, catName, catDescr);
            });
          });
        })
        .catch(e => {
          console.log('error:', e);
          errorMes.classList.remove('hide');
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
