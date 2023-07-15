import { Route, useParams, Link } from "react-router-dom"
import images from '../../../public/icons/usuario.png'
import { DeleteUser, UserDetailById, UserActivation, ResetPassword } from "../../Services/UserService";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

function UserDetail() {
  const [apiCalled, setApiCalled] = useState(false);
  const [userData, setUserData] = useState([]);
  const [activado, setActivado] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [respuesta, setRespuesta] = useState();
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(false);
  const { id } = useParams()

  useEffect(() => {
    if (!apiCalled) {
      UserDetailById(id).then(response => {
        setUserData(response);
        console.log(response);
        setApiCalled(true);
        setActivado(response.activado)
      });
    }
  }, [apiCalled]);


  function handleToggle() {
    setActivado(!activado);
  }

  function Resetear() {
    ResetPassword(id).then(response => {
      if (response.result) {
        setError(false)
        setCorrect(true)
        setRespuesta(response)
      } else {
        setCorrect(false)
        setError(true)
        setRespuesta(response)
      }
    });
  }

  function activarUsuario() {
    UserActivation(userData.email, activado).then(response => {
      console.log(response)
    });
  }

  function eliminarUsuario() {
    DeleteUser(id).then(response => {
      window.location.reload()
    });
  }

  return (
    <div>
      <nav class="flex mt-2" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a href="/controlUser" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              Lista Usuario
            </a>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Detalle Usuario</span>
            </div>
          </li>
        </ol>
      </nav>
      <div class="mt-4 grid grid-cols-2 gap-4">
        <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-end px-4 pt-4">
          </div>
          <div class="flex flex-col items-center pb-10">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={images} alt="perfil" />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData.name} {userData.lastname}</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">{userData.role}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">{userData.email}</span>
            <div class="flex mt-4 space-x-3 md:mt-6">
              <a class="inline-flex items-center px-4 py-2 text-sm font-medium text-center  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Estado:</a>
              {userData.correoActivado ? <span class="bg-green-100 text-green-800 text-xs font-medium px-4 py-2 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Verificada</span> : <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-4 py-2 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">No Verificada</span>}
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 border border-slate-300">
          <h3 class="dark:text-white mb-4 text-xl text-center font-semibold leading-normal text-blueGray-700">
            Opciones
          </h3>
          <label className="relative inline-flex items-center mb-4 cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={activado}
              onChange={handleToggle}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{activado ? "Usuario Activado" : "Usuario desactivado"}</span>
          </label>
          <Link to={`/controlUser`}>
            <button onClick={() => activarUsuario()} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Aplicar cambios</button>
          </Link>
          <div class="flex items-center border-b-2 border-gray-200 py-2"></div>
          <div class="grid grid-cols-2 gap-4 px-8">
            <button type="button" onClick={() => Resetear()} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Resear Contraseña</button>
            <button type="button" onClick={() => setShowModal(true)} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar Usuario</button>
          </div>
          <div class="col-span-2 self-center mt-3">
            {correct ? (
              <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                {respuesta.respose} {respuesta.token}
              </div>
            ) : null}
          </div>
          <div class="col-span-2 self-center mt-3">
            {error ? (
              <div class="p-4 mx-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {respuesta.respose}
              </div>
            ) : null}
          </div>
          {showModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div class="relative w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button onClick={() => setShowModal(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                      </button>
                      <div class="p-6 text-center">
                        <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Estas seguro que deseas eliminar al usuario {userData.name}</h3>
                        <Link to={`/controlUser`}>
                          <button onClick={() => eliminarUsuario()} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Si, eliminar
                          </button>
                        </Link>
                        <button onClick={() => setShowModal(false)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UserDetail;