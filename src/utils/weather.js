const request = require('request')


const weather = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/eb220f396a21ed133c88f2063bb6fe0b/' + latitude + ',' + longitude + '?units=si&lang=fi'

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Ei yhteyttä sääpalveluun. Onhan internetyhteys kunnossa?', undefined)
        }

        else if (body.error) { //sääpalvelimelta tuleva errorviesti on responsessa, ei errorissa.
            callback('Säätietoa annetuilla parametreilla ei löydy!', undefined)
        }

        else {
            callback(undefined, body.daily.data[0].summary + ' Kohteessa lämpötila tällä hetkellä: ' + body.currently.temperature + ' C. Sateen todennäköisyys: ' + body.currently.precipProbability + '%')
        }
    })
}

module.exports = weather