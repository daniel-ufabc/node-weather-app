const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Danny'
    })
})


app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Danny'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address on your query.'
        })
    }

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            res.send({
                error
            })
        } else {
            forecast(latitude, longitude, (error, { description, temperature, feelslike } = {}) => {
                if (error) {
                    res.send({
                        error
                    })
                } else {
                    const forecast_text = description + '. It is ' + temperature + '°F, it feels like ' + feelslike + '°F'
                    res.send({
                        location,
                        forecast: forecast_text,
                        address: req.query.address
                    })
                }
            })
        }
    })

    
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Danny',
        message: 'Hey, this is your help message!'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found.',
        name: 'Danny'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found.',
        name: 'Danny'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000... ')
})

