const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(cors())

app.get('/weather/:location', (req, res) => {
    const location = req.params.location
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_RAPID_API_KEY}&units=metric`
    axios.get(url).then((resp) => {
        res.json(resp.data)
      }).catch((err)=> {console.log(err)})
})

app.listen(8000,()=> {
    console.log('Server running on port ' + 8000)
})