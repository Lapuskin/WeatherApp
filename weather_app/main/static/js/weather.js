async function searchData(query) {
  try {
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`);

    if (response.ok) {
      const json_data = await response.json();
      console.log(query)
      return json_data.results;

    } else {
      console.error('Ошибка при выполнении AJAX-запроса.');
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

async function createButtons(query) {
  const buttonsContainer = document.getElementById('city-dropdown');
  buttonsContainer.innerHTML = '';
  const data = await searchData(query);
  console.log('data is', data);

  const latitude = document.getElementById('latitude-input');
  const longitude = document.getElementById('longitude-input');

  data.forEach(city => {
    //    console.log(city);
    const buttonElement = document.createElement('button');
    buttonElement.textContent = city.name;
    const span = document.createElement('span');
    span.textContent = `${city.country}, latitude: ${city.latitude}, longitude: ${city.longitude}`;

    const br = document.createElement('br');

    buttonElement.appendChild(br);
    buttonElement.appendChild(span);

    buttonElement.addEventListener('click', () => {
      buttonClickHandler(city, latitude, longitude, searchInput);
    });

    buttonsContainer.appendChild(buttonElement);
  });
}

function buttonClickHandler(city, latitude, longitude, searchInput) {
  const buttonsContainer = document.getElementById('city-dropdown');

  buttonsContainer.style.display = 'none'  
  latitude.value = city.latitude;
  longitude.value = city.longitude;
  searchInput.value = city.name;


}

const searchInput = document.getElementById('city-input');
searchInput.addEventListener('input', (event) => {
  const buttonsContainer = document.getElementById('city-dropdown');
  const query = event.target.value;
  createButtons(query);
  buttonsContainer.style.display = 'flex'
});