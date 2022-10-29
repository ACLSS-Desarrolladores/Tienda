import React from 'react';
import { Routes, Route } from 'react-router';

import Producto from '../components/Producto/Producto';
import Venta from '../components/Venta/Venta';
import Compra from '../components/Compras/Compra';

const Router = () => {
    return (
        <Routes>
            <Route exact path='/productos' element={<Producto />} />
            <Route exact path='/ventas' element={<Venta />} />
            <Route exact path='/compras' element={<Compra />} />
        </Routes>
    );

}

export default Router;
