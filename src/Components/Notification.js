import { useState, useEffect } from "react";
import { notificacionService, marcarComoLeida } from "../Services/UserService";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function Notificacion() {
  const [notificacion, setNotificacion] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    notificaciones();
  }, [apiCalled]);


  function notificaciones(){
    if (!apiCalled) {
      notificacionService().then(response => {
        setNotificacion(response);
        setApiCalled(true);
      });
    }
  }

  function marcaLeida(id){
    marcarComoLeida(id);
    setApiCalled(false);
  }

  function fechaFomato(fecha){
    const dateObj = new Date(fecha);

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year} / ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    return formattedDate;
  }

    return (
      <div class="shadow-2xl flex flex-col m-5">
        <div class="flex items-center justify-center h-10 shadow-md">
            <h1 class="text-2xl text-center  text-indigo-500">Notificaciones</h1>
            <button onClick={notificaciones} class="flex m-6 bg-white top-0 right-0 hover:bg-gray-100 text-gray-800 font-semibold py-0.5 px-3 border border-gray-400 rounded shadow">
              <TaskAltIcon/>
            </button>   
          </div>
          <div  class="relative overflow-x-auto table-fixed m-4">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    fecha
                </th>
                <th scope="col" class="px-6 py-3">
                    Mensaje
                </th>
                <th scope="col" class="px-6 py-3">
                    Acciones
                </th>
            </tr>
        </thead>
        <tbody>
          {notificacion.map((val,key)=>{
            return(
              <tr  key={val.id} class={val.vista == false ? "bg-white border-b dark:bg-gray-800 font-bold dark:border-gray-700": "bg-white border-b dark:bg-gray-800 dark:border-gray-700"}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {fechaFomato(val.fecha)}
                </th>
                <td class="px-6 py-4">
                    {val.mensaje}
                </td>
                <td class="px-6 py-4">
                <button onClick={() => marcaLeida(val.id)} type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <TaskAltIcon/>
                </button>
                </td>
            </tr>
            )
          })}
        </tbody>
    </table>
          </div>
      </div>
    );
  }
  
export default Notificacion;