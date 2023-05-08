import { Route, useParams, Link } from "react-router-dom"
import images from '../../../public/icons/usuario.png'
import { DeleteUser, UserDetailById, UserActivation} from "../../Services/UserService";
import { useEffect, useState } from "react";


function UserDetail() {
  const [apiCalled, setApiCalled] = useState(false);
  const [userData, setUserData] = useState([]);
  const [activado, setActivado] = useState(false);
  const [mensaje, setMensaje] = useState();
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams()

  useEffect(() => {
    if (!apiCalled) {
      UserDetailById(id).then(response => {
        setUserData(response);
        setApiCalled(true);
        setActivado(response.activado)
        console.log(response)
      });
    }
  }, [apiCalled]);
  

  function handleToggle() {
    setActivado(!activado);
    console.log('isEnabled:', !activado);
  }

  function activarUsuario(){    
    UserActivation(userData.email,activado).then(response => {      
      setMensaje(true);
      console.log(response);
    });
  }

  function eliminarUsuario() {
    DeleteUser(id).then(response => {
      window.location.reload()
      
    });
  }

  return (
    <>
      <div class="shadow-2xl flex flex-row m-8">
        <section class="m-6">
          <div class="flex flex-col bg-white w-full  shadow-xl">
            <div class="px-6">
              <div class="flex justify-center  mt-6">
                <img class="rounded-full w-40 h-40" src={images} />
              </div>
              <div class="text-center mt-12">
                <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {userData.name} {userData.lastname}
                </h3>
                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {userData.role}
                </div>
                <div class="mb-2 text-blueGray-600 mt-10">
                  <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Correo Registrado:
                </div>
                <div class="mb-2 text-blueGray-600">
                  <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {userData.email}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="self-center">
          <div class="flex flex-col bg-white w-full items-center  m-6 shadow-xl">
            <h3 class="mb-4 text-xl text-center font-semibold leading-normal text-blueGray-700 m-4">
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

            <button onClick={()=> activarUsuario()} type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Aplicar cambios</button>

            {mensaje ? (
                            <div class="p-4 m-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                Se ha cambiado el estado del usuario exitosamente
                            </div>
                        ) :null}

            <button type="button" onClick={() => setShowModal(true)} class="m-3 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar Usuario</button>
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
        </section>
      </div>
    </>
  );
}

export default UserDetail;