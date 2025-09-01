const express = require('express'); 
const cors = require('cors');
const path = require('path');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rutas base
app.use('/api/equipos', require('./routes/equipos.routes'));

// Rutas personalizadas para consultas especiales
app.use('/api/reportes', require('./routes/reportes.routes'));

module.exports = app;
