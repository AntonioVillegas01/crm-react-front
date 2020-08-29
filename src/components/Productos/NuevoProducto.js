import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom'
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

const NuevoProducto = ( props ) => {

    const [auth, guardarAuth] = useContext( CRMContext );

    const [producto, guardarProducto] = useState( {
        nombre: '',
        precio: ''
    } );
    const [archivo, guardarArchivo] = useState( '' );

    const leerInformacionProducto = e => {
        guardarProducto( {
            ...producto,
            [e.target.name]: e.target.value
        } );
    }

    const leerArchivo = e => {
        //   console.log(e.target.files)
        guardarArchivo( e.target.files[0] );
    }

    //almacena y guarda imagen en serrvidor
    const agregarProducto = async e => {
        e.preventDefault();

        //CRear Form Data
        const formData = new FormData();
        formData.append( 'nombre', producto.nombre );
        formData.append( 'precio', producto.precio );
        formData.append( 'imagen', archivo )

        //almacenarlo en la BD
        try {
            const res = await clienteAxios.post( '/productos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            } )
            if( res.status === 200 ) {
                await Swal.fire( {
                    icon: 'success',
                    title: 'Agregado Correctamente',
                    text: res.data.mensaje
                } )
            }

            //redireccionar
            props.history.push( '/productos' );

        } catch( e ) {
            console.log( e );
            Swal.fire( {
                icon: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            } )
        }
    }

    if(!auth.auth){
        props.history.push('/iniciar-sesion')
    }


    return (
        <>
            <h2>Nuevo Producto</h2>
            <form onSubmit={agregarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Producto"
                        name="nombre"
                        onChange={leerInformacionProducto}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        min="0.00"
                        step="0.01"
                        placeholder="Precio"
                        onChange={leerInformacionProducto}
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input
                        type="file"
                        name="imagen"
                        onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Producto"
                    />
                </div>
            </form>
        </>
    );
};

export default withRouter( NuevoProducto );
