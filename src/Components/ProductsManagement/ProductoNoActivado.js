import { useState, useEffect } from "react";
import { Route, useParams, Link } from "react-router-dom"
import { GetAllUserByRole } from "../../Services/UserService";
import { getProductosNoActivados, getCategorias } from "../../Services/ProductService";
import MoreVertIcon from '@mui/icons-material/MoreVert';


function ProductoNoActivado() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [apiCalled, setApiCalled] = useState(false);
    const [callProductos, setCallProductos] = useState(false);
    const [encuestadores, setEncuestadores] = useState([]);
    const [userSelect, setUserSelect] = useState(1);
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [categoria, setCategoria] = useState([]);
    const [shoAll, setShowAll] = useState(true);
    const [products, setProducts] = useState([]);

    const itemsPerPage = 10;

    useEffect(() => {
        if (!apiCalled) {
            GetAllUserByRole("Encuestador").then(response => {
                setEncuestadores(response);                
            });
            getCategorias().then(response => {
                setCategoria(response);
            });
            setApiCalled(true);
        }
    }, [apiCalled]);

    useEffect(() => {
        if (!callProductos) {
            getProductosNoActivados().then(response => {
                setProducts(response);
                console.log(response);
                setCallProductos(true);
            });
        }
    }, [callProductos]);

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
            <h2 class="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Productos registrados y no activados</h2>
            <div class="flex items-center justify-between py-4 bg-white dark:bg-gray-800">

                <div>
                    <select value={userSelect}  onChange={(e) => setUserSelect(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={"Encuestadores"} >Encuestadores</option>
                        {encuestadores.map((val, key) => {                            
                            return (
                                <option key={val.id} value={val.userName}>{val.userName}</option>
                            )})}
                    </select>
                </div>
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} id="table-search-users" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
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
                                Registrado Por
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.filter((product) => (product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || product.categoria.nombreCategoria.toLowerCase().includes(searchQuery.toLowerCase()) || product.marca.nombreMarca.toLowerCase().includes(searchQuery.toLowerCase())) &&
                            ((filtroCategoria === '' || filtroCategoria === 'Categoria') ? true : (product.categoria.nombreCategoria === filtroCategoria)) &&
                            ((userSelect === 'Encuestadores' || userSelect === 1) ? true : (product.user.userName === userSelect))
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
                                            {val.syncId}
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
    );
}

export default ProductoNoActivado;