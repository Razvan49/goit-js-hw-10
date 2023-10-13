// cat-api.js

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_GxntjWVFysDDmK65w6CHaORQQrcqgqVj2RgeSSBKRwPWbtOJQu5vYIWL93TEwLlM';

// Funcția pentru a efectua cererea pentru colecția de rase
export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      showError('Nu s-a putut obține lista de rase.');
      throw error;
    });
}

// Funcția pentru a efectua cererea pentru informații despre pisică în funcție de rasă
export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      showError('Nu s-au putut obține informațiile despre pisică.');
      throw error;
    });
}

// Funcția pentru a afișa loaderul și ascunde elementele corespunzătoare
export function showLoader() {
  document.querySelector('.loader').style.display = 'block';
  document.querySelector('.cat-info').style.display = 'none';
  document.querySelector('.breed-select').style.display = 'none';
  document.querySelector('.error').style.display = 'none';
}

// Funcția pentru a ascunde loaderul și a afișa elementele corespunzătoare
export function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
  document.querySelector('.cat-info').style.display = 'flex';
  document.querySelector('.breed-select').style.display = 'block';
  document.querySelector('.error').style.display = 'none';
}

// Funcția pentru a afișa mesajul de eroare și ascunde celelalte elemente
export function showError(message) {
  document.querySelector('.error').textContent = message;
  document.querySelector('.error').style.display = 'block';
  document.querySelector('.loader').style.display = 'none';
  document.querySelector('.cat-info').style.display = 'none';
  document.querySelector('.breed-select').style.display = 'none';
}

// Funcția pentru a sterge mesajul de eroare și afiseaza celelalte elemente
// export function hideError(message) {
//   document.querySelector('.error').style.display = 'none';
//   document.querySelector('.loader').style.display = 'none';
//   document.querySelector('.cat-info').style.display = 'flex';
//   document.querySelector('.breed-select').style.display = 'block';
// }
