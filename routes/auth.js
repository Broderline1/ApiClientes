const express = require('express')
const router = express.Router()
const Usuario = require('../models/usuario')

// POST login
router.post('/login', async (req, res) => {
    try {
        const { usuario, password } = req.body
        const user = await Usuario.findOne({ usuario, password })
        if (!user) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
        }
        res.json({ mensaje: 'Login exitoso', usuario: user.usuario })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// POST registro
router.post('/registro', async (req, res) => {
    try {
        const { usuario, password } = req.body
        const existe = await Usuario.findOne({ usuario })
        if (existe) {
            return res.status(400).json({ error: 'El usuario ya existe' })
        }
        const nuevoUsuario = new Usuario({ usuario, password })
        await nuevoUsuario.save()
        res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevoUsuario.usuario })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router