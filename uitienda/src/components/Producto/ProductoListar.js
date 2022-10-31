import React from 'react'
import { FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/CompraProducto.css'
const cargarImagen = require.context("../img/", true);

const ProductoListar = (props) => {
    return (
        <>
            <div className='px-4 py-5 text-center'>
                <h1 className='fw-bold'>Productos</h1>
                <button className="btn btn-sm px-5 btn-secondary"
                    onClick={() => {
                        props.agregarProductoModal()
                    }}
                >
                    Agregar
                </button>
                <div className='wrapper'>
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
                                    <p style={{ margin: 0 }}>$ {item.precio}</p>
                                </div>
                                <div className='card-footer' style={{ 'background': 'inherit', 'borderColor': 'inherit' }}>
                                    <button className="btn btn-sm px-5 btn-success"
                                        onClick={() => {
                                            props.seleccionarProducto(item);
                                            props.editarProductoModal()
                                        }}
                                    >
                                        Editar
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='card border-white' style={{ 'width': '18rem' }}>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={props.procesarModal} >
                <ModalHeader >
                    Producto
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        Procesando producto
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <button className="btn btn-sm px-5 btn-success"
                        onClick={() => {
                            props.procesarProductoModal();
                        }
                        }
                    >Continuar</button>
                </ModalFooter>
            </Modal>

        </>
    );
}
export default ProductoListar