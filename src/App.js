import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import useToken from './Services/UserService';
import Login from './Components/Login';
import Notificacion from './Components/Notification';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import ControlUser from './Components/UserManagement/ControlUser';
import NoEncontrada from './Components/NoEncontrada';
import UserList from './Components/UserManagement/UserList';
import RegisterUser from './Components/UserManagement/RegisterUser';
import UserDetail from './Components/UserManagement/UserDetail';
import ControlProduct from './Components/ProductsManagement/ControlProduct';
import PoductList from './Components/ProductsManagement/ProductList';
import ProductoNoActivado from './Components/ProductsManagement/ProductoNoActivado'
import ProductDetail from './Components/ProductsManagement/ProductDetail';
import ControlProjects from './Components/ProjectsManagement/ControlProjects';
import ReplaceProduct from './Components/ProductsManagement/ReplaceProduct';

function App() {
  const { token, setToken } = useToken();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("https://localhost:7125/hubs/notifications")
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("Notificacion", (message) => {
            toast.success(`${message}`);
            console.log(message);
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div class="">
      <Sidebar />
      <div class="p-4 sm:ml-64">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/controlProjects" element={<ControlProjects />}>
              <Route index element={<UserList />} />
              <Route path="/controlProjects/projectsList" element={<UserList />} />
              <Route path="/controlProjects/projectsUser" element={<RegisterUser />} />
              <Route path="/controlProjects/projectsDetail/:id" element={<UserDetail />} />
            </Route>
            <Route path="/controlUser" element={<ControlUser />}>
              <Route index element={<UserList />} />
              <Route path="/controlUser/userList" element={<UserList />} />
              <Route path="/controlUser/registerUser" element={<RegisterUser />} />
              <Route path="/controlUser/userDetail/:id" element={<UserDetail />} />
            </Route>
            <Route path="/controlProduct" element={<ControlProduct />}>
              <Route index element={<PoductList />} />
              <Route path="/controlProduct/productList" element={<PoductList />} />
              <Route path="/controlProduct/noActivados" element={<ProductoNoActivado />} />
              <Route path="/controlProduct/productDetail/:id" element={<ProductDetail />} />
              <Route path="/controlProduct/replaceProduct/:id" element={<ReplaceProduct />} />
            </Route>
            <Route path="/notificaciones" element={<Notificacion />} />
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
