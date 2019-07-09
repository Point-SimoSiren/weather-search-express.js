const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2ltcHBhODEiLCJhIjoiY2p4bWh3bnE4MDA1ejNscnZyNW41NDFveSJ9.zlUrdtXy2goDMrZ5uWUXgA'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Ei yhteyttä paikkatietopalveluun. Onhan internetyhteys kunnossa?', undefined)
        }

        else if (body.features.length === 0) { //Geopalvelimelta ei tule erroria responsessa, johon body kuuluu mutta tartutaan datan puuttumiseen.
            callback('Paikkatietoa annetulla ehdolla ei löydy. Kokeile uutta hakua.', undefined)
        }

        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode