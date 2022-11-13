const data = require('../data/venta.data');

const listarVenta = (req, res) => {
    try {
        const rta = data.ventaData;
        res.status(200).json({
            ok: true,
            msg: 'Lista de ventas',
            rta
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al listar las ventas"
        })
    }
};

module.exports = {
    listarVenta
}