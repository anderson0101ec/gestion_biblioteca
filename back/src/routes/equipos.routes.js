const express = require('express');
const router = express.Router();
const CrudController = require('../controllers/crud.controller');
const crud = new CrudController();


//eliminar el usuario de la base de datos
router.delete('/usuarios/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const resultado = await crud.eliminar('Usuario', 'id_usuario', id);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Actualizar un usuario
router.put('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const resultado = await crud.actualizar('Usuario', 'id_usuario', id, data);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





// Ruta POST para crear un usuario

router.post('/usuarios', async (req, res) => {
    try {
        const nuevoUsuario = req.body;
        const resultado = await crud.crear('Usuario', nuevoUsuario); // Usando el método crear en el controlador
        res.status(201).json(resultado);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
});


// Ruta: Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    try {
        const datos = await crud.obtenerUsuarios();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






/*---------------------- ----------------*/
// Ruta: Préstamos activos
router.get('/prestamos/activos', async (req, res) => {
    try {
        const datos = await crud.prestamosActivos();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta: Libros disponibles por categoría
router.get('/libros/disponibles', async (req, res) => {
    try {
        const datos = await crud.librosDisponiblesPorCategoria();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta: Cantidad de préstamos por usuario
router.get('/prestamos/por-usuario', async (req, res) => {
    try {
        const datos = await crud.prestamosPorUsuario();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta: Libros actualmente prestados
router.get('/libros/prestados', async (req, res) => {
    try {
        const datos = await crud.librosPrestadosActualmente();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
