const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require("./utils/geocode")


// Express config
app.use(express.static(path.join(__dirname, '../public')))
const viewsPath =  path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: "Jessica Scianimanica"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help Page",
    name: "Get some help"
  })
})



app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    })
  }

  geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
    geocode.forecast(latitude, longitude, (error, data) =>  {
      res.send({
        forecast: data,
        location
      })
    })
  })

})


app.get('*', (req, res) => {
  res.send("Page not found")
})

app.listen(3000, ()  => {
  console.log('Server is up on port 3000.')
})
