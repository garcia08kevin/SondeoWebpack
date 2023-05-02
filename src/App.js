import { BrowserRouter,Routes, Route } from 'react-router-dom' 
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import useToken from './Services/UserService';
import Login from './Components/Login';
import UserList from './Components/UserManagement/UserList';
import Notificacion from './Components/Notification';
import { toast, ToastContainer } from 'react-toastify';
import { ultimaNotificacion } from './Services/UserService';
import { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import ControlUser from './Components/UserManagement/ControlUser';


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
  
  if(!token) {
    return <Login setToken={setToken} />
  }

  // setInterval(() => {
  // ultimaNotificacion().then(function(result) {
  //   if (lastResult !== null && JSON.stringify(lastResult) === JSON.stringify(result)) {
  //     console.log("Sin cambios")
  //   }
  //   else {
  //     setMessage(result);
  //     Mensaje();
  //   }
  //   lastResult = result;
  //   });
  // }, 10000);
  
  // function Mensaje(){
  //   var notificacion = <div><div>{message.fecha}</div><div>{message.mensaje}</div> </div> 
  //   return toast({notificacion});     
  // }
  

  return (
    <div class="flex">
      <Sidebar/>
      <BrowserRouter>
        <Routes>        
        <Route path="/" element={<Home/>} />  
        <Route path="/controlUser" element={<ControlUser />}>
                   
        </Route>
        <Route path="/notificaciones" element={<Notificacion/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
