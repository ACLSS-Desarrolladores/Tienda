const data = require('../data/producto.data');

const listarProducto = (req, res) => {
    try {
        const rta = data.productosData;
        res.status(200).json({
            ok: true,
            msg: 'Lista de productos',
            rta
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al listar los productos"
        })
    }
};

const agregarProducto = (req, res) => {
    const producto = req.body;
    try {
        if (!producto || !producto.id || !producto.nombre ||
            !producto.descripcion || !producto.precio ||
            !producto.existencia) {
            res.status(400).json({
                ok: false,
                msg: 'La solicitud debe incluir el producto'
            });
        }

        let buscar = data.productosData.filter(dato => dato.id == producto.id);
        if (buscar.length > 0) {
            res.status(200).json({
                ok: true,
                msg: 'El id del producto ya existe'
            });
        } else {
            buscar = data.productosData.filter(dato => dato.nombre.trim() == producto.nombre.trim());
            if (buscar.length > 0) {
                res.status(200).json({
                    ok: true,
                    msg: 'El nombre del producto ya existe'
                });
            } else {
                data.productosData.push(producto);
                res.status(201).json({
                    ok: true,
                    msg: 'Registrado el producto',
                    producto
                });
            }
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al registar el producto"
        })
    }
};

const buscarProducto = (req, res) => {
    const id = req.params.id.trim();
    try {
        const producto = data.productosData.filter(dato => dato.id == id);
        if (producto.length > 0) {
            res.status(200).json({
                ok: true,
                msg: 'Buscado el producto',
                producto
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
            msg: "Error al buscar el producto"
        })
    }
};

const modificarProducto = (req, res) => {
    const producto = req.body;
    const id = req.params.id;
    try {
        if (!producto || !producto.id || !producto.nombre ||
            !producto.descripcion || !producto.precio ||
            !producto.existencia) {
            res.status(400).json({
                ok: false,
                msg: 'La solicitud debe incluir el producto'
            });
        }

        const buscar = data.productosData.filter(dato => dato.id == id);
        if (buscar.length > 0) {
            data.productosData = data.productosData.map(dato => (dato.id == id ? producto : dato));

            res.status(200).json({
                ok: true,
                msg: 'Actualizado el producto',
                rta: producto
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
            msg: "Error al modificar el producto"
        })
    }
};

const eliminarProducto = (req, res) => {
    const id = req.params.id;
    try {
        let producto;
        const buscar = data.productosData.filter(dato => dato.id == id);
        if (buscar.length > 0) {
            data.productosData = data.productosData.filter(dato => {
                if (dato.id != id) {
                    return true;
                } else {
                    producto = dato;
                    return false;
                }
            });

            res.status(200).json({
                ok: true,
                msg: 'Eliminado el producto',
                rta: producto
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
            msg: "Error al eliminar el producto"
        })
    }
};

module.exports = {
    listarProducto,
    agregarProducto,
    buscarProducto,
    modificarProducto,
    eliminarProducto
}