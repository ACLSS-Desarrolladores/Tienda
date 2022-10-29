import React, { useState, useEffect } from 'react'
import { VentaData } from '../../data/VentaData';
import VentaListar from './VentaListar';
import VentaAgregar from './VentaAgregar';
import VentaEditar from './VentaEditar';

const Venta = () => {
    const [resultado, setResultado] = useState([]);

    const [totalVenta, setTotalVenta] = useState(0);

    const listarVenta = () => {
        setResultado(VentaData);
        const sumar = resultado.map((item) => parseFloat(item.valor))
            .reduce((previous, current) => {
                return previous + current;
            }, 0);
        setTotalVenta(sumar);
    }

    const [agregarModal, setAgregarModal] = useState(false);

    const agregarVentaModal = () => {
        setAgregarModal(!agregarModal);
    }

    const [editarModal, setEditarModal] = useState(false);

    const editarVentaModal = () => {
        setEditarModal(!editarModal);
    }

    const inicializarVenta = { idVenta: '', fecha: '', idCliente: '', valor: '', confirmado: '' }
    const [actualVenta, setActualVenta] = useState(inicializarVenta);

    const seleccionarVenta = (venta) => {
        setActualVenta(venta);
    }

    useEffect(() => {
        listarVenta();
    }, [resultado]);

    return (
        <>
            <VentaListar
                resultado={resultado}
                agregarVentaModal={agregarVentaModal}
                seleccionarVenta={seleccionarVenta}
                editarVentaModal={editarVentaModal}
                totalVenta={totalVenta}
            />
            {editarModal ? (
                <VentaEditar
                    editarModal={editarModal}
                    editarVentaModal={editarVentaModal}
                    actualVenta={actualVenta}
                />
            ) : (
                <></>
            )}
            {editarModal ? (
                <VentaAgregar
                    agregarModal={agregarModal}
                    agregarVentaModal={agregarVentaModal}
                />
            ) : (
                <></>
            )}
        </>
    );

}
export default Venta;