module.exports = (app) => {
    const controlador = require("../controllers/compra.controller");
    app.get("/compras/productos", controlador.listarProductoDisponibles);
    app.get("/compras", controlador.listarProductoCarrito);
    app.post("/compras/:id", controlador.agregarProductoCarrito);
    app.delete("/compras/:id", controlador.quitarProductoCarrito);
    app.post("/compras/", controlador.confirmarCompraCarrito);
    app.get("/compras/ventas", controlador.listarVenta);
}