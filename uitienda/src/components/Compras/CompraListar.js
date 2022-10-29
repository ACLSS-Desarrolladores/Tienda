import React, { useState } from 'react'
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import "bootstrap/dist/css/bootstrap.min.css";
const cargarImagen = require.context("../img/", true);

const CompraListar = (props) => {
    const [detalle, setDetalle] = useState([]);

    const addDetalle = (articulo) => {
        setDetalle([...detalle, { nombre: articulo.nombre, precio: articulo.precio, cantidad: 1 }]);
        procesarCompraModal();
    }

    const [detalleModal, setDetalleModal] = useState(false);

    const detalleCompraModal = () => {
        setDetalleModal(!detalleModal);
    }

    const [venta, setVenta] = useState({
        detalle: [

        ],
        total: 0
    });

    const calcularCompra = () => {
        // venta.total = 0;
        // detalle.map((item) => {
        //     venta.total += parseFloat(item.precio) * item.cantidad
        // });
        venta.total = detalle.map((item) => parseFloat(item.precio) * parseInt(item.cantidad)  )
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
                <button className="btn btn-sm px-5 btn-success"
                    onClick={() => {
                        detalleCompraModal()
                    }}
                >
                    Carrito
                </button>
                <div className='d-flex gap-4' style={{ 'display': 'flex', 'flexWrap': 'wrap' }}>
                    {props.resultado ? (
                        props.resultado.map(item => (
                            <div className='card border-white' style={{ 'width': '18rem' }} key={item.id}>
                                <div className='card-body'>
                                    <img src={cargarImagen(`./figura-${item.id}.jpg`)} />
                                    <p style={{ margin: 0 }}>{item.nombre}</p>
                                    <p style={{ margin: 0 }}>{item.descripcion}</p>
                                    <p style={{ margin: 0 }}>Stock: {item.existencia}</p>
                                    <p style={{ margin: 0, color: 'red' }}>$ {item.precio}</p>
                                </div>
                                <div className='card-footer' style={{ 'background': 'inherit', 'borderColor': 'inherit' }}>
                                    <button className="btn btn-sm px-5 btn-secondary"
                                        onClick={() => {
                                            props.seleccionarCompra(item);
                                            addDetalle(item);
                                        }}
                                    >
                                        Añadir al carrito
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='card' style={{ 'width': '18rem' }}>
                            <div className='card-body'>
                                <h5 className='card-title'>Card title</h5>
                                <p className='card-text'>Some quick example</p>
                                <a href='#' className='btn btn-primary'>Go somewhere</a>
                            </div>
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
                                        <tr>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {venta.detalle.length > 0 ? (
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
                                                <td colSpan={4}><center>Carrito vacio</center></td>
                                            </tr>
                                        )}
                                        <tr><td></td><td></td><td align='right'><b>Total</b></td>
                                            <td><b>$ {venta.total}</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <button className="btn btn-sm px-5 btn-success"
                        onClick={(event) => {
                            event.preventDefault();
                            alert("En Construcción");
                        }}
                    >Finalizar Compra</button>
                    <button className="btn btn-sm px-5 btn-secondary"
                        onClick={() => {
                            detalleCompraModal();
                        }}
                    >Continuar comprando</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={procesarModal} >
                <ModalHeader >
                    Carrito
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        Procesado el producto
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
            {/* <div className="card">
                <div className="card-header">
                    Compra
                </div>
                <div className="card-body">
                    <div>
                        <button className="btn btn-sm btn-primary"
                            onClick={() => {
                                props.agregarCompraModal()
                            }}
                        >
                            Agregar
                        </button>
                    </div>
                    <div>
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Existencia</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.resultado ? (
                                    props.resultado.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.descripcion}</td>
                                            <td>{item.precio}</td>
                                            <td>{item.existencia}</td>
                                            <td>
                                                <button className="btn btn-sm btn-success"
                                                    onClick={() => {
                                                        props.seleccionarCompra({
                                                            id: item.id,
                                                            nombre: item.nombre,
                                                            descripcion: item.descripcion, 
                                                            precio: item.precio,
                                                            existencia: item.existencia,
                                                        });
                                                        props.editarCompraModal()
                                                    }}
                                                >
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan={3}>No hay compras</td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}
        </>
    );
}
export default CompraListar