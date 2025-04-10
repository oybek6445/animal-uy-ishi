const express = require('express')
const connectDb = require('../model/connectDb')

let aniRoute = express.Router()

aniRoute.get('/animals/:id', async (req, res) => {
    try {
        const id = req.params.id
        const client = await connectDb()
        const response = await client.query('SELECT * FROM animals WHERE id = $1', [id])
        await client.end()
        
        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Animal not found' })
        }
        
        res.json({ habar: response.rows[0] })
    } catch (err) {
        console.error('Database error:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

aniRoute.put('/animals/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { name, age } = req.body
        
        if (!name || !age) {
            return res.status(400).json({ error: 'Name and age are required' })
        }

        const client = await connectDb()
        const response = await client.query(
            'UPDATE animals SET name = $1, age = $2 WHERE id = $3 RETURNING *',
            [name, age, id]
        )
        await client.end()

        if (response.rowCount === 0) {
            return res.status(404).json({ error: 'Animal not found' })
        }

        res.json({ habar: response.rows[0] })
    } catch (err) {
        console.error('Database error:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

aniRoute.delete('/animals/:id', async (req, res) => {
    try {
        const id = req.params.id
        const client = await connectDb()
        const response = await client.query(
            'DELETE FROM animals WHERE id = $1 RETURNING *',
            [id]
        )
        await client.end()

        if (response.rowCount === 0) {
            return res.status(404).json({ error: 'Animal not found' })
        }

        res.json({ habar: 'Animal deleted successfully' })
    } catch (err) {
        console.error('Database error:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

aniRoute.get('/animals-with-type', async (req, res) => {
    try {
        const client = await connectDb()
        const response = await client.query(`
            SELECT a.id, a.name, at.type_name 
            FROM animals a
            INNER JOIN animal_types at ON a.type_id = at.id
        `)
        await client.end()
        
        res.json(response.rows)
    } catch (err) {
        console.error('Database error:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

aniRoute.post('/animals', async (req, res) => {
    try {
        const { name, age, type_id } = req.body
        
        if (!name || !age || !type_id) {
            return res.status(400).json({ error: 'Name, age and type_id are required' })
        }

        const client = await connectDb()
        const response = await client.query(
            'INSERT INTO animals (name, age, type_id) VALUES ($1, $2, $3) RETURNING *',
            [name, age, type_id]
        )
        await client.end()

        res.status(201).json({ habar: response.rows[0] })
    } catch (err) {
        console.error('Database error:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})


module.exports = aniRoute
