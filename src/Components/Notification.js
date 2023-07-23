import { useState, useEffect } from "react";
import { notificacionService, marcarComoLeida, eliminarNotificacion } from "../Services/UserService";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteIcon from '@mui/icons-material/Delete';

function Notificacion() {
  const [notificacion, setNotificacion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    notificaciones();
  }, [apiCalled]);


  function notificaciones() {
    if (!apiCalled) {
      notificacionService().then(response => {
        setNotificacion(response);
        setLoading(false)
        setApiCalled(true);
      });
    }
  }

  function marcaLeida(id) {
    setLoading(true)
    marcarComoLeida(id);
    window.location.reload()
  }

  function eliminar(id) {
    setLoading(true)
    eliminarNotificacion(id).then(response => {
      setLoading(false)
      window.location.reload()
    });
  }

  function fechaFomato(fecha) {
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
    <div class="h-full p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div class="flex items-center justify-center">
        <h2 class="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Notificaciones</h2>
      </div>
      <div>
        {loading ? (
          <div role="status" class="py-10 translate-x-1/2">
            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) :
          <div class="relative overflow-x-auto table-fixed m-4">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Notificacion
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {notificacion.map((val, key) => {
                  return (
                    <tr key={val.id} class={val.vista == false ? "font-bold group/item hover:bg-slate-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700" : "group/item hover:bg-slate-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700"}>
                      {val.tipo == 1 ? <td class="group/item hover:bg-slate-100 w-full p-3 mt-1 rounded flex">
                        <div tabindex="0" aria-label="post icon" role="img" class="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M1.33325 14.6667C1.33325 13.2522 1.89516 11.8956 2.89535 10.8954C3.89554 9.89523 5.2521 9.33333 6.66659 9.33333C8.08107 9.33333 9.43763 9.89523 10.4378 10.8954C11.438 11.8956 11.9999 13.2522 11.9999 14.6667H1.33325ZM6.66659 8.66666C4.45659 8.66666 2.66659 6.87666 2.66659 4.66666C2.66659 2.45666 4.45659 0.666664 6.66659 0.666664C8.87659 0.666664 10.6666 2.45666 10.6666 4.66666C10.6666 6.87666 8.87659 8.66666 6.66659 8.66666ZM11.5753 10.1553C12.595 10.4174 13.5061 10.9946 14.1788 11.8046C14.8515 12.6145 15.2515 13.6161 15.3219 14.6667H13.3333C13.3333 12.9267 12.6666 11.3427 11.5753 10.1553ZM10.2266 8.638C10.7852 8.13831 11.232 7.52622 11.5376 6.84183C11.8432 6.15743 12.0008 5.41619 11.9999 4.66666C12.0013 3.75564 11.7683 2.85958 11.3233 2.06466C12.0783 2.21639 12.7576 2.62491 13.2456 3.2208C13.7335 3.81668 14.0001 4.56315 13.9999 5.33333C14.0001 5.80831 13.8987 6.27784 13.7027 6.71045C13.5066 7.14306 13.2203 7.52876 12.863 7.84169C12.5056 8.15463 12.0856 8.38757 11.6309 8.52491C11.1762 8.66224 10.6974 8.7008 10.2266 8.638Z"
                              fill="#047857"
                            />
                          </svg>
                        </div>
                        <div class="pl-2">
                          <p tabindex="0" class="focus:outline-none text-sm leading-none">{val.mensaje}</p>
                          <p tabindex="0" class="focus:outline-none text-left text-xs leading-3 pt-1 text-gray-500">{fechaFomato(val.fecha)}</p>
                          <div tabindex="0" aria-label="close icon" role="button" class="focus:outline-none cursor-pointer">
                          </div>
                        </div>
                      </td> : <td class="group/item hover:bg-slate-100 w-full p-3 mt-1 rounded flex">
                        <div tabindex="0" aria-label="post icon" role="img" class="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z" fill="#4338CA" />
                          </svg>
                        </div>
                        <div class="pl-2">
                        <p tabindex="0" class="focus:outline-none text-left text-sm leading-none">{val.mensaje}</p>
                        <p tabindex="0" class="focus:outline-none text-left text-xs leading-3 pt-1 text-gray-500">{fechaFomato(val.fecha)}</p>
                        <div tabindex="0" aria-label="close icon" role="button" class="focus:outline-none cursor-pointer"></div>
                        </div>
                      </td>}
                      <td class="px-6 pt-2">
                        <button onClick={() => marcaLeida(val.id)} type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                          <TaskAltIcon />
                        </button>
                        <button onClick={() => eliminar(val.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><DeleteIcon /></button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}

export default Notificacion;