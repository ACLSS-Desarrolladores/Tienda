import React, { useState } from 'react'
import { FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const ProductoEditar = (props) => {
    const [producto, setProducto] = useState(props.actualProducto)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setProducto({ ...producto, [name]: value })
    }
    return (
        <Modal isOpen={props.editarModal} >
            <ModalHeader >
                Producto
            </ModalHeader>

            <ModalBody>
                <FormGroup>
                    <label>Id</label>
                    <input
                        className="form-control"
                        name="id"
                        type="number"
                        autoComplete="off"
                        value={producto.id}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Nombre</label>
                    <input
                        className="form-control"
                        name="nombre"
                        type="text"
                        autoComplete="off"
                        value={producto.nombre}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Descripcion</label>
                    <input
                        className="form-control"
                        name="descripcion"
                        type="text"
                        autoComplete="off"
                        value={producto.descripcion}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Precio</label>
                    <input
                        className="form-control"
                        name="precio"
                        type="text"
                        autoComplete="off"
                        value={producto.precio}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Existencia</label>
                    <input
                        className="form-control"
                        name="existencia"
                        type="text"
                        autoComplete="off"
                        value={producto.existencia}
                        onChange={handleInputChange}
                    />
                </FormGroup>
            </ModalBody>

            <ModalFooter>
                <button className="btn btn-sm px-5 btn-success"
                    onClick={(event) => {
                        event.preventDefault();
                        alert("En Construcción");
                    }}
                >Guardar</button>
                <button className="btn btn-sm px-5 btn-secondary"
                    onClick={() => {
                        props.editarProductoModal()
                    }}
                >Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}

export default ProductoEditar
