const API_URL = 'https://restcountries.com/v3.1/name/';
const api_options = 'fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${API_URL}${name}?${api_options}`).then(res => res.json());
}

export default { fetchCountries };
