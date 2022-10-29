import React, { useState, useEffect } from 'react'
import { ProductoData } from '../../data/ProductoData';
import ProductoListar from './ProductoListar';
import ProductoAgregar from './ProductoAgregar';
import ProductoEditar from './ProductoEditar';

const Producto = () => {
    const [resultado, setResultado] = useState([]);

    const listarProducto = () => {
        setResultado(ProductoData);
    }

    const [agregarModal, setAgregarModal] = useState(false);

    const agregarProductoModal = () => {
        setAgregarModal(!agregarModal);
    }

    const [editarModal, setEditarModal] = useState(false);

    const editarProductoModal = () => {
        setEditarModal(!editarModal);
    }

    const inicializarProducto = { id: '', nombre: '', descripcion: '', precio: '', existencia: '' }
    const [actualProducto, setActualProducto] = useState(inicializarProducto);

    const seleccionarProducto = (producto) => {
        setActualProducto(producto);
    }

    useEffect(() => {
        listarProducto();
    }, [resultado]);

    return (
        <>
            <ProductoListar
                resultado={resultado}
                agregarProductoModal={agregarProductoModal}
                seleccionarProducto={seleccionarProducto}
                editarProductoModal={editarProductoModal}
            />
            {editarModal ? (
                <ProductoEditar
                    editarModal={editarModal}
                    editarProductoModal={editarProductoModal}
                    actualProducto={actualProducto}
                />
            ) : (
                <></>
            )}

            {agregarModal ? (
                <ProductoAgregar
                    agregarModal={agregarModal}
                    agregarProductoModal={agregarProductoModal}
                />
            ) : (
                <></>
            )}
        </>
    );

}
export default Producto;