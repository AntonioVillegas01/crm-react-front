import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { withRouter } from 'react-router-dom';

import clienteAxios from "../../config/axios";

const EditarCliente = ( props ) => {

    //Obtener el ID del cliente
    const { id } = props.match.params;


    //cliente = state; guardarcliente=actualizar el state
    const [cliente, datosCliente] = useState( {
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    } );

    //query a la api
    const consultarAPI = async() => {
        const clienteConsulta = await clienteAxios.get( `/clientes/${id}` );
        //   console.log(clienteConsulta.data);

        //colocar en el state
        datosCliente( clienteConsulta.data );

    }


    //usefect cuando el componente carga
    useEffect( () => {
        consultarAPI();
    }, [] )


    const actualizarState = e => {
        //Almacenar lo que el usuario escribe en el state
        datosCliente( {
            // Importante guarda una copia
            ...cliente,
            [e.target.name]: e.target.value
        } )
        // console.log( cliente )
    }

    //Validar el formulario
    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono } = cliente

        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;
        return valido;
    }

    //Actualiza cliente en servicdor

    const actualizarCliente = e => {
        e.preventDefault();

        clienteAxios.put( `/clientes/${cliente._id}`, cliente )
            .then( res => {
               // console.log( res )
                if( res.data.code === 11000 ) {
                    Swal.fire( {
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'Ese cliente ya esta registrado'
                        }
                    )
                } else {
                    Swal.fire(
                        'Se actualizo correctamente',
                        res.data.mensaje,
                        'success'
                    )
                }
                //Redireccionar
                props.history.push('/');
            } )
    }


    return (
        <>
            <h2>Editar Cliente</h2>
            <form
                onSubmit={actualizarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={actualizarState}
                        value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={actualizarState}
                        value={cliente.apellido}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={actualizarState}
                        value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={actualizarState}
                        value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={actualizarState}
                        value={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarCliente()}
                    />
                </div>

            </form>
        </>
    );
};

//HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter( EditarCliente );
