import React, { useState } from 'react'
import { FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const VentaAgregar = (props) => {
    const inicializarVenta = { idVenta: '', fecha: '', idCliente: '', valor: '', confirmado: '' }
    const [venta, setVenta] = useState(inicializarVenta)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setVenta({ ...venta, [name]: value })
    }
    return (
        <Modal isOpen={props.agregarModal} >
            <ModalHeader >
                Venta
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>
                        Id:
                    </label>
                    <input
                        className="form-control"
                        name="id"
                        type="number"
                        autoComplete="off"
                        value={venta.id}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Nombre:
                    </label>
                    <input
                        className="form-control"
                        name="nombre"
                        type="text"
                        autoComplete="off"
                        value={venta.nombre}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Descripcion:
                    </label>
                    <input
                        className="form-control"
                        name="descripcion"
                        type="text"
                        autoComplete="off"
                        value={venta.descripcion}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Precio:
                    </label>
                    <input
                        className="form-control"
                        name="precio"
                        type="number"
                        autoComplete="off"
                        value={venta.precio}
                        onChange={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>
                        Existencia:
                    </label>
                    <input
                        className="form-control"
                        name="existencia"
                        type="text"
                        autoComplete="off"
                        value={venta.existencia}
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
                        props.agregarVentaModal();
                        setVenta(inicializarVenta);
                    }}
                >Cancelar</button>
            </ModalFooter>
        </Modal >
    )
}

export default VentaAgregar
