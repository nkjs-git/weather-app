const {
  API_KEY = '4e05a4d54055e8bb36c1078bbc0260c7',
  OPEN_WEATHER_URL_1 = 'http://api.openweathermap.org/data/2.5/weather?q=',
  OPEN_WEATHER_URL_2 = '&units=metric&appid='
} = process.env

const config = {
  API_KEY,
  OPEN_WEATHER_URL_1,
  OPEN_WEATHER_URL_2
}

module.exports = config
