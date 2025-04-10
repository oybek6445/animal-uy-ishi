const express = require('express')
const connectDb = require('../model/connectDb')

let aniRoute = express.Router()

aniRoute.get('/animals/:id', async (req, res) => {
    try {
        const id = req.params.id
        const client = await connectDb()
        const response = await client.query('SELECT * FROM students WHERE id = $1', [id])
        await client.end()
        
        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' })
        }
        
        res.json({ habar: response.rows[0] })
    } catch (err) {
        console.error('Database error:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

aniRoute.put('/animals/:id', (req, res) => {
    // TODO: Implement PUT logic
    res.status(501).json({ error: 'Not implemented' })
})

aniRoute.delete('/animals/:id', (req, res) => {
    // TODO: Implement DELETE logic
    res.status(501).json({ error: 'Not implemented' })
})

module.exports = aniRoute
