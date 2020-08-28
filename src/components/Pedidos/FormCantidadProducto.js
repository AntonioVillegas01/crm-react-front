import React from 'react';

const FormCantidadProducto = ( props ) => {

    const { index, producto, aumentarProductos, restarProductos, eliminarProductoPedido } = props
    return (
        <li>
            <div className="texto-producto">
                <p className="nombre">{producto.nombre}</p>
                <p className="precio">$ {producto.precio}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i
                        className="fas fa-minus"
                        onClick={() => restarProductos( index )}
                    />
                    <p>{producto.cantidad}</p>

                    <i
                        className="fas fa-plus"
                        onClick={() => aumentarProductos( index )}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-rojo"
                    onClick={()=> eliminarProductoPedido(producto._id)}

                >
                    <i className="fas fa-minus-circle"/>
                    Eliminar Producto
                </button>
            </div>
        </li>
    );
};

export default FormCantidadProducto;
