import React, { useState, useEffect } from 'react'
import { VentaData } from '../../data/VentaData';
import VentaListar from './VentaListar';
import VentaEditar from './VentaEditar';

const Venta = () => {
    const [resultado, setResultado] = useState([]);
    const [estadoListar, setEstadoListar] = useState(true);
    const [totalVenta, setTotalVenta] = useState(0);

    const listarVenta = () => {
        setResultado(VentaData);
        setEstadoListar(!estadoListar);
    }

    const calcularVenta = () => {
        const sumar = resultado.map((item) => parseFloat(item.valor))
            .reduce((previous, current) => {
                return previous + current;
            }, 0);
        setTotalVenta(sumar);
    }

    if (estadoListar) {
        listarVenta();
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
        calcularVenta();
    });

    return (
        <>
            <VentaListar
                resultado={resultado}
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
        </>
    );

}
export default Venta;