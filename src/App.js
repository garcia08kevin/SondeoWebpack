import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar, { logout } from './Components/Sidebar';
import Home from './Components/Home';
import useToken, { getToken } from './Services/UserService';
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
import LocalesList from './Components/ProjectsManagement/LocalesList';
import LocalDetail from './Components/ProjectsManagement/LocalDetail';
import EncuestaDetail from './Components/ProjectsManagement/EncuestaDetail';
import HistoricoMediciones from './Components/ProjectsManagement/HistoricoMediciones';
import MedicionesActivas from './Components/ProjectsManagement/MedicionesActivas';
import jwtDecode from 'jwt-decode';

function App() {
  const { token, setToken } = useToken();
  const [connection, setConnection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    if (getToken() != undefined) {
      let decodedToken = jwtDecode(getToken())
      let currentDate = new Date();
      if (decodedToken.exp * 1000 - 300000 < currentDate.getTime()) {
        setShowModal(true)
      }
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem("token");
        logout()
      }
    }
    const connect = new HubConnectionBuilder()
      .withUrl(`${process.env.API_URL}/hubs/notifications`)
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
    <div class="h-full dark:bg-slate-800">
      <Sidebar />
      <div class="dark:bg-slate-800 p-4 sm:ml-64">
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div class="">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={() => setShowModal(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-5 text-center">


                      <button onClick={() => setShowModal(false)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route index element={<Home />} />
            <Route path="/controlProjects" element={<ControlProjects />}>
              <Route index element={<MedicionesActivas />} />
              <Route path="/controlProjects/localesList" element={<LocalesList />} />
              <Route path="/controlProjects/medicionesActivas" element={<MedicionesActivas />} />
              <Route path="/controlProjects/historicoMediciones" element={<HistoricoMediciones />} />
              <Route path="/controlProjects/localDetail/:id" element={<LocalDetail />} />
              <Route path="/controlProjects/encuestaDetail/:id" element={<EncuestaDetail />} />
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
