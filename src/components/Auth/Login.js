import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom'
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

//Context
import {CRMContext} from "../../context/CRMContext";


const Login = (props) => {

    //Auth y token
    const[auth, guardarAuth] = useContext(CRMContext);
    //State con los datos del formulario
    const [credenciales, guardarCredenciales] = useState( {} );

    //inicia sesion en el servidor
    const iniciarSesion = async e => {
        e.preventDefault();
        //autenticar el usuario
        try {
            const respuesta = await clienteAxios.post( '/iniciar-sesion', credenciales )
            console.log( respuesta )
            //extraer el token y colocarlo en el localstorage
            const { token } = respuesta.data;
            localStorage.setItem( 'token', token );

            //Colocarlo token en state
            guardarAuth({
                token,
                auth: true
            })

            //alerta
            Swal.fire( {
                icon: "success",
                title: "Login Correcto",
                text: "Has iniciado sesión"
            } )

            //redireccionamos
            props.history.push('/');

        } catch( e ) {
            console.log( e );
            Swal.fire( {
                icon: "error",
                title: "Hubo un Error",
                text: e.response.data.mensaje
            } )
        }
    }


    //Almacenar lo que el usuario escribe en el state
    const leerDatos = ( e ) => {
        guardarCredenciales( {
            ...credenciales,
            [e.target.name]: e.target.value
        } )
    }


    return (
        <div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form onSubmit={iniciarSesion}>
                    <div className="campo">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="off"
                            placeholder="Email para Iniciar Sesión"
                            required={true}
                            onChange={leerDatos}
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="email">Password</label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="off"
                            placeholder="Password para Iniciar Sesión"
                            required={true}
                            onChange={leerDatos}
                        />
                    </div>
                    <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block"/>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Login) ;
