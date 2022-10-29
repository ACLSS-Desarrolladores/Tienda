import React, { useState } from 'react'
import { FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const CompraAgregar = (props) => {
    const inicializarCompra = { id: '', nombre: '', descripcion: '', precio: '', existencia: '' }
    const [compra, setCompra] = useState(inicializarCompra)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setCompra({ ...compra, [name]: value })
    }
    return (
        <Modal isOpen={props.agregarModal} >
            <ModalHeader >
                Compra
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>Id</label>
                    <input
                        className="form-control"
                        name="id"
                        type="number"
                        autoComplete="off"
                        value={compra.id}
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
                        value={compra.nombre}
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
                        value={compra.descripcion}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Precio</label>
                    <input
                        className="form-control"
                        name="precio"
                        type="number"
                        autoComplete="off"
                        value={compra.precio}
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
                        value={compra.existencia}
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
                        props.agregarCompraModal();
                        setCompra(inicializarCompra);
                    }}
                >Cancelar</button>
            </ModalFooter>
        </Modal >
    )
}

export default CompraAgregar
