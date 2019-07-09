const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

//Dynaaminen sivu index (hbs)
app.get('', (req, res) => {
    res.render('index', {
        title: 'Säähaku',
        author: 'by Simo Sirén'
    })
})
//Dynaaminen sivu about (hbs)
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Tietoja sovelluksesta',

    })
})

//Staattinen sivu.
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Anna paikkatieto!'
        })
    }
    //tyhjät aaltosulut alla = {} asettavat oletusarvon jos joku parametri puuttuu, ja ohjelma ei kaadu
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error }) // = { error: error } -lyhennetty muoto
        }
        weather(latitude, longitude, (error, weatherData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                weather: weatherData,
                location,
                address: req.query.address
            })

        })
    })

})

//* = Villi kortti, polku mätsää kaikkeen mikä ei ole vielä mätsännyt, koska sijoitus on muiden getien jälkeen.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404, Page not found! Sivua ei löydy!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})