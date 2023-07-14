import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getCiudades, getLocales, getCanales } from "../../Services/EncuestaService";

function LocalesList() {
    const [ciudades, setCiudades] = useState([]);
    const [locales, setLocales] = useState([]);
    const [canales, setCanales] = useState([]);
    const [filtroCanal, setFiltroCanal] = useState('');
    const [filtroCiudad, setFiltroCiudad] = useState('');
    const [apiCalled, setApiCalled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!apiCalled) {
            getCiudades().then(response => {
                setCiudades(response);
            });
            getCanales().then(response => {
                setCanales(response);
            });
            getLocales(0).then(response => {
                setLocales(response);
                setLoading(false);
            });
            setApiCalled(true);
        }
    }, [apiCalled]);


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
                                        Opciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {locales.filter((local) =>
                                    (filtroCanal === '' || filtroCanal === 'Canal' ? true : (local.canal.nombreCanal === filtroCanal)) &&
                                    (filtroCiudad === '' || filtroCiudad === 'Cuidades' ? true : (local.ciudad.nombreCiudad === filtroCiudad))
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
                                                    {val.ciudad.nombreCiudad}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {val.canal.nombreCanal}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <Link to={`/controlProjects/localDetail/${val.id}`}>
                                                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Detalle</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
}

export default LocalesList;