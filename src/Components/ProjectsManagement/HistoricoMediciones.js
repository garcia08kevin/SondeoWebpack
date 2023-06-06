import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getCiudades, historico } from "../../Services/EncuestaService";

function HistoricoMediciones() {
    const [ciudades, setCiudades] = useState([]);
    const [mediciones, setMediciones] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);
    const [openAccordions, setOpenAccordions] = useState([]);

    useEffect(() => {
        if (!apiCalled) {
            getCiudades().then(response => {
                setCiudades(response);
            });
            setApiCalled(true);
        }
    }, [apiCalled]);

    function mostrarMediciones(id) {
        if (id != 0) {
            historico(id).then(response => {
                setMediciones(response);
                console.log(response)
            });
        }
        setMediciones([])
    }

    const toggleAccordion = (id) => {
        if (openAccordions.includes(id)) {
            setOpenAccordions(openAccordions.filter((accordionId) => accordionId !== id));
        } else {
            setOpenAccordions([...openAccordions, id]);
        }
    };

    function fechaFomato(fecha) {
        const dateObj = new Date(fecha);

        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
        return formattedDate;
    }


    return (
        <div>
            <h2 class="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Historico Mediciones</h2>
            <div class="py-2">
                <select onChange={(e) => mostrarMediciones(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue value="0" >Cuidades</option>
                    {ciudades.map((val, key) => {
                        return (
                            <option key={val.id} value={val.id}>{val.nombreCiudad}</option>
                        )
                    })}
                </select>
            </div>

            {mediciones.map((val, key) => {
                return (
                    <div key={val.id} >
                        <li class="list-none" >
                            <button type="button" onClick={() => toggleAccordion(val.id)} class=" flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
                                <span>{val.nombreMedicion} {val.activa ? <p class="flex items-center"><span class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span> En curso</p> :
                                    <p class="flex items-center"><span class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></span>Terminada</p>}</span>
                                <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </li>
                        <ul id="accordion-collapse-body-1" class={openAccordions.includes(val.id) ? "block" : "hidden"} aria-labelledby="accordion-collapse-heading-1">
                            <div class="flex flex-row p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Nombre del Local
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Fecha de Inicio
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Fecha de Cierre
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Dias trabajados
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Encuestador Asignado
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Opciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {val.encuestas.map((val, key) => {
                                            return (
                                                <tr key={val.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td value={val.id} class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <a href={`http://localhost:2525/controlProjects/localDetail/${val.localId}`} class="text-blue-600 dark:text-blue-500 hover:underline">{val.local.nombre}</a>
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {fechaFomato(val.fechaInicio)}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {val.fechaCierre == null ? "En curso" : fechaFomato(val.fechaCierre)}
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        {val.diasTrabajados}
                                                    </td>
                                                    <td class="px-6 py-4">

                                                        <a href={`http://localhost:2525/controlUser/userDetail/${val.customUserId}`} class="text-blue-600 dark:text-blue-500 hover:underline">{val.customUser.name} {val.customUser.lastname}</a>
                                                    </td>
                                                    <td class="px-6 py-4">
                                                        <Link to={`/controlProjects/encuestaDetail/${val.id}`}>
                                                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Detalle</button>
                                                        </Link>
                                                    </td>
                                                </tr>

                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </ul>
                    </div>
                )
            })}
        </div>
    );
}

export default HistoricoMediciones;