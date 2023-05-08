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
import BlockUser from './Components/UserManagement/BlockUser';
import RegisterUser from './Components/UserManagement/RegisterUser';
import UserDetail from './Components/UserManagement/UserDetail';

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
          connection.on("ReceiveMessage", (message) => {
            toast.success(`Nueva notificacion recibida: ${message}`);
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
    <div class="flex">
      <aside class="h-screen sticky top-0">
      <Sidebar />
    </aside>      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/controlUser" element={<ControlUser />}>
            <Route index element={<UserList />} />
            <Route path="/controlUser/useList" element={<UserList />} />
            <Route path="/controlUser/blockUser" element={<BlockUser />} />
            <Route path="/controlUser/registerUser" element={<RegisterUser />} />
            <Route path="/controlUser/userDetail/:id" element={<UserDetail />} />
          </Route>
          <Route path="/notificaciones" element={<Notificacion />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
