
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')  // giving customized name , bydefault name should be given views
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')          // to setup handlebar
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))     // way to customize server

// //req: request , res: response
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')            // sends to user who has requested
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

// app.get('/about', (req, res) => {
//     res.send("<h1><center>About Route</center></h1>")
// })

app.get('', (req, res) => {
    res.render('index', {       // first parameter is name of html file
        title: 'Weather',
        name: 'Use this site to get your weather!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        email: 'net@ninja.com',
        phn: 9371201920,
        name: "Andrew Mead"
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    // console.log(req.query.address)

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products: [req.query.search],
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'Help page not found',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: 'ERROR_404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})             // starts the server , input taken is ports