const { WeatherService } = require('../services')

async function post (req, res) {
  const resp = await WeatherService.fetchWeather(req, res)
  console.log(resp )
  //res.send(resp)
  req.responseObject = resp
}

module.exports = {
    post
}
