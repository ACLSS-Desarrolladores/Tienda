import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
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
                <div className='d-flex gap-4' style={{ 'display': 'flex', 'flexWrap': 'wrap' }}>
                    {props.resultado ? (
                        props.resultado.map(item => (
                            <div className='card border-white' style={{ 'width': '18rem' }} key={item.id}>
                                <div className='card-body'>
                                    <img src={cargarImagen(`./figura-${item.id}.jpg`)} />
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
            {/* <div className="card">
                <div className="card-header">
                    Producto
                </div>
                <div className="card-body">
                    <div>
                        <button className="btn btn-sm btn-primary"
                            onClick={() => {
                                props.agregarProductoModal()
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
                                                        props.seleccionarProducto({
                                                            id: item.id,
                                                            nombre: item.nombre,
                                                            descripcion: item.descripcion, 
                                                            precio: item.precio,
                                                            existencia: item.existencia,
                                                        });
                                                        props.editarProductoModal()
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
                                        <td colSpan={3}>No hay productos</td>
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
export default ProductoListar