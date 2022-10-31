import React, { useState } from 'react'
import { FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/CompraProducto.css'

const cargarImagen = require.context("../img/", true);

const CompraListar = (props) => {
    const [detalle, setDetalle] = useState([]);

    const agregarDetalle = (articulo) => {
        const d = detalle.filter((dato) => dato.nombre === articulo.nombre);
        if (d.length > 0) {
            setDetalle(detalle.map((dato) => (dato.nombre === articulo.nombre ?
                {
                    nombre: articulo.nombre, precio: articulo.precio, cantidad: dato.cantidad + 1
                }
                : dato)));
        } else {
            setDetalle([...detalle, { nombre: articulo.nombre, precio: articulo.precio, cantidad: 1 }]);
        }
        procesarCompraModal();
    }

    const limpiarDetalle = () => {
        setDetalle([]);
        procesarCompraModal();
    }

    const masDetalle = (nombre) => {
        const d = detalle.filter((dato) => dato.nombre === nombre);
        if (d.length > 0) {
            setDetalle(detalle.map((dato) => (dato.nombre === nombre ?
                {
                    nombre: dato.nombre, precio: dato.precio, cantidad: dato.cantidad + 1
                }
                : dato)));
        }
        procesarCompraModal();
    }

    const menosDetalle = (nombre) => {
        const d = detalle.filter((dato) => dato.nombre === nombre);
        if (d.length > 0 && d[0].cantidad > 1) {
            setDetalle(detalle.map((dato) => (dato.nombre === nombre ?
                {
                    nombre: dato.nombre, precio: dato.precio, cantidad: dato.cantidad - 1
                }
                : dato)));
        } else {
            setDetalle(detalle.filter((dato) => dato.nombre !== nombre));
        }
        procesarCompraModal();
    }

    const [detalleModal, setDetalleModal] = useState(false);

    const detalleCompraModal = () => {
        setDetalleModal(!detalleModal);
    }

    const [venta, setVenta] = useState({
        detalle: [

        ],
        total: 0,
        cantidad: 0
    });

    const calcularCompra = () => {
        venta.total = detalle.map((item) => parseFloat(item.precio) * parseInt(item.cantidad))
            .reduce((previous, current) => {
                return previous + current;
            }, 0);
        venta.cantidad = detalle.map((item) => parseInt(item.cantidad))
            .reduce((previous, current) => {
                return previous + current;
            }, 0);
    }

    const [procesarModal, setProcesarModal] = useState(false);

    const procesarCompraModal = () => {
        setProcesarModal(!procesarModal);
    }

    return (
        <>
            <div className='px-4 py-5 text-center'>
                <h1 className='fw-bold'>Compras</h1>
                <button className="btn btn-sm btn-success"
                    onClick={() => {
                        detalleCompraModal()
                    }}
                ><span className='bi bi-cart' style={{ 'fontSize': '25px' }}>
                        {
                            venta.cantidad > 0 ? (
                                <span style={{ 'fontSize': '15px' }}>{' ' + venta.cantidad + ' '}</span>
                            ) : (
                                ''
                            )
                        }
                    </span>
                </button>
                <div className='wrapper' >
                    {props.resultado ? (
                        props.resultado.map(item => (
                            <div className='card border-white' style={{ 'width': '18rem' }} key={item.id}>
                                <div className='card-body'>
                                    {(item.url ? (
                                        <p><img src={item.url} width='100%' alt={item.nombre} /></p>
                                    ) : (
                                        <p><img src={cargarImagen(`./silueta.png`)} width='100%' alt={item.nombre} /></p>
                                    ))}
                                    <p style={{ margin: 0 }}>{item.nombre}</p>
                                    <p style={{ margin: 0 }}>{item.descripcion}</p>
                                    <p style={{ margin: 0 }}>Stock: {item.existencia}</p>
                                    <p style={{ margin: 0, color: 'red' }}>$ {item.precio}</p>
                                </div>
                                <div className='card-footer' style={{ 'background': 'inherit', 'borderColor': 'inherit' }}>
                                    <button className="btn btn-sm px-5 btn-secondary"
                                        onClick={() => {
                                            agregarDetalle(item);
                                        }}
                                    ><span className='bi bi-bag-heart' style={{ 'fontSize': '20px' }}>
                                        </span> Añadir al carrito</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='card border-white' style={{ 'width': '18rem' }}>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={detalleModal} className="modal-dialog modal-lg">
                <ModalHeader >
                    Carrito
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-striped table-sm">
                                    <thead>
                                        <tr className='bg-secondary text-white'>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Subtotal</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {venta.detalle.length > 0 ? (
                                            venta.detalle.map((item) => (
                                                <tr key={item.nombre}>
                                                    <td>{item.nombre}</td>
                                                    <td>$ {item.precio}</td>
                                                    <td>{item.cantidad}</td>
                                                    <td>$ {item.cantidad * item.precio}</td>
                                                    <td>
                                                        <span className='bi bi-cart-x-fill text-danger iconHover' style={{ 'fontSize': '25px' }}
                                                            onClick={() => {
                                                                menosDetalle(item.nombre);
                                                            }}
                                                        >
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className='bi bi-cart-plus-fill text-success iconHover' style={{ 'fontSize': '25px' }}
                                                            onClick={() => {
                                                                masDetalle(item.nombre);
                                                            }}
                                                        >
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6}><center>Tu carrito está vacio</center></td>
                                            </tr>
                                        )}

                                        {
                                            venta.detalle.length > 0 ? (
                                                <tr><td></td><td></td>
                                                    <td align='right'><b>Total</b></td>
                                                    <td><b>$ {venta.total}</b></td>
                                                    <td></td><td></td>
                                                </tr>
                                            ) : (
                                                <tr><td colSpan={6}></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </FormGroup>
                </ModalBody>
                {venta.detalle.length > 0 ? (
                    <ModalFooter>
                        <button className="btn btn-sm px-5 btn-success"
                            onClick={(event) => {
                                event.preventDefault();
                                alert("En Construcción");
                            }}
                        >Finalizar</button>
                        <button className="btn btn-sm px-5 btn-danger"
                            onClick={() => {
                                limpiarDetalle();
                            }}
                        >Vaciar</button>
                        <button className="btn btn-sm px-5 btn-secondary"
                            onClick={() => {
                                detalleCompraModal();
                            }}
                        >Continuar</button>
                    </ModalFooter>
                ) : (
                    <ModalFooter>
                        <button className="btn btn-sm px-5 btn-secondary"
                            onClick={() => {
                                detalleCompraModal();
                            }}
                        >Continuar</button>
                    </ModalFooter>
                )
                }
            </Modal>

            <Modal isOpen={procesarModal} >
                <ModalHeader >
                    Carrito
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        Procesando producto
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <button className="btn btn-sm px-5 btn-success"
                        onClick={() => {
                            procesarCompraModal();
                            calcularCompra();
                            setVenta({ ...venta, detalle });
                        }
                        }
                    >Continuar</button>
                </ModalFooter>
            </Modal>
        </>
    );
}
export default CompraListar