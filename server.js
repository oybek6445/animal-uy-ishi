const app = require(`./middleware/app.js`)
const dotenv = require('dotenv').config()

let PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server ${PORT}da ishga tushdi`)
})