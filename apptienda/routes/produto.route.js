module.exports = (app) => {
    const controlador = require("../controllers/producto.controller");
    app.get("/productos", controlador.listarProducto);
    app.post("/productos", controlador.agregarProducto);
    app.get("/productos/:id", controlador.buscarProducto);
    app.put("/productos/:id", controlador.modificarProducto);
    app.delete("/productos/:id", controlador.eliminarProducto);
}