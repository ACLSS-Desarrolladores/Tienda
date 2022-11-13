const data = require('../data/producto.data');
const dataFactura = require('../data/venta.data');

let detalle = [];
let venta = [];

const iniciaizarVenta = () => {
    venta = { ...venta, id: 0 }
    venta = { ...venta, fecha: '' }
    venta = { ...venta, cliente: { id: '', nombre: '' } }
    venta = { ...venta, valor: 0 }
    venta = { ...venta, cantidad: 0 }
    venta = { ...venta, detalle }
}

iniciaizarVenta();

const listarProductoDisponibles = (req, res) => {
    try {
        data.productosData = data.productosData.filter(dato => {
            if (dato.existencia > 0) {
                return true;
            } else {
                return false;
            }
        });

        const rta = data.productosData;
        res.status(200).json({
            ok: true,
            msg: 'Lista de productos con existencia',
            rta
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al listar los productos"
        })
    }
};

const listarProductoCarrito = (req, res) => {
    try {
        const rta = venta;
        res.status(200).json({
            ok: true,
            msg: 'Lista de productos del carrito',
            venta: { valor: venta.valor, cantidad: venta.cantidad, detalle: venta.detalle }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al listar los productos"
        })
    }
};

const agregarProductoCarrito = (req, res) => {
    const id = req.params.id.trim();
    try {
        const producto = data.productosData.filter(dato => {
            if (dato.id == id && dato.existencia > 0) {
                return true;
            } else {
                return false;
            }
        });

        if (producto.length > 0) {
            const buscarEnCarrito = detalle.filter((dato) => dato.nombre == producto[0].nombre);
            if (buscarEnCarrito.length > 0) {
                detalle = detalle.map((dato) => (
                    dato.nombre == producto[0].nombre ?
                        {
                            nombre: dato.nombre, precio: dato.precio, cantidad: dato.cantidad + 1
                        }
                        : dato
                ));
            } else {
                detalle.push({ nombre: producto[0].nombre, precio: producto[0].precio, cantidad: 1 });
            }

            totalCompra();
            venta = { ...venta, detalle }
            res.status(200).json({
                ok: true,
                msg: 'Agregado el producto al carrito',
                venta: { valor: venta.valor, cantidad: venta.cantidad, detalle: venta.detalle }
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'El producto no existe'
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al agregar producto al carrito"
        })
    }
};

const quitarProductoCarrito = (req, res) => {
    const id = req.params.id.trim();
    try {
        const producto = data.productosData.filter(dato => {
            if (dato.id == id) {
                return true;
            } else {
                return false;
            }
        });

        if (producto.length > 0) {
            const buscarEnCarrito = detalle.filter((dato) => dato.nombre == producto[0].nombre);
            if (buscarEnCarrito.length > 0) {
                if (buscarEnCarrito[0].cantidad > 1) {
                    detalle = detalle.map((dato) => (
                        dato.nombre == producto[0].nombre ?
                            {
                                nombre: dato.nombre, precio: dato.precio, cantidad: dato.cantidad - 1
                            }
                            : dato
                    ));
                } else {
                    detalle = detalle.filter((dato) => dato.nombre != producto[0].nombre);
                }

                totalCompra();
                venta = { ...venta, detalle }
                res.status(200).json({
                    ok: true,
                    msg: 'Quitado el producto al carrito',
                    venta: { valor: venta.valor, cantidad: venta.cantidad, detalle: venta.detalle }
                });
            } else {
                res.status(404).json({
                    ok: false,
                    msg: 'El producto no esta en el carrito'
                });
            }
        } else {
            res.status(404).json({
                ok: false,
                msg: 'El producto no existe'
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al agregar producto al carrito"
        })
    }
};

const totalCompra = () => {
    venta.valor = detalle.map((item) => parseFloat(item.precio) * parseInt(item.cantidad))
        .reduce((previous, current) => {
            return previous + current;
        }, 0);
    venta.cantidad = detalle.map((item) => parseInt(item.cantidad))
        .reduce((previous, current) => {
            return previous + current;
        }, 0);
};

const confirmarCompraCarrito = (req, res) => {
    const factura = req.body;
    try {
        if (!factura || !factura.id || !factura.fecha ||
            !factura.cliente || !factura.cliente.id ||
            !factura.cliente.nombre) {
            res.status(400).json({
                ok: false,
                msg: 'La solicitud debe incluir la información de la venta'
            });
        }

        let buscar = dataFactura.ventaData.filter(dato => dato.id == factura.id);
        if (buscar.length > 0) {
            res.status(200).json({
                ok: true,
                msg: 'El id de la venta ya existe'
            });
        } else {
            if (detalle.length == 0) {
                res.status(200).json({
                    ok: true,
                    msg: 'El carrito esta vacio'
                });
            } else {
                venta.id = factura.id;
                venta.fecha = factura.fecha;
                venta.cliente = factura.cliente;
                dataFactura.ventaData.push(venta);

                res.status(201).json({
                    ok: true,
                    msg: 'Confirmada la compra',
                    venta
                });

                actualizarExistencias();
                detalle = [];
                iniciaizarVenta();
            }
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al registar el producto"
        })
    }
};

const listarVenta = (req, res) => {
    try {
        const rta = dataFactura.ventaData;
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

const actualizarExistencias = () => {
    let buscarEnExistencia;
    for (let i = 0; i < detalle.length; i++) {
        buscarEnExistencia = data.productosData.filter((dato) => dato.nombre == detalle[i].nombre);
        if (buscarEnExistencia.length > 0) {
            data.productosData = data.productosData.map((dato) => (
                dato.nombre == detalle[i].nombre ?
                    {
                        id: dato.id, nombre: dato.nombre, descripcion: dato.descripcion,
                        precio: dato.precio, existencia: dato.existencia - detalle[i].cantidad, url: dato.url
                    }
                    : dato
            ));
        }
    }
}

module.exports = {
    listarProductoDisponibles,
    listarProductoCarrito,
    agregarProductoCarrito,
    quitarProductoCarrito,
    confirmarCompraCarrito,
    listarVenta
}