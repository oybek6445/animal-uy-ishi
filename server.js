const app = require('./middleware/app.js')
const connectDb = require('./model/connectDb.js')
const animalRoutes = require('./routes/aniRoute.js')
const dotenv = require('dotenv').config()

async function startServer() {
    try {
        await connectDb()
        
        app.use('/api', animalRoutes)

        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server ${PORT}da ishga tushdi`)
        })
    } catch (err) {
        console.error('Failed to start server:', err)
    }
}

startServer()
