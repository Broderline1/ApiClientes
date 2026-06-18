const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente')

// GET todos
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find()
        res.json(clientes)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET por clave
router.get('/:clave', async (req, res) => {
    try {
        const cliente = await Cliente.findOne({ clave: req.params.clave })
        if (!cliente) return res.status(404).json({ error: 'No encontrado' })
        res.json(cliente)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// POST crear
router.post('/', async (req, res) => {
    try {
        const cliente = new Cliente(req.body)
        await cliente.save()
        res.status(201).json(cliente)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// PUT actualizar
router.put('/:clave', async (req, res) => {
    try {
        const cliente = await Cliente.findOneAndUpdate(
            { clave: req.params.clave },
            req.body,
            { new: true }
        )
        if (!cliente) return res.status(404).json({ error: 'No encontrado' })
        res.json(cliente)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// DELETE eliminar
router.delete('/:clave', async (req, res) => {
    try {
        const cliente = await Cliente.findOneAndDelete({ clave: req.params.clave })
        if (!cliente) return res.status(404).json({ error: 'No encontrado' })
        res.json({ mensaje: 'Cliente eliminado' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router