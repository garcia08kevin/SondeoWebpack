import { Route, useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getProductsById, ProductActivation } from "../../Services/ProductService";
import { toast } from 'react-toastify';

function ProductDetail() {
    const [apiCalled, setApiCalled] = useState(false);
    const [productData, setProductData] = useState([]);
    const [categoria, setCategoria] = useState();
    const [marca, setMarca] = useState();
    const [propiedades, setPropiedades] = useState();
    const [activado, setActivado] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { id } = useParams()

    useEffect(() => {
        if (!apiCalled) {
            getProductsById(id).then(response => {
                setProductData(response);
                setApiCalled(true);
                setActivado(response.activado)
                setCategoria(response.categoria.nombreCategoria)
                setMarca(response.marca.nombreMarca)
                setPropiedades(response.propiedades.nombrePropiedades)
            });
        }
    }, [apiCalled]);

    function handleToggle() {
        setActivado(!activado);
        console.log('isEnabled:', !activado);
    }

    function eliminarProducto() {
        DeleteUser(id).then(response => {
            window.location.reload()

        });
    }

    function activarProducto() {
        ProductActivation(id).then(response => {
            if (response.result) {
                toast.success(response.contenido);
            }
        });
    }

    return (
        <div>
            <nav class="flex  mt-2" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <a href="/controlProduct" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                            Lista de Productos
                        </a>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">
                            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Detalles del producto</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <section class="text-gray-700 body-font overflow-hidden bg-white">
                <div class="container py-10 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg" />
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 class="text-sm uppercase title-font text-gray-500 tracking-widest">Nombre de la Marca: {marca}</h2>
                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{categoria} {productData.nombre}</h1>
                            <p class="leading-relaxed">{categoria} {productData.nombre} de la marca {marca}</p>
                            <p>{propiedades}</p>
                            <div class="flex mt-1 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                            <div class="flex">
                                <label className="title-fontfont-medium text-2xl text-gray-900 relative inline-flex items-center mb-4 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value=""
                                        className="sr-only peer"
                                        checked={activado}
                                        onChange={handleToggle}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{activado ? "Producto Activado" : "Producto desactivado"}</span>
                                </label>
                                <button onClick={() => setShowModal(true)} class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Eliminar</button>
                            </div>
                            <div class="flex justify-center">
                                <Link to={`/controlProduct`}>
                                    <button onClick={() => activarProducto()} type="submit" class="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Aplicar cambios</button>
                                </Link>
                            </div>
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
                                                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Estas seguro que deseas eliminar el producto {categoria} {productData.nombre}</h3>
                                                        <Link to={`/controlUser`}>
                                                            <button onClick={() => eliminarProducto()} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                                Si, eliminar
                                                            </button>
                                                        </Link>

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
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductDetail;