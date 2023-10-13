import axios from 'axios';
import Notiflix from 'notiflix'; // Importă Notiflix
import SlimSelect from 'slim-select';

import {
  fetchBreeds,
  fetchCatByBreed,
  showLoader,
  hideLoader,
  showError,
  hideError,
} from './cat-api.js';

axios.defaults.headers.common['x-api-key'] =
  'live_GxntjWVFysDDmK65w6CHaORQQrcqgqVj2RgeSSBKRwPWbtOJQu5vYIWL93TEwLlM';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
// Funcția pentru a popula selectorul cu opțiuni de rase

function populateBreedsSelect(breeds) {
  breedSelect.innerHTML = '';

  // Adăugăm opțiunea "Select..." înainte de rasele reale
  const selectOption = document.createElement('option');
  selectOption.value = '';
  selectOption.text = 'Select...';
  breedSelect.appendChild(selectOption);

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
}

function displayCatInfo(cat) {
  catInfo.innerHTML = '';

  const catImage = document.createElement('img');
  catImage.className = 'cat__image';
  catImage.src = cat.url;
  catImage.alt = cat.breeds[0].name;

  // Creează un element <div> nou

  const catDetails = document.createElement('div');
  catDetails.className = 'cat__details';

  const catName = document.createElement('p');
  catName.className = 'cat__name';
  catName.textContent = `Breed: ${cat.breeds[0].name}`;

  const catDescription = document.createElement('p');
  catDescription.className = 'cat__description';
  catDescription.textContent = `Description: ${cat.breeds[0].description}`;

  const catTemperament = document.createElement('p');
  catTemperament.className = 'cat__temperament';
  catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

  // Adaugă elementele <p> în noul element <div>
  catDetails.appendChild(catName);
  catDetails.appendChild(catDescription);
  catDetails.appendChild(catTemperament);

  // Adaugă imaginea și noul element <div> în catInfo
  catInfo.appendChild(catImage);
  catInfo.appendChild(catDetails);
}

// Manipulați evenimentul de schimbare a selecției rasei
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  if (selectedBreedId) {
    showLoader();
    hideError(); // Ascunde mesajul de eroare înainte de cerere
    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        displayCatInfo(cat);
        hideLoader();
      })
      .catch(error => {
        hideLoader();
      });
  }
});

// La încărcarea paginii, populați selectorul de rase
showLoader();
hideError(); // Ascunde mesajul de eroare la început
fetchBreeds()
  .then(breeds => {
    populateBreedsSelect(breeds);
    hideLoader();
  })
  .catch(error => {
    hideLoader();
  });
