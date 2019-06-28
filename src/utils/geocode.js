const request = require('request')



const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/40c458422f5b9cbe64f8f0d25583d1fd/${latitude},${longitude}`
  request({url, json: true }, (error, {body}) => {
     if (error) {
      callback("We have a problem")
     } else {
      callback(undefined, `Is is currently ${((body.currently.temperature - 32)*5/9).toFixed(2)} degrees out. There is a ${body.currently.precipProbability} % chance of rain`)
    }
  })
}



const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamVzc2lzY2lhbmkiLCJhIjoiY2p4Mzdjd3BlMDB1NjQ0cDkza3NpbjN2NSJ9.KbRsY5TE8flg-MqtHTu5EQ`
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services')
    } else if (body.features.length === 0) {
      callback('Unable to find location')
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}



module.exports = {
  geocode: geocode,
  forecast: forecast
}
