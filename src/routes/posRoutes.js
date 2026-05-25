const express = require('express');
const router = express.Router();
const posController = require('../controllers/posController');

// Definición de las rutas y su asignación al controlador
router.get('/ports', posController.getPorts);
router.post('/autoconnect', posController.autoconnect);
router.post('/connect', posController.connect);
router.post('/disconnect', posController.disconnect);
router.get('/poll', posController.poll);
router.post('/loadKeys', posController.loadKeys);
router.post('/payment', posController.sale);
router.post('/refund', posController.refund);
router.post('/closeDay', posController.closeDay);
router.get('/lastSale', posController.getLastSale);

module.exports = router;
