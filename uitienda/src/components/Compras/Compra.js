import React, { useState } from 'react'
import { ProductoData } from '../../data/ProductoData';
import CompraListar from './CompraListar';

const Compra = () => {
    const [resultado, setResultado] = useState([]);
    const [estadoListar, setEstadoListar] = useState(true);

    const listarCompra = () => {
        setResultado(ProductoData);
        setEstadoListar(!estadoListar);
    }

    if (estadoListar) {
        listarCompra()
    }

    return (
        <>
            <CompraListar
                resultado={resultado}
            />
        </>
    );

}
export default Compra;