import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { getProducts, getCategorias, getProductsById } from "../../Services/ProductService";
import images from '../../../public/icons/producto.png'

function ReplaceProduct() {
    const [products, setProducts] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);
    const [categoriasLLamada, setCategoriasLLamada] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [showConfirmacion, setShowConfirmacion] = useState(false);
    const [showProductoDetail, setShowProductoDetail] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriaDetail, setCategoriaDetail] = useState();
    const [marca, setMarca] = useState();
    const [nombreProducto, setNombreProducto] = useState();
    const [propiedades, setPropiedades] = useState();
    const [imagen, setImagen] = useState();
    const { id } = useParams()

    const itemsPerPage = 10;

    useEffect(() => {
        if (!apiCalled) {
            getProducts().then(response => {
                setProducts(response);
            });
            getProductsById(id).then(response => {
                setNombreProducto(response.nombre);
                setCategoriaDetail(response.categoria.nombreCategoria)
                setMarca(response.marca.nombreMarca)
                setPropiedades(response.propiedades.nombrePropiedades)
                setImagen(response.imagen)
            });
            setApiCalled(true);
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

    const handleModalOpen = (op) => {
        if (op === 0) {
            setShowModal(!showModal);
        } else if (op === 1) {
            setShowConfirmacion(!showConfirmacion);
        } else if (op === 2) {
            setShowProductoDetail(!showProductoDetail);
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
            <h2 class="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Selecciona el producto por el que deseas remplazar</h2>
            <div class="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} id="table-search-users" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="col-span-4 relative overflow-x-auto table-fixed m-4">
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
                            {products.filter((product) => (product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || product.categoria.nombreCategoria.toLowerCase().includes(searchQuery.toLowerCase()) || product.marca.nombreMarca.toLowerCase().includes(searchQuery.toLowerCase())) &&
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
                                                {val.activado == true ? <div class="flex items-center">
                                                    <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Activado
                                                </div> : <div class="flex items-center">
                                                    <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Desactivado
                                                </div>}
                                            </td>
                                            <td class="px-6 py-4">
                                                <button onClick={() => setShowConfirmacion(true)} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Remplazar</button>

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
                                                <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Seleccionar el producto por el que deseeas remplazar</h3>
                                                <button onClick={() => handleModalOpen(0)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Aceptar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {showConfirmacion ? (
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
                                                <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Estas seguro que deseas remplazar por este producto</h3>
                                                <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Aceptar</button>
                                                <button onClick={() => handleModalOpen(1)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                </div>
                <div class="pt-4">
                    <button onClick={() => handleModalOpen(2)} type="button" class="text-xs text-gray-700 uppercase flex items-center justify-between w-full p-3 font-medium text-left text-gray-500 border border-gray-200  dark:focus:ring-blue-800 hover:bg-blue-100">
                        <span>Datos Producto</span>
                        <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    {showProductoDetail ? (
                        <>
                            <div id="accordion-color-body-2" aria-labelledby="accordion-color-heading-2">
                                <div class="p-5  border-gray-200 ">
                                    <ul>
                                        <div class="pb-2">
                                            <li class="text-blue-600">Marca:</li>
                                            <span class="text-gray-700">{marca}</span>
                                        </div>
                                        <div class="py-2">
                                            <li class="text-blue-600">Categoria:</li>
                                            <span class="text-gray-700">{categoriaDetail}</span>
                                        </div>
                                        <div class="py-2">
                                            <li class="text-blue-600">Propiedades:</li>
                                            <span class="text-gray-700">{propiedades}</span>
                                        </div>
                                        <div class="py-2">
                                            <li class="text-blue-600">Nombre:</li>
                                            <span class="text-gray-700">{nombreProducto}</span>
                                        </div>
                                        <div class="py-2">
                                            <li class="text-blue-600">Imagen:</li>
                                            <img class="object-scale-down" src={imagen == null ? images : `data:image/jpeg;base64,${imagen}`} alt="Product" />
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : null}
                </div>
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

export default ReplaceProduct;