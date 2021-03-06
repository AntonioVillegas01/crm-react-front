import React, { useContext, useState } from 'react';
import Swal from "sweetalert2";
import {withRouter} from 'react-router-dom';

import clienteAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

const NuevoCliente = ({history}) => {

    const[auth,guardarAuth]= useContext(CRMContext);


    //cliente = state; guardarcliente=actualizar el state
    const [cliente, guardarCliente] = useState( {
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    } );


    const actualizarState = e => {
        //Almacenar lo que el usuario escribe en el state
        guardarCliente( {
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

    //envia el formulario
    const agregarCliente = ( e ) => {
        e.preventDefault();

        //enviar Peticion
        clienteAxios.post( '/clientes', cliente, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        } )
            .then( res => {
                if( res.data.code === 11000 ) {
                    Swal.fire( {
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'Ese cliente ya esta registrado'
                        }
                    )
                } else {
                    Swal.fire(
                        'Se agrego el cliente',
                        res.data.mensaje,
                        'success'
                    )
                }
            } )
        //Redireccionar
        history.push('/');
    }

    if(!auth.auth && (localStorage.getItem('token', auth.token) === auth.token) ) {
        history.push('/iniciar-sesion');
    }

    return (
        <>
            <h2>Nuevo Cliente</h2>
            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Cliente"
                        disabled={validarCliente()}
                    />
                </div>

            </form>
        </>
    );
};

//HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente) ;
