import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

const VentaListar = (props) => {
    return (
        <>
            <div className='px-4 py-5'>
                <h1 className='fw-bold'><center>Ventas</center></h1>
                <div className='d-flex gap-4' style={{ 'display': 'flex', 'flexWrap': 'wrap' }}>
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Id Venta</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Valor</th>
                                <th>Confirmado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.resultado ? (
                                props.resultado.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.fecha}</td>
                                        <td>{item.cliente.id} {item.cliente.nombre}</td>
                                        <td>$ {item.valor}</td>
                                        <td>{item.confirmado ? 'Entragada' : 'En proceso'}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-success"
                                                onClick={() => {
                                                    props.seleccionarVenta(item);
                                                    props.editarVentaModal()
                                                }}
                                            >
                                                Detalle
                                            </button>
                                        </td>
                                    </tr>
                                )
                                )
                            ) : (
                                <tr>
                                    <td colSpan={3}>No hay ventas</td>
                                </tr>
                            )
                            }
                            <tr><td></td><td></td><td align='right'><b>Total</b></td>
                                <td><b>$ {props.totalVenta}</b></td>
                                <td></td><td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default VentaListar