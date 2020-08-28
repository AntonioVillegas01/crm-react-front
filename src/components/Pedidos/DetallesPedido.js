import React from 'react';

const DetallesPedido = ( { pedido, eliminarPedido } ) => {

    const { cliente } = pedido;

    return (
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {pedido._id}</p>
                <p className="nombre">Cliente: {cliente.nombre}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {pedido.pedido.map( ( articulos, i ) => (
                            <li key={i}>
                                <p>
                                    {
                                        articulos.producto != null ? articulos.producto.nombre : ''
                                    }
                                </p>
                                <p>
                                    {
                                        articulos.producto != null ?  `Precio: ${articulos.producto.precio}` : ''
                                    }
                                </p>
                                <p>
                                    {
                                        articulos.producto != null ? `Cantidad: ${articulos.cantidad}` : ''
                                    }
                                </p>
                            </li>
                        ) )}
                    </ul>
                </div>
                <p className="total">Total: $ {pedido.total} </p>
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={()=> eliminarPedido(pedido._id)}
                >
                    <i className="fas fa-times"/>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    );
};

export default DetallesPedido;
