import { useEffect, useState } from "react";
import { getCiudades, crearMedicion, getMediciones } from "../../Services/EncuestaService";
import { Link } from "react-router-dom"

function MedicionesActivas() {
    const [showCreate, setShowCreate] = useState(false);
    const [ciudades, setCiudades] = useState([]);
    const [ciudadSelect, setCuidadSelect] = useState();
    const [mediciones, setMediciones] = useState([]);
    const [openAccordions, setOpenAccordions] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);
    const [showMessage, setShowMessage] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!apiCalled) {
            getCiudades().then(response => {
                setCiudades(response);
            });
            getMediciones().then(response => {
                setMediciones(response);
                setLoading(false);
            });
            setApiCalled(true);
        }
    }, [apiCalled]);

    function Agregar() {
        crearMedicion(ciudadSelect).then(response => {
            console.log(response)
            setShowMessage(response);
        });
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
            {loading ? (
                <div role="status" class="py-10 translate-x-1/2">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span class="sr-only">Loading...</span>
                </div>
            ) :
                <div>
                    <h2 class="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Mediciones Activas</h2>
                    {!showCreate ? (<button type="button" onClick={() => setShowCreate(true)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Crear una nueva Medicion</button>) : null}
                    {showCreate ? (

                        <div class="flex">
                            <select onChange={(e) => setCuidadSelect(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue value="0" >Cuidades</option>
                                {ciudades.map((val, key) => {
                                    return (
                                        <option key={val.id} value={val.id}>{val.nombreCiudad}</option>
                                    )
                                })}
                            </select>
                            <div class="pl-2 pt-2">
                                <button type="button" onClick={() => Agregar()} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Agregar</button>
                                <button type="button" onClick={() => {
                                    setShowCreate(false)
                                    setShowMessage([])
                                }} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar</button>
                            </div>
                            {showMessage != [] ?
                                <div class="col-span-2 self-center ">
                                    {showMessage.result && showMessage != [] ? (
                                        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                            {showMessage.respose}
                                        </div>
                                    ) : <div class="p-4 mx-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        {showMessage.respose}
                                    </div>}
                                </div>
                                : null}
                        </div>
                    ) : null}
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
            }
        </div>
    );
}

export default MedicionesActivas;