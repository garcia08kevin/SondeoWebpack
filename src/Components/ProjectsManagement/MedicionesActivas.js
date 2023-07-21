import { useEffect, useState, } from "react";
import { getCiudades, crearMedicion, getMediciones, cerrarMedicion } from "../../Services/EncuestaService";
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';


function MedicionesActivas() {
    const [showCreate, setShowCreate] = useState(false);
    const [ciudades, setCiudades] = useState([]);
    const [ciudadSelect, setCuidadSelect] = useState();
    const [mediciones, setMediciones] = useState([]);
    const [openAccordions, setOpenAccordions] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [medicionSelected, setMedicionSelected] = useState();

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
            setLoading(true);
            if (response.result) {
                getMediciones().then(response => {
                    setMediciones(response);
                    setLoading(false);
                });
                toast.success(`${response.respose}`);
            } else if (!response.result) {
                toast.error(`${response.respose}`);
            }
        });
    }

    function Cerrar() {
        cerrarMedicion(medicionSelected).then(response => {
            if (response.result) {
                setLoading(true);
                getMediciones().then(response => {
                    console.log(response)
                    setMediciones(response);
                    setLoading(false);
                });
                setShowModal(false)
                toast.success(`${response.respose}`);
            } else if (!response.result) {
                toast.error(`${response.respose}`);
            }
        });
    }

    const toggleAccordion = (id) => {
        if (openAccordions.includes(id)) {
            setOpenAccordions([]);
        } else {
            setOpenAccordions([id]);
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
                            <select onChange={(e) => setCuidadSelect(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 mr-2 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option defaultValue value="0" >Cuidades</option>
                                {ciudades.map((val, key) => {
                                    return (
                                        <option key={val.id} value={val.id}>{val.nombreCiudad}</option>
                                    )
                                })}
                            </select>
                            <div class="pl-2 pt-2 pb-2">
                                <button type="button" onClick={() => Agregar()} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Agregar</button>
                                <button type="button" onClick={() => setShowCreate(false)} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar</button>
                            </div>
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
                                    <div class="flex flex-col p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">

                                        {val.encuestas.length > 0 ?
                                            <div>
                                                <div>
                                                    <button type="button" onClick={() => { setMedicionSelected(val.id); setShowModal(true) }} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cerrar la medicion seleccionada</button>
                                                    <Link to={`/descargarMedicion/${val.id}`}>
                                                        <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Descargar datos</button>
                                                    </Link>
                                                </div>
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
                                                                        <a href={`/controlProjects/localDetail/${val.localId}`} class="text-blue-600 dark:text-blue-500 hover:underline">{val.local.nombre}</a>
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
                                                                        {val.customUser.name} {val.customUser.lastname}
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
                                            </div> : <h2 class="pt-2 text-2xl font-bold dark:text-white">Esta medicion aun no cuenta con encuestas asignadas</h2>
                                        }
                                    </div>
                                </ul>
                            </div>
                        )
                    })}
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
                                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Estas seguro que deseas dar por terminada esta medicion</h3>
                                                <button onClick={() => Cerrar()} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
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
            }
        </div>
    );
}

export default MedicionesActivas;