import React,{useContext} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";


import Clientes from "./components/Clientes/Clientes";
import NuevoCliente from "./components/Clientes/NuevoCliente";
import EditarCliente from "./components/Clientes/EditarCliente";

import Productos from "./components/Productos/Productos";
import NuevoProducto from "./components/Productos/NuevoProducto";
import EditarProducto from "./components/Productos/EditarProducto";


import Pedidos from "./components/Pedidos/Pedidos";
import NuevoPedido from "./components/Pedidos/NuevoPedido";

import Login from './components/Auth/Login'

import {CRMProvider, CRMContext} from "./context/CRMContext";

const App = () => {
    //utilizar context en el componente extraemos desde CRMContext
    const [auth, guardarAuth] = useContext(CRMContext);


  return (
      <Router>
          <CRMProvider value={[auth,guardarAuth]}>
              <Header />
              <div className="grid contenedor contenido-principal">
                  <Navegacion />
                  <main className="caja-contenido col-9">
                      <Switch>
                          <Route exact={true} path="/" component={Clientes} />
                          <Route exact={true} path="/clientes/nuevo" component={NuevoCliente} />
                          <Route exact={true} path="/clientes/editar/:id" component={EditarCliente} />

                          <Route exact={true} path="/productos" component={Productos} />
                          <Route exact={true} path="/productos/nuevo" component={NuevoProducto} />
                          <Route exact={true} path="/productos/editar/:id" component={EditarProducto} />

                          <Route exact={true} path="/pedidos" component={Pedidos} />
                          <Route exact={true} path="/pedidos/nuevo/:id" component={NuevoPedido} />

                          <Route exact={true} path="/iniciar-sesion" component={Login} />
                      </Switch>
                  </main>
              </div>
          </CRMProvider>
      </Router>
  );
};



export default App;
