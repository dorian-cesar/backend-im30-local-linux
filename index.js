const express = require('express');
const cors = require('cors');
const posRoutes = require('./src/routes/posRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use('/api/pos', posRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Backend POS escuchando en http://localhost:${port}`);
    console.log('El POS Autoservicio de IM30 está instanciado. Usa /api/pos/autoconnect para conectarlo.');
});
