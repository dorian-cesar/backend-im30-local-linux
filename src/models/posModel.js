const { POSAutoservicio } = require('transbank-pos-sdk');

// Instanciamos el equipo y lo configuramos
const pos = new POSAutoservicio();
pos.setDebug(true);

// Exportamos la instancia para usarla como nuestro "Modelo" de acceso a los datos/hardware
module.exports = pos;
