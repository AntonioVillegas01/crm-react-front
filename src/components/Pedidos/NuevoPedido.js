import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import Swal from "sweetalert2";
import FormCantidadProducto from "./FormCantidadProducto";

const NuevoPedido = ( props ) => {

    //Extraer id de cliente
    const { id } = props.match.params;

    //State
    const [cliente, guardarCliente] = useState( {} );
    const [busqueda, guardarBusqueda] = useState( '' );
    const [productos, guardarProductos] = useState( [] );
    const [total, guardarTotal]= useState(0);

    useEffect( () => {

        //obtener Cliente
        const consultarAPI = async() => {
            //consultar cliente actual
            const resultado = await clienteAxios.get( `/clientes/${id}` )
            guardarCliente( resultado.data );
        }
        consultarAPI();

        //Acutalizar total con la dependencia productos
        actualizarTotal();
    }, [productos] )


    const buscarProducto = async( e ) => {
        e.preventDefault();
        //obtener productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post( `/productos/busqueda/${busqueda}` )

        //Si no hay resultados una alerta, contrario agregarlo al state
        if( resultadoBusqueda.data[0] ) {

            let productoResultado = resultadoBusqueda.data[0];

            //Agregar llave "producto" (copia de id)
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            //ponerlo en el state
            guardarProductos( [...productos, productoResultado] );

        } else {
            await Swal.fire( {
                icon: 'error',
                title: 'No hubo resultados',
                text: 'No hay resultados'
            } )
        }

        // console.log( resultadoBusqueda );
    }

    //almacena Busqueda en el STATE
    const leerDatosBusqueda = e => {
        guardarBusqueda( e.target.value )
    }

    //Actualizar cantidad productos
    const restarProductos = i => {
        //copiar el arreglo originalde productos
        const todosProductos = [...productos];

        //Validar si esta en 0 no puede ir mas alla
        if(todosProductos[i].cantidad === 0) return ;

        //decremento
        todosProductos[i].cantidad--;

        //Almacenarlo en el state
        guardarProductos(todosProductos)

    }

    const aumentarProductos = i => {
        //copiar el arreglo original
        const todosProductos = [...productos];

        //incremento
        todosProductos[i].cantidad++

        //colocarlo en el statw
        guardarProductos(todosProductos);


    }

    //Actualizar Total a pagar
    const actualizarTotal = () =>{

        //Si el arreglo de productos es 0 el total es 0
        if(productos.length === 0){
            guardarTotal(0)
            return;
        }

        //Calcular el nuevo total
        let nuevoTotal = 0;
        //recorrer productos y sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));
        //Almacenar TOTAL
        guardarTotal(nuevoTotal)

    }


    //Elimina un producto del state
    const eliminarProductoPedido = id =>{
        const todosProductos = productos.filter(producto => producto.producto !== id);

        guardarProductos(todosProductos)
    }

    //Almacena Pedido en base de datos
    const realizarPedido = async (e) =>{
        e.preventDefault()

        //Extraer el id
        const {id} = props.match.params;

        //Construir el objeto
        const pedido = {
            "cliente": id,
            "pedido": productos,
             total
        }

        //ALMACENARLO EN DB
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

        //leer resultado
        if(resultado.status === 200){
            //Alerta ok bien
            await Swal.fire( {
                icon: 'success',
                title: 'Correcto',
                text: resultado.data.mensaje
            } )
        }else{
            //Alerta error
            await Swal.fire( {
                icon: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            } )
        }

        //Redireccionar

        props.history.push('/pedidos')

    }

    return (
        <>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.apellido}</p>
                <p>{cliente.telefono}</p>
            </div>
            <p>puta madre</p>
            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
            />
            <ul className="resumen">
                {productos.map( ( producto, index ) => (
                    <FormCantidadProducto
                        key={index}
                        producto={producto}
                        restarProductos={restarProductos}
                        aumentarProductos={aumentarProductos}
                        eliminarProductoPedido={eliminarProductoPedido}
                        index={index}
                    />
                ) )}
            </ul>
            <p className="total">Total a pagar: <span>$ {total}</span> </p>
            {total > 0 
                ? <form
                    onSubmit={realizarPedido}
                >
                    <input
                        type="submit"
                        className="btn btn-verde btn-block"
                        value="Realizar Pedido"/>
                </form>
                : null
            }
        </>
    );
};

export default withRouter(NuevoPedido) ;
