import React, { useState } from 'react'
import { FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const VentaEditar = (props) => {
    const [venta, setVenta] = useState(props.actualVenta);
    const [total, setTotal] = useState(0);
    const [cantidad, setCantidad] = useState(0)
    const [estadoDetalle, setEstadoDetalle] = useState(true);

    const calcularCompra = () => {
        setTotal(venta.detalle.map((item) => parseFloat(item.precio) * parseInt(item.cantidad))
            .reduce((previous, current) => {
                return previous + current;
            }, 0));
        setCantidad(venta.detalle.map((item) => parseInt(item.cantidad))
            .reduce((previous, current) => {
                return previous + current;
            }, 0));
        setEstadoDetalle(!estadoDetalle);
    }

    if (estadoDetalle) {
        calcularCompra()
    }

    return (
        <Modal isOpen={props.editarModal} className="modal-dialog modal-lg">
            <ModalHeader >
                Venta
            </ModalHeader>

            <ModalBody>
                <FormGroup>
                    <label>Id</label>
                    <input
                        className="form-control"
                        name="id"
                        type="number"
                        autoComplete="off"
                        value={venta.id}
                        disabled
                    />
                </FormGroup>
                <FormGroup>
                    <label>Fecha</label>
                    <input
                        className="form-control"
                        name="nombre"
                        type="text"
                        autoComplete="off"
                        value={venta.fecha}
                        disabled
                    />
                </FormGroup>
                <FormGroup>
                    <div className='row'>
                        <label>Cliente</label>
                        <div className='col-3'>
                            <input
                                className="form-control"
                                name="descripcion"
                                type="text"
                                autoComplete="off"
                                value={venta.cliente.id}
                                disabled
                            />
                        </div>
                        <div className='col-9'>
                            <input
                                className="form-control"
                                name="descripcion"
                                type="text"
                                autoComplete="off"
                                value={venta.cliente.nombre}
                                disabled
                            />
                        </div>
                    </div>
                </FormGroup>
                <FormGroup>
                    <label>Confirmado</label>
                    <input
                        className="form-control"
                        name="precio"
                        type="text"
                        autoComplete="off"
                        value={venta.confirmado ? 'Entragada' : 'En proceso'}
                        disabled
                    />
                </FormGroup>
                <FormGroup>
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {venta.detalle ? (
                                        venta.detalle.map((item) => (
                                            <tr>
                                                <td>{item.nombre}</td>
                                                <td>$ {item.precio}</td>
                                                <td>{item.cantidad}</td>
                                                <td>$ {item.cantidad * item.precio}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4}>Sin productos</td>
                                        </tr>
                                    )}
                                    {venta.detalle ? (
                                        <tr>
                                            <td></td>
                                            <td><b>Total</b></td>
                                            <td><b>{cantidad}</b></td>
                                            <td><b>$ {total}</b></td>
                                        </tr>
                                    ) : (
                                        ''
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </FormGroup>
            </ModalBody>

            <ModalFooter>

                <button className="btn btn-sm px-5 btn-success"
                    onClick={() => {
                        props.editarVentaModal()
                    }}
                >Cerrar</button>
            </ModalFooter>
        </Modal>
    )
}

export default VentaEditar
