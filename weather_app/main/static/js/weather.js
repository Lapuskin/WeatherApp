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

  data.forEach(city => {
//    console.log(city);
    const buttonElement = document.createElement('button');
    buttonElement.textContent = city.name;
    const span = document.createElement('span');
    span.textContent = `${city.country}, latitude: ${city.latitude}, longitude: ${city.longitude}`;

    const br = document.createElement('br');

    buttonElement.appendChild(br);
    buttonElement.appendChild(span);

//    buttonElement.addEventListener('click', button.onClick);
    buttonsContainer.appendChild(buttonElement);
  });
}

const searchInput = document.getElementById('city-input');
searchInput.addEventListener('input', (event) => {
  if(event.target.value){
    const query = event.target.value;
    createButtons(query);
  }
});