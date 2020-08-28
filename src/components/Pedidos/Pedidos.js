import React, { useState, useEffect } from 'react';
import clienteAxios from "../../config/axios";
import DetallesPedido from "./DetallesPedido";
import Swal from "sweetalert2";


const Pedidos = () => {

    const [pedidos, guardarPedidos] = useState( [] );


    useEffect( () => {

        const consultarAPI = async() => {

            //obtener los pedidos
            const resultado = await clienteAxios.get( `/pedidos` )
            guardarPedidos( resultado.data )
        }
        consultarAPI();

    }, [pedidos] )


    const eliminarPedido = id => {

        Swal.fire( {
            title: '¿Estas seguro?',
            text: "Un Pedido eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        } ).then( ( result ) => {
            if( result.value ) {
                //Llamado a axios
                clienteAxios.delete( `/pedidos/${id}` )
                    .then( (res) => {
                        Swal.fire(
                            'Eliminado!',
                            res.data.mensaje,
                            'success'
                        )
                    } )
            }
        } )
    }

    return (
        <>
            <h2>Pedidos</h2>
            {pedidos.length !== 0
                ?
                <ul className="listado-pedidos">
                    {pedidos.map( (pedido,index) => (
                        <DetallesPedido
                            key={index}
                            pedido={pedido}
                            eliminarPedido={eliminarPedido}
                        />
                    ) )}
                </ul>
                : 'No hay pedidos actualmente'
            }


        </>
    );
};

export default Pedidos;
