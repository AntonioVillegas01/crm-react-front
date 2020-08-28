import React,{useState,useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import Spinner from "../layout/Spinner";

const EditarProducto = (props) => {
    //obtener el id del producto
    const {id} = props.match.params;

    //Producto = state, y funcion para actualizar
    const[producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    })
    const [archivo, guardarArchivo] = useState( '' );



    //cuando el componente carga
    useEffect(()=>{
        //consultar la api para traer producto
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.get(`/productos/${id}`);
            guardarProducto(productoConsulta.data);
        }
        consultarAPI()

    },[])

    //Edita producto en la base de datos
    const editarProducto = async e =>{
        e.preventDefault();
        //CRear Form Data
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio',producto.precio);
        formData.append('imagen', archivo)

        //almacenarlo en la BD
        try{
            const res = await clienteAxios.put(`/productos/${id}`,formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            if(res.status === 200){
                await Swal.fire( {
                    icon: 'success',
                    title: 'Editado Correctamente',
                    text: res.data.mensaje
                } )
            }

            //redireccionar
            props.history.push('/productos');

        }catch( e ) {
            console.log(e);
            await Swal.fire( {
                icon: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            } )
        }
    }

    const leerInformacionProducto = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        });
    }

    const leerArchivo = e => {
           console.log(e.target.files)
        guardarArchivo(e.target.files[0]);
    }

    //Extraer los valores del state
    const {nombre, precio, imagen} = producto;

    if(!nombre) return <Spinner/>;

    return (

        <>
            <h2>Editar Producto</h2>
            <form  onSubmit={editarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Producto"
                        name="nombre"
                        onChange={leerInformacionProducto}
                        value={nombre}
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
                        defaultValue={precio}
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    {imagen
                        ? <img src={`http://localhost:5000/${imagen}`} alt={nombre} width="300"/>
                        : null}
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
                        value="Guardar Cambios"
                    />
                </div>
            </form>
        </>
    );
};

export default withRouter(EditarProducto) ;
