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
                console.log(response)
            });
            setApiCalled(true);
        }
    }, [apiCalled]);


    return (
        <div>
            <h2 class="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Lista de Locales</h2>
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
    );
}

export default LocalesList;