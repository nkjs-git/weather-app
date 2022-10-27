const config = require('./../config')
const axios = require('axios')


const fetchWeather = async (req, res) => {
    const { body: { city } } = req
    let response = { title: '' }
    if (city) {
        const WEATHER_URL = config.OPEN_WEATHER_URL_1 + city + config.OPEN_WEATHER_URL_2 + config.API_KEY
        
        const result = await axios.get(WEATHER_URL)
        console.log(result.data)
        if (result.data && result.data.cod === 200) {
            let weather = result.data;
            let response = {}
            response.city = weather.name || req.body.city
            response.coordinates = weather.coord
            response.description = weather.weather.description || ''
            response.weather = weather.main
            response.weather.wind = weather.wind
            console.log({ response });
            return {data: response, code: 200 }
        }
    } else {
        let message = 'please enter city'
        console.log('please enter city')
        return { success: false, message }
    }
}

module.exports = {
    fetchWeather
}