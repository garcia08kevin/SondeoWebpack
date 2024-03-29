import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getProducts, getCategorias } from "../../Services/ProductService";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateProduct from "./CreateProduct";
import { ManagePropiedades } from "./ManagePropiedades";
import { ManageMarca } from "./ManageMarca";
import { ManageCategoria } from "./ManageCategoria";
import { toast } from 'react-toastify';
import Barcode from 'react-barcode';
import images from '../../../public/icons/producto.png'
import OptionProduct from "./OptionProduct";

function PoductList() {
    const [products, setProducts] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPropiedades, setShowPropiedades] = useState(false);
    const [showMarcas, setShowMarcas] = useState(false);
    const [showCategorias, setShowCategorias] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [seleccionado, setSeleccionado] = useState();
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 10;

    const changeHandler = e => {
        if (e.result) {
            setLoading(true);
            setMostrarOpciones(false);
            setShowCategorias(false);
            setShowMarcas(false);
            setShowPropiedades(false);
            setShowModal(false);
            toast.success(`${e.respose}`);
            getProducts().then(response => {
                setProducts(response);
                setLoading(false);
            });
        } else if (!e.result) {
            toast.error(`${e.respose}`);
        }
    }

    const opciones = event => {        
        setSeleccionado(event.currentTarget.id);
        setMostrarOpciones(true)
    };

    useEffect(() => {
        if (!apiCalled) {
            getProducts().then(response => {
                setProducts(response);
                setLoading(false);
            });
            getCategorias().then(response => {
                setCategoria(response);
            });
            setApiCalled(true);
        }
    }, [apiCalled]);

    const handleOpen = () => {
        setShowOptions(!showOptions);
    };

    const handleModalOpen = (op) => {
        if (op === 0) {
            setShowModal(!showModal);
            setShowOptions(false);
        } else if (op === 1) {
            setShowPropiedades(!showPropiedades);
            setShowOptions(false);
        } else if (op === 2) {
            setShowMarcas(!showMarcas);
            setShowOptions(false);
        } else if (op === 3) {
            setShowCategorias(!showCategorias);
            setShowOptions(false);
        }else if (op === 4) {
            setMostrarOpciones(!mostrarOpciones);
            setShowOptions(false);
            setSeleccionado(null);
        }
    };

    function handlePageClick(event, pageNumber) {
        event.preventDefault();
        setCurrentPage(pageNumber);
    }

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <h2 class="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Lista de Productos</h2>
            <div class=" flex items-center justify-between py-4 bg-white dark:bg-gray-800">
                <div>
                    <button onClick={() => handleOpen()} id="dropdownActionButton" data-dropdown-toggle="dropdownAction" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span class="sr-only">Action button</span>
                        Opciones
                        <svg class="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>

                    {showOptions ? <div class="fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <a href="#" onClick={() => handleModalOpen(0)} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Crear Producto</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => handleModalOpen(2)} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Administrar Marcas</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => handleModalOpen(3)} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Administrar Categorias</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => handleModalOpen(1)} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Administrar Propiedades</a>
                            </li>
                        </ul>
                    </div> : null}

                </div>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} id="table-search-users" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
            </div>
            {loading ? (
                <div role="status" class="translate-x-1/2 translate-y-1/2 top-2/4 left-1/2">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span class="sr-only">Loading...</span>
                </div>
            ) :
                <div class="relative overflow-x-auto table-fixed m-4">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="text-center px-6 py-3">
                                    Imagen
                                </th>
                                <th scope="col" class="text-center px-6 py-3">
                                    Codigo de barras
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} class=" uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <option>Informacion del producto</option>
                                        {categoria.map((val, key) => {
                                            return (
                                                <option key={val.id} value={val.nombreCategoria} >{val.nombreCategoria}</option>
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
                            {products.filter((product) => (product.barCode.toString().toLowerCase().includes(searchQuery.toLowerCase()) || product.categoria.nombreCategoria.toLowerCase().includes(searchQuery.toLowerCase()) || product.marca.nombreMarca.toLowerCase().includes(searchQuery.toLowerCase())) &&
                                ((filtroCategoria === '' || filtroCategoria === 'Informacion del producto') ? true : (product.categoria.nombreCategoria === filtroCategoria))
                            ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                .map((val, key) => {
                                    return (
                                        <tr key={val.barCode} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td class="w-64 p-4">
                                                {<img class="object-fill" src={val.imagen == null ? images : `data:image/jpeg;base64,${val.imagen}`} alt="Product" />}
                                            </td>
                                            <td class="px-6 py-4">
                                                <Barcode value={`${val.barCode}`} format="EAN13" />
                                            </td>
                                            <td class="px-6 py-4">
                                                <p><span class="font-bold">Nombre del producto:</span> {val.nombre}</p>
                                                <p><span class="font-bold">Marca:</span> {val.marca.nombreMarca}</p>
                                                <p><span class="font-bold">Categoria:</span> {val.categoria.nombreCategoria}</p>
                                                <p><span class="font-bold">Propiedad:</span> {val.propiedades.nombrePropiedades}</p>
                                            </td>
                                            <td class="px-6 py-4">
                                                <button id={val.barCode} onClick={opciones} class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-2 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
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
                                            <button onClick={() => handleModalOpen(0)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                            <div class="p-5 text-center">
                                                <CreateProduct respuesta={changeHandler}/>

                                                <button onClick={() => handleModalOpen(0)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {showPropiedades ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div class="">
                                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            <button onClick={() => handleModalOpen(1)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                            <div class="p-5 text-center">
                                                <ManagePropiedades respuesta={changeHandler} />

                                                <button onClick={() => handleModalOpen(1)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {showMarcas ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div class="">
                                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            <button onClick={() => handleModalOpen(2)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                            <div class="p-5 text-center">
                                                <ManageMarca respuesta={changeHandler} />
                                                <button onClick={() => handleModalOpen(2)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {showCategorias ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div class="">
                                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            <button onClick={() => handleModalOpen(3)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                            <div class="p-5 text-center">
                                                <ManageCategoria respuesta={changeHandler} />
                                                <button onClick={() => handleModalOpen(3)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
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
                                            <button onClick={() => handleModalOpen(4)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                            <div class="p-5 text-center">                                                
                                                <OptionProduct id={seleccionado} respuesta={changeHandler}/>
                                                <button onClick={() => handleModalOpen(4)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
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
            <nav class=" flex m-3 justify-center">
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
    )
}

export default PoductList;