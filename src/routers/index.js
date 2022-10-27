
const { HelloController, WeatherController } = require('../controllers')
const { asyncwrap } = require('../middleware')

const hello = function ({ router }) {
  router.get('/', asyncwrap(HelloController.get))
  return router
}

const fetchWeather = function ({ router }) {
  router.post('/', asyncwrap(WeatherController.post))
  return router
}

module.exports = {
  hello,
  fetchWeather
}
