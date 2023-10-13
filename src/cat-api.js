// cat-api.js

import axios from 'axios';
import Notiflix from 'notiflix'; // Importă Notiflix
import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key'] =
  'live_GxntjWVFysDDmK65w6CHaORQQrcqgqVj2RgeSSBKRwPWbtOJQu5vYIWL93TEwLlM';

// Funcția pentru a efectua cererea pentru colecția de rase
export function fetchBreeds() {
  showLoader(); // Arată loader
  hideError(); // Ascunde eroarea (dacă există)
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      hideLoader(); // Ascunde loader după ce s-au încărcat datele cu succes
      return response.data;
    })
    .catch(error => {
      showError('Oops! Something went wrong! Try reloading the page!'); // Afiseaza eroarea
      hideLoader(); // Ascunde loader în caz de eroare
      throw error;
    });
}
// Funcția pentru a efectua cererea pentru informații despre pisică în funcție de rasă
export function fetchCatByBreed(breedId) {
  showLoader(); // Arată loader
  hideError(); // Ascunde eroarea (dacă există)
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      hideLoader(); // Ascunde loader după ce s-au încărcat datele cu succes
      return response.data[0];
    })
    .catch(error => {
      showError('Oops! Something went wrong! Try reloading the page!'); // Afiseaza eroarea
      hideLoader(); // Ascunde loader în caz de eroare
      throw error;
    });
}

// Funcția pentru a afișa loaderul și ascunde elementele corespunzătoare
export function showLoader() {
  document.querySelector('.loader').style.display = 'block';
  document.querySelector('.cat-info').style.display = 'none';
  hideError(); // Ascunde eroarea
}

// Funcția pentru a ascunde loaderul și a afișa elementele corespunzătoare
export function hideLoader() {
  document.querySelector('.loader').style.display = 'none';
  document.querySelector('.cat-info').style.display = 'flex';
}

// Funcția pentru a afișa mesajul de eroare și ascunde celelalte elemente
export function showError(message) {
  // Utilizează Notiflix Notify pentru a afișa notificarea de eroare
  Notiflix.Notify.failure(message);

  // Ascunde elementele corespunzătoare
  document.querySelector('.cat-info').style.display = 'none';
  document.querySelector('.breed-select').style.display = 'none';
}

// Funcția pentru a sterge mesajul de eroare și afiseaza celelalte elemente
export function hideError() {
  document.querySelector('.error').style.display = 'none';
}
