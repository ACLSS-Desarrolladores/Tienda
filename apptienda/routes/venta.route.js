module.exports = (app) => {
    const controlador = require("../controllers/venta.controller");
    app.get("/ventas", controlador.listarVenta);
}