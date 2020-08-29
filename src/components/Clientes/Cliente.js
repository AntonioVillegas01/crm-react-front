import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";


const Cliente = ( { cliente } ) => {

    const [auth,guardarAuth]= useContext(CRMContext);

    const { _id, nombre, apellido, empresa, email, telefono } = cliente;

    const eliminarCliente = idCliente => {
        //    console.log(`Eliminando ${id}`)
        Swal.fire( {
            title: '¿Estas seguro?',
            text: "Un Cliente eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        } ).then( ( result ) => {
            if( result.value ) {
                //Llamado a axios
                clienteAxios.delete( `/clientes/${idCliente}`, {
                    headers:{
                        Authorization: `Bearer ${auth.token}`
                    }
                } )
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
            <li className="cliente">
                <div className="info-cliente">
                    <p className="nombre">{nombre} {apellido}</p>
                    <p className="empresa">{empresa}</p>
                    <p>{email}</p>
                    <p>Tel: {telefono}</p>
                </div>
                <div className="acciones">
                    <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"/>
                        Editar Cliente
                    </Link>
                    <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                        <i className="fas fa-plus"/>
                        Nuevo Pedido
                    </Link>
                    <button
                        type="button"
                        className="btn
                        btn-rojo btn-eliminar"
                        onClick={() => eliminarCliente( _id )}
                    >
                        <i className="fas fa-times"/>
                        Eliminar Cliente
                    </button>
                </div>
            </li>
        </>
    );
};

export default Cliente;
