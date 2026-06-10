const MONEY_URL = 'https://open.er-api.com/v6/latest/USD';
const WEATHER_URL = 'https://wttr.in/Saint-Petersburg?format=j1';

export async function loadMoney() {
  const response = await fetch(MONEY_URL);

  if (!response.ok) {
    throw new Error('Ошибка загрузки курса валют');
  }

  const data = await response.json();

  return {
    usd: formatNumber(data.rates.RUB),
    eur: formatNumber(data.rates.RUB / data.rates.EUR)
  };
}

export async function loadWeather() {
  const response = await fetch(WEATHER_URL);

  if (!response.ok) {
    throw new Error('Ошибка загрузки погоды');
  }

  const data = await response.json();
  const current = data.current_condition[0];

  return {
    city: 'Санкт-Петербург',
    temp: `${current.temp_C}°C`,
    wind: `${current.windspeedKmph} км/ч`
  };
}

function formatNumber(value) {
  return Number(value).toFixed(2).replace('.', ',');
}
