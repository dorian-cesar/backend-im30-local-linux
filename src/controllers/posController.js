const pos = require('../models/posModel');

// Controlador para listar puertos
const getPorts = async (req, res) => {
    try {
        const ports = await pos.listPorts();
        res.json({ success: true, ports });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controlador para autoconectar
const autoconnect = async (req, res) => {
    try {
        const connectedPort = await pos.autoconnect();
        if (connectedPort === false) {
            return res.status(404).json({ success: false, message: 'No se encontró ningún POS conectado' });
        }
        res.json({ success: true, message: 'Conectado al POS', port: connectedPort.path });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controlador para conectar manualmente a un puerto
const connect = async (req, res) => {
    const { portName } = req.body;
    if (!portName) {
        return res.status(400).json({ success: false, error: 'portName es requerido' });
    }
    
    try {
        await pos.connect(portName);
        res.json({ success: true, message: `Conectado correctamente al puerto ${portName}` });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controlador para desconectar
const disconnect = async (req, res) => {
    try {
        await pos.disconnect();
        res.json({ success: true, message: 'POS desconectado correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controlador para hacer poll (ping)
const poll = async (req, res) => {
    try {
        const response = await pos.poll();
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controlador para cargar llaves
const loadKeys = async (req, res) => {
    try {
        const response = await pos.loadKeys();
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controlador para procesar venta
const sale = async (req, res) => {
    const { amount, ticket } = req.body;
    
    if (!amount || !ticket) {
        return res.status(400).json({ success: false, error: 'amount y ticket son requeridos' });
    }

    try {
        const response = await pos.sale(parseInt(amount), ticket.toString());
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controlador para anular venta
const refund = async (req, res) => {
    const { operationId } = req.body;
    
    if (!operationId) {
        return res.status(400).json({ success: false, error: 'operationId es requerido' });
    }

    try {
        const response = await pos.refund(operationId.toString());
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controlador para cierre de día
const closeDay = async (req, res) => {
    try {
        const response = await pos.closeDay();
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Controlador para consultar última venta
const getLastSale = async (req, res) => {
    try {
        const response = await pos.getLastSale();
        res.json({ success: true, response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getPorts,
    autoconnect,
    connect,
    disconnect,
    poll,
    loadKeys,
    sale,
    refund,
    closeDay,
    getLastSale
};
