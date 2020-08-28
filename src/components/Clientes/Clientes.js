import React, {useState,useEffect} from 'react';
import { Link } from "react-router-dom";

import clienteAxios from "../../config/axios";
import Cliente from "./Cliente";
import Spinner from "../layout/Spinner";


const Clientes = () => {

    const[clientes,guardarClientes] = useState([]);

    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes');

        //Colocar el resultado en el state
        guardarClientes(clientesConsulta.data)
    }

    //useEffect similar a componentDidMount y willmount
    useEffect(()=>{
        consultarAPI();
    },[clientes]);


    //spinner de carga
    if(!clientes.length) return <Spinner/>

    return (
        <>
            <h2>Clientes</h2>
            <Link to={'/clientes/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"/>
                Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
                {clientes.map( (cliente, i) => (
                        <Cliente
                            key={i}
                            cliente={cliente}
                        />
                ))}
            </ul>
        </>
    );
};

export default Clientes;
