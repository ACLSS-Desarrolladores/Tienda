import React, { useState, useEffect } from 'react'
import { ProductoData } from '../../data/ProductoData';
import CompraListar from './CompraListar';
import CompraAgregar from './CompraAgregar';
import CompraEditar from './CompraEditar';

const Compra = () => {
    const [resultado, setResultado] = useState([]);

    const listarCompra = () => {
        setResultado(ProductoData);
    }

    const [agregarModal, setAgregarModal] = useState(false);

    const agregarCompraModal = () => {
        setAgregarModal(!agregarModal);
    }

    const [editarModal, setEditarModal] = useState(false);

    const editarCompraModal = () => {
        setEditarModal(!editarModal);
    }

    const inicializarCompra = { id: '', nombre: '', descripcion: '', precio: '', existencia: '' }
    const [actualCompra, setActualCompra] = useState(inicializarCompra);

    const seleccionarCompra = (compra) => {
        setActualCompra(compra);
    }

    useEffect(() => {
        listarCompra();
    }, [resultado]);

    return (
        <>
            <CompraListar
                resultado={resultado}
                agregarCompraModal={agregarCompraModal}
                seleccionarCompra={seleccionarCompra}
                editarCompraModal={editarCompraModal}
            />
            {editarModal ? (
                <CompraEditar
                    editarModal={editarModal}
                    editarCompraModal={editarCompraModal}
                    actualCompra={actualCompra}
                />
            ) : (
                <></>
            )}
            {editarModal ? (
                <CompraAgregar
                    agregarModal={agregarModal}
                    agregarCompraModal={agregarCompraModal}
                />
            ) : (
                <></>
            )}
        </>
    );

}
export default Compra;