const express = require(`express`)
const aniRoute = require("../routes/aniRoute")

let app = express()

app.use(`/`,aniRoute)

module.exports = app