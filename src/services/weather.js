const config = require('./../config')
const axios = require('axios')


const fetchWeather = async (req, res) => {
    const { body: { city } } = req
    if (city) {
        const WEATHER_URL = config.OPEN_WEATHER_URL_1 + city + config.OPEN_WEATHER_URL_2 + config.API_KEY
        //console.log(WEATHER_URL)
        try{
        const result = await axios.get(WEATHER_URL)
        if (result.data && result.data.cod === 200) {
            let weather = result.data;
            let response = {}
            response.city = weather.name || req.body.city
            response.coordinates = weather.coord
            response.description = weather.weather.description || ''
            response.weather = weather.main
            response.weather.wind = weather.wind
            //console.log({ response });
            return {success: true, data: response, code: 200 }
        }else{
            return { success: false,code: 404, message: 'Error occurred while fetching weather data' }
        }}catch(err){
            const { response: {data, status}, code, message, ...rest} = err
            //console.log('error occurred', data)
            return { success: false, code: data.cod, message: data.message || 'Error occurred while fetching weather data'}
        }
    } else {
        //console.log('please enter city')
        return { success: false,code: 404, message: 'Please send the city name whose weather details to be fetched' }
    }
}

module.exports = {
    fetchWeather
}