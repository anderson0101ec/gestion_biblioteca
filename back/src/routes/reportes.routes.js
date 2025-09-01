const express = require('express');
const router = express.Router();
const CrudController = require('../controllers/crud.controller');
const crud = new CrudController();

// 1. Préstamos activos
router.get('/prestamos/activos', async (req, res) => {
    try {
        const datos = await crud.prestamosActivos();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Libros disponibles por categoría
router.get('/libros/disponibles', async (req, res) => {
    try {
        const datos = await crud.librosDisponiblesPorCategoria();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Cantidad de préstamos por usuario
router.get('/prestamos/por-usuario', async (req, res) => {
    try {
        const datos = await crud.prestamosPorUsuario();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Libros actualmente prestados
router.get('/libros/prestados', async (req, res) => {
    try {
        const datos = await crud.librosPrestadosActualmente();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
