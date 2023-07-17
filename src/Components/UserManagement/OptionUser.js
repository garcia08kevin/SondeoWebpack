import { Route, useParams, Link } from "react-router-dom"
import { UserActivation, UserDetailById, ResetPassword, DeleteUser } from "../../Services/UserService";
import { useState, useEffect } from "react";

export const OptionUser = ({ id, respuesta }) => {
    const [apiCalled, setApiCalled] = useState(false);
    const [userData, setUserData] = useState([]);
    const [activado, setActivado] = useState(false);
    const [showModal, setShowModal] = useState(false);    

    useEffect(() => {
        if (!apiCalled) {
            UserDetailById(id).then(response => {
                setUserData(response);
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
            respuesta(response)
        });
    }

    function activarUsuario() {
        UserActivation(userData.userName, activado).then(response => {
            respuesta(response)
        });
    }

    function eliminarUsuario() {
        DeleteUser(id).then(response => {
            respuesta(response)
        });
    }

    return (
        <div class="flex flex-col items-center justify-center ">
            <h2 class="text-2xl pb-5 font-bold dark:text-white">Opciones del Usuario</h2>
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
            <button onClick={() => activarUsuario()} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Aplicar cambios</button>
            <div class="flex items-center border-b-2 border-gray-200 py-2"></div>
            <div class="grid grid-cols-2 gap-4 px-8">
                <button type="button" onClick={() => Resetear()} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Resear Contraseña</button>
                <button type="button" onClick={() => setShowModal(true)} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar Usuario</button>
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
                                        <button onClick={() => eliminarUsuario()} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Si, eliminar
                                        </button>
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
    );
}

export default OptionUser;