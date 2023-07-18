import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getCiudades, getLocales, getCanales, getLocalesById, habilitarLocal } from "../../Services/EncuestaService";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { toast } from 'react-toastify';

function LocalesList() {
    const [ciudades, setCiudades] = useState([]);
    const [locales, setLocales] = useState([]);
    const [canales, setCanales] = useState([]);
    const [filtroCanal, setFiltroCanal] = useState('');
    const [filtroCiudad, setFiltroCiudad] = useState('');
    const [apiCalled, setApiCalled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedLocal, setSelectedLocal] = useState();
    const [showOptions, setShowOptions] = useState(false);
    const [activado, setActivado] = useState(false);

    useEffect(() => {
        if (!apiCalled) {
            getCiudades().then(response => {
                setCiudades(response);
            });
            getCanales().then(response => {
                setCanales(response);
            });
            getLocales().then(response => {
                setLocales(response);
                setLoading(false);
            });
            setApiCalled(true);
        }
    }, [apiCalled]);

    const mostrarOpciones = (id) => {
        setShowOptions(true)
        setSelectedLocal(id)
        getLocalesById(id).then(response => {
            setActivado(response.habilitado);
        });
    }

    function handleToggle() {
        setActivado(!activado);
    }

    const activarLocal = () =>{
        habilitarLocal(selectedLocal, activado).then(response => {
            if(response.result){
                getLocales().then(response => {
                    setLocales(response);
                    setLoading(true);
                });
                toast.success(`${response.respose}`);
                setShowOptions(false)
            } else if(!response.result){
                toast.error(`${response.respose}`);
            }
            
        });
    } 

    return (
        <div>
            <h2 class="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Lista de Locales</h2>
            {loading ? (
                <div role="status" class="py-10 translate-x-1/2">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span class="sr-only">Loading...</span>
                </div>
            ) :
                <div>
                    <div>
                        <select value={filtroCiudad} onChange={(e) => setFiltroCiudad(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option defaultValue >Cuidades</option>
                            {ciudades.map((val, key) => {
                                return (
                                    <option key={val.id} value={val.nombreCiudad}>{val.nombreCiudad}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div class="pt-5 relative overflow-x-auto sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Nombre
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Direccion
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Cuidad
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <select value={filtroCanal} onChange={(e) => setFiltroCanal(e.target.value)} id="small" class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <option >Canal</option>
                                            {canales.map((val, key) => {
                                                return (
                                                    <option key={val.id} value={val.nombreCanal}>{val.nombreCanal}</option>
                                                )
                                            })}
                                        </select>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Estado
                                    </th>
                                    <th scope="col" class="text-center px-6 py-3">
                                        Opciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {locales.filter((local) =>
                                    (filtroCanal === '' || filtroCanal === 'Canal' ? true : (local.canal === filtroCanal))
                                    && (filtroCiudad === '' || filtroCiudad === 'Cuidades' ? true : (local.ciudad === filtroCiudad))
                                )
                                    .map((val, key) => {
                                        return (
                                            <tr key={val.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td class="px-6 py-4">
                                                    {val.nombre}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {val.direccion}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {val.ciudad}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {val.canal}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {val.habilitado == true ? <div class="flex items-center">
                                                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Activado
                                                    </div> : <div class="flex items-center">
                                                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Desactivado
                                                    </div>}
                                                </td>
                                                <td class="flex justify-center items-center px-6 py-4">
                                                    <Link to={`/controlProjects/localDetail/${val.id}`}>
                                                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Detalle</button>
                                                    </Link>
                                                    <button type="button" onClick={() => mostrarOpciones(val.id)} class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><ModeEditIcon /></button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                        {showOptions ? (
                            <>
                                <div
                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                >
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        <div class="p-4">
                                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <button onClick={() => setShowOptions(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                    <span class="sr-only">Close modal</span>
                                                </button>
                                                <div class="flex flex-col justify-center items-center p-5 text-center">
                                                    <h2 class="text-2xl pb-5 font-bold dark:text-white">Opciones del Local</h2>
                                                    <label className="relative inline-flex items-center mb-4 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            checked={activado}
                                                            onChange={handleToggle}
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{activado ? "Habilitado" : "Deshabilitado"}</span>
                                                    </label>
                                                    <button onClick={() => activarLocal()} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Aplicar cambios</button>
                                                    <button onClick={() => setShowOptions(false)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
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
            }
        </div>
    );
}

export default LocalesList;