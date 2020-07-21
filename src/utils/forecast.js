const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const access_key = '1aaa7095225d6ad562767dcd71aa1fc1'
    const query = '?access_key=' + access_key + '&query=' + latitude + ',' + longitude + '&units=f'
    const url = 'http://api.weatherstack.com/current' + query

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const description = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const humidity = body.current.humidity
            
            callback(undefined, {
                description,
                temperature,
                feelslike,
                humidity
            })
        }    
    })
}

module.exports = forecast