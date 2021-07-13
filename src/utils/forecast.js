
const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/5575c8ba7426b8ee259fbefac0417b8a/' + lat + ',' + long + '?units=si'
                                            //response
    request( { url , json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        }else if (body.error) { // response.body.error
            callback('Unable to find location.', undefined)
        }else{
            console.log(body.currently.uvIndex)
            const uvIndex = body.currently.uvIndex
            const temp = body.currently.temperature 
            const precipProb = body.currently.precipProbability
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out. There is a '+ precipProb + '% chance of rain. UV index is ' + uvIndex) 
        } 
    })
}

module.exports = forecast