const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
        encodeURIComponent(address) + 
        '.json?access_token=pk.eyJ1IjoiZGFuaWVsbW1hcnRpbiIsImEiOiJja2N0cG1tdWowdWJnMnlwN2c1ZXAybnZuIn0.SjJBbwYltMpK4gBGRpz-cA&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.', undefined)
        } else {
            const place = body.features[0]
            const location = place.place_name
            const latitude = place.center[1]
            const longitude = place.center[0]
                
            callback(undefined, { 
                latitude, 
                longitude, 
                location
            })
        }
    })
}

module.exports = geocode