import React,{useEffect,useState} from 'react';
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Producto from "./Producto";
import Spinner from "../layout/Spinner";

const Productos = () => {

    const[productos,guardarProductos] = useState([]);

    useEffect(()=>{
        //Query a la API
        const consultarAPI = async ()=>{
            const productosConsulta = await clienteAxios.get('/productos');
            guardarProductos(productosConsulta.data);
        }
        //llamado a la API
        consultarAPI();

    },[productos])

    //spinner de carga
    if(!productos.length) return <Spinner/>

    return (
        <>
            <h2>Productos</h2>

            <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"/>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map( (producto, i) =>(
                    <Producto
                        key={i}
                        producto={producto}
                    />
                ))}
            </ul>
        </>
    );
};

export default Productos;
