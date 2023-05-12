import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getProducts, getCategorias } from "../../Services/ProductService";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateProduct from "./CreateProduct";

function PoductList() {
    const [products, setProducts] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);
    const [categoriasLLamada, setCategoriasLLamada] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {
        if (!apiCalled) {
            getProducts().then(response => {
                setProducts(response);
                setApiCalled(true);
            });
        }
    }, [apiCalled]);

    useEffect(() => {
        if (!categoriasLLamada) {
            getCategorias().then(response => {
                setCategoria(response);
                setCategoriasLLamada(true);
            });
        }
    }, [categoriasLLamada]);

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
            <div class="grid grid-cols-7">
                <form class="col-span-6">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative m-2">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} class="w-full block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                </form>
                <button onClick={() => setShowModal(true)} type="button" class="place-self-center text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-4">Registrar Usuario</button>
            </div>
            <div class="relative overflow-x-auto table-fixed m-4">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} id="small" class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <option>Categoria</option>
                                    {categoria.map((val, key) => {
                                        return (
                                            <option key={val.id} value={val.nombreCategoria} >{val.nombreCategoria}</option>
                                        )
                                    })}
                                </select>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Marca
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Propiedades
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Nombre del producto
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} id="small" class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <option >Estado</option>
                                    <option value={true} >Activado</option>
                                    <option value={false} >Desactivado</option>
                                </select>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.filter((product) => product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) &&
                            ((filtroCategoria === '' || filtroCategoria === 'Categoria') ? true : (product.categoria.nombreCategoria === filtroCategoria)) &&
                            (filtroEstado === '' || filtroEstado === 'Estado' ? true : (product.activado.toString() === filtroEstado))
                        ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((val, key) => {
                                return (
                                    <tr key={val.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td class="px-6 py-4">
                                            {val.categoria.nombreCategoria}
                                        </td>
                                        <td class="px-6 py-4">
                                            {val.marca.nombreMarca}
                                        </td>
                                        <td class="px-6 py-4">
                                            {val.propiedades.nombrePropiedades}
                                        </td>
                                        <td class="px-6 py-4">
                                            {val.nombre}
                                        </td>
                                        <td class="px-6 py-4">
                                            {val.activado == true ? <div class=" p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
                                                <div>
                                                    <span class="font-medium text-center ">Activado</span>
                                                </div>
                                            </div> :
                                                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                                                    <div>
                                                        <span class="font-medium text-center ">No Activado</span>
                                                    </div>
                                                </div>}
                                        </td>
                                        <td class="px-6 py-4">
                                            <Link to={`/controlProduct/productDetail/${val.id}`}>
                                                <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-2 py-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                                    <MoreVertIcon />
                                                </button>
                                            </Link>
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
                                            <CreateProduct />

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