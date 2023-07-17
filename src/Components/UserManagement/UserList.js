import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { getUsers } from "../../Services/UserService";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RegisterUser from "./RegisterUser";
import images from '../../../public/icons/usuario.png'
import OptionUser from "./OptionUser";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function UserList() {
  const [users, setUsers] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [usuarioSelected, setUsuarioSelected] = useState(true);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(null);

  const itemsPerPage = 10;

  function handlePageClick(event, pageNumber) {
    event.preventDefault();
    setCurrentPage(pageNumber);
  }

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const changeHandler = e => {
    if (e.result) {
      if (e.token != undefined) {
        setShowPassword(true)
        setPassword(e.token)
      }
      setLoading(true);
      setShowModal(false);
      setMostrarOpciones(false);
      toast.success(`${e.respose}`);
      getUsers().then(response => {
        setUsers(response);
        setApiCalled(true);
        setLoading(false)
      });
    } else if (!e.result) {
      toast.error(`${e.respose}`);
    }
  }

  useEffect(() => {
    if (!apiCalled) {
      getUsers().then(response => {
        setUsers(response);
        setApiCalled(true);
        setLoading(false)
      });
    }
  }, [apiCalled]);

  const seleccionarUsuario = (id) => {
    setMostrarOpciones(true)
    setUsuarioSelected(id)
  }

  const copiarPortapapeles = () => {
    navigator.clipboard.writeText(password)
    setShowPassword(false)
    setPassword(null)
    toast.success("Copiado al portapapeles");
  }

  return (
    <div class="dark:bg-slate-800">
      <h2 class="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Lista de Usuarios</h2>

      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <button onClick={() => setShowModal(true)} type="button" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agrear nuevo Usuario</button>
      </div>
      {loading ? (
        <div role="status" class="translate-x-1/2 translate-y-1/2 top-1/4 left-1/2">
          <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
          <span class="sr-only">Loading...</span>
        </div>
      ) :
        <div class="relative overflow-x-auto table-fixed m-4">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                  Role
                </th>
                <th scope="col" class="px-6 py-3">
                  Estado
                </th>
                <th scope="col" class="text-center px-6 py-3">
                  Cuenta Verificada
                </th>
                <th scope="col" class="px-6 py-3">
                  Detalles
                </th>
              </tr>
            </thead>
            <tbody>
              {users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())).map((val, key) => {
                return (

                  <tr key={val.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img class="w-10 h-10 rounded-full" src={val.imagen == null ? images : `data:image/jpeg;base64,${val.imagen}`} alt="usuario" />
                      <div class="pl-3">
                        <div class="text-base font-semibold">{val.name} {val.lastname}</div>
                        <div class="font-normal text-gray-500">Nombre Usuario: {val.userName}</div>
                        <div class="font-normal text-gray-500">{val.email === "" ? "Sin Correo Registrado" : `${val.email}`}</div>
                      </div>
                    </th>
                    <td class="px-6 py-4">
                      {val.role}
                    </td>
                    <td class="px-6 py-4">
                      {val.activado == true ? <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Activado
                      </div> : <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Desactivado
                      </div>}
                    </td>
                    <td class="text-center px-6 py-4">
                      {val.correoActivado ? <span class="bg-green-100 text-green-800 text-xs font-medium px-4 py-2 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">SI</span> : <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-4 py-2 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">NO</span>}
                    </td>
                    <td class="px-6 py-4">
                      <button type="button" onClick={() => seleccionarUsuario(val.id)} class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-2 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        <MoreVertIcon />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
                        <RegisterUser />

                        <button onClick={() => setShowModal(false)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          {mostrarOpciones ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div class="">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button onClick={() => setMostrarOpciones(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                      </button>
                      <div class="p-5 text-center">
                        <OptionUser respuesta={changeHandler} id={usuarioSelected} />
                        <button onClick={() => setMostrarOpciones(false)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          {showPassword ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div class="relative w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button onClick={() => setShowPassword(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                      </button>
                      <div class="p-6 text-center">
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Esta es la clave temporal del usuario seleccionado</h3>
                        <div class="grid grid-cols-5 gap-4">
                          <input type="text" id="disabled-input-2" aria-label="disabled input 2" class="col-span-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-5 mr-2 mb-2 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} disabled readonly />
                          <button onClick={() => copiarPortapapeles()} type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><ContentCopyIcon /></button>
                        </div>
                        <button onClick={() => setShowPassword(false)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      }
      <nav class="flex m-3 justify-center">
        <ul className="inline-flex items-center -space-x-px">
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <a
                href="#"
                className={`block px-3 py-2 leading-tight ${currentPage === pageNumber
                  ? "text-white bg-indigo-500"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                onClick={(event) => handlePageClick(event, pageNumber)}
              >
                {pageNumber}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default UserList;