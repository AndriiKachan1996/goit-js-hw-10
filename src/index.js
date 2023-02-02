import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.getElementById('search-box'),
  cardEl: document.querySelector('.country-info'),
  listEl: document.querySelector('.country-list'),
};

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// ==================================================================================

function onInput(e) {
  let inputValue = e.target.value.trim();

  API.fetchCountries(inputValue).then(countries => {
    if (countries.status === 404) {
      notifyFailure();
      removeCard();
      removeList();
    } else if (countries.length === 1) {
      createMarcupForOneCountry(countries[0]);
      removeList();
    } else if (countries.length > 10) {
      notifyInfo();
      removeCard();
      removeList();
    } else if (countries.length > 1) {
      creatMurcupForAllCountry(countries);
      removeCard();
    } else if (inputValue === '') {
      removeCard();
      removeList();
    }
  });
}

function creatMurcupForAllCountry(countries) {
  const marcup = countries
    .map(
      country => `<div class = "list-country">
        <img src = "${country.flags.png}" alt = "flag country" width = "200" height = "100"> <h1 class = "countries"> ${country.name.official}</h1> 
        </div>
        `
    )
    .join('');

  refs.listEl.innerHTML = marcup;
}

function createMarcupForOneCountry({
  name,
  flags,
  capital,
  languages,
  population,
}) {
  const allLanguage = Object.values(languages);

  const marcup = `<ul><li>
  <img src="${flags.png}" alt="country flag" width="200" height="100">
<h1 class="country-name">${name.common}</h1>
</li>
<li><span>Capital:</span> ${capital}</li>
<li><span>Population:</span> ${population}</li>
<li><span>Languages:</span> ${allLanguage}</li></ul>

`;

  refs.cardEl.innerHTML = marcup;
}

function removeCard() {
  refs.cardEl.innerHTML = '';
}

function removeList() {
  refs.listEl.innerHTML = '';
}

function notifyFailure() {
  return Notiflix.Notify.failure('Oops, there is no country with that name');
}

function notifyInfo() {
  return Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
