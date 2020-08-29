import React, { useState, useEffect, useContext } from 'react';
import { Link, withRouter } from "react-router-dom";

import clienteAxios from "../../config/axios";
import Cliente from "./Cliente";
import Spinner from "../layout/Spinner";


import { CRMContext } from "../../context/CRMContext";

const Clientes = ( props ) => {

    const [clientes, guardarClientes] = useState( [] );
    //utilizar Valores de context
    const [auth, guardarAuth] = useContext( CRMContext );

    //useEffect similar a componentDidMount y willmount
    useEffect( () => {

        if( auth.token !== '' ) {
            const consultarAPI = async() => {
                try {
                    const clientesConsulta = await clienteAxios.get( '/clientes', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    } );
                    //Colocar el resultado en el state
                    guardarClientes( clientesConsulta.data )

                } catch( e ) {
                    //Error con authorization
                    if( e.response.status === 500 ) {
                        props.history.push( '/iniciar-sesion' );
                    }
                }
            }
            consultarAPI();
        } else {
            props.history.push( '/iniciar-sesion' )
        }

    }, [clientes] );

    if(!auth.auth){
        props.history.push('/iniciar-sesion')
    }
    //spinner de carga
    if( !clientes.length ) return <Spinner/>

    return (
        <>
            <h2>Clientes</h2>
            <Link to={'/clientes/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"/>
                Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
                {clientes.map( ( cliente, i ) => (
                    <Cliente
                        key={i}
                        cliente={cliente}
                    />
                ) )}
            </ul>
        </>
    );
};

export default withRouter( Clientes );
