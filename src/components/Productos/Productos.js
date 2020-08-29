import React, { useEffect, useState, useContext } from 'react';
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Producto from "./Producto";
import Spinner from "../layout/Spinner";
import { CRMContext } from "../../context/CRMContext";


// todo: TErminar de impleementar el auth para los productos

const Productos = ( props ) => {

    //Authorization context
    const [auth, guardarAuth] = useContext( CRMContext );

    const [productos, guardarProductos] = useState( [] );


    useEffect( () => {

        if( auth.token !== '' ) {
            try {
                //Query a la API
                const consultarAPI = async() => {
                    const productosConsulta = await clienteAxios.get( '/productos', {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    } );
                    guardarProductos( productosConsulta.data );
                }
                //llamado a la API
                consultarAPI();

            } catch( e ) {
                if( e.response.status === 500 ) {
                    props.history.push( '/iniciar-sesion' )
                }
            }
        } else {
            props.history.push( '/iniciar-sesion' )
        }
    }, [productos] )


    //spinner de carga
    if( !productos.length ) return <Spinner/>

    return (
        <>
            <h2>Productos</h2>

            <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"/>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map( ( producto, i ) => (
                    <Producto
                        key={i}
                        producto={producto}
                    />
                ) )}
            </ul>
        </>
    );
};

export default withRouter( Productos );
