import React, { useState } from 'react'
import { ProductoData } from '../../data/ProductoData';
import ProductoListar from './ProductoListar';
import ProductoAgregar from './ProductoAgregar';
import ProductoEditar from './ProductoEditar';

const Producto = () => {
    const [resultado, setResultado] = useState([]);
    const [estadoListar, setEstadoListar] = useState(true);

    const listarProducto = () => {
        setResultado(ProductoData);
        setEstadoListar(!estadoListar);
    }

    if (estadoListar) {
        listarProducto()
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

    const agregarProducto = async (producto) => {
        agregarProductoModal();
        setResultado([...resultado, producto]);
        setProcesarModal(!procesarModal);
    }

    const editarProducto = async (producto) => {
        editarProductoModal();
        setResultado(resultado.map((dato) => (dato.id === producto.id ? producto : dato)));
        setProcesarModal(!procesarModal);
    }

    const [procesarModal, setProcesarModal] = useState(false);

    const procesarProductoModal = () => {
        setProcesarModal(!procesarModal);
    }

    return (
        <>
            <ProductoListar
                resultado={resultado}
                agregarProductoModal={agregarProductoModal}
                seleccionarProducto={seleccionarProducto}
                editarProductoModal={editarProductoModal}
                procesarModal={procesarModal}
                procesarProductoModal={procesarProductoModal}
            />
            {editarModal ? (
                <ProductoEditar
                    editarModal={editarModal}
                    editarProductoModal={editarProductoModal}
                    editarProducto={editarProducto}
                    actualProducto={actualProducto}
                />
            ) : (
                <></>
            )}

            {agregarModal ? (
                <ProductoAgregar
                    agregarModal={agregarModal}
                    agregarProductoModal={agregarProductoModal}
                    agregarProducto={agregarProducto}
                />
            ) : (
                <></>
            )}
        </>
    );

}
export default Producto;