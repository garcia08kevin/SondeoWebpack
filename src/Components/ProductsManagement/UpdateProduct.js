import { Route, useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getMarcas, getCategorias, getPropiedades, actualizarProducto, getProductsById } from "../../Services/ProductService";

const UpdateProduct = ({ id, respuesta }) => {

    const [apiCalled, setApiCalled] = useState(false);
    const [idProducto, setidProducto] = useState([]);
    const [activado, setActivado] = useState(false);
    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [propiedades, setPropiedades] = useState([]);
    const [nombre, setNombre] = useState("");
    const [categoriaSelect, setCategoriaSelect] = useState();
    const [marcaSelect, setMarcaSelect] = useState();
    const [propiedadSelect, setPropiedadSelect] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!apiCalled) {
            getMarcas().then(response => {
                setMarcas(response);
            });
            getCategorias().then(response => {
                setCategorias(response);
            });
            getPropiedades().then(response => {
                setPropiedades(response);
            });
            getProductsById(id).then(response => {
                setidProducto(response.barCode)
                setNombre(response.nombre);
                setActivado(response.activado)
                setCategoriaSelect(response.categoriaId)
                setMarcaSelect(response.marcaId)
                setPropiedadSelect(response.propiedadesId)
                setLoading(false)
            });
            setApiCalled(true);
        }
    }, [apiCalled]);

    console.log(categoriaSelect);
    function handleToggle() {
        setActivado(!activado);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const user = await actualizarProducto({
            barCode: idProducto,
            nombre: nombre,
            activado: activado,
            categoriaId: categoriaSelect,
            marcaId: marcaSelect,
            propiedadesId: propiedadSelect
        }, id);
        respuesta(user)
    }

    return (
        <div class="p-6 px-20">
            {loading ? (
                <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span class="sr-only">Loading...</span>
                </div>
            ) :
            <div>
                <h2 class="text-2xl font-bold dark:text-white">Actualizar Producto</h2>
                <div>
                    <form onSubmit={handleSubmit} class="grid grid-cols-2 content-center gap-4 pt-5">
                        <div class="pt-3">
                            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del producto</label>
                            <input onChange={e => setNombre(e.target.value)} value={nombre} type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div>
                            <label class="self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
                            <select onChange={(e) => setCategoriaSelect(e.target.value)} value={categoriaSelect} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {categorias.map((val, key) => {
                                    return (
                                        <option key={val.id} value={val.id}>{val.nombreCategoria}</option>
                                    )
                                }
                                )}
                            </select>
                        </div>
                        <div>
                            <label class="self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Marcas</label>
                            <select onChange={(e) => setMarcaSelect(e.target.value)} value={marcaSelect} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {marcas.map((val, key) => {
                                    return (
                                        <option key={val.id} value={val.id}>{val.nombreMarca}</option>
                                    )
                                }
                                )}
                            </select>
                        </div>
                        <div>
                            <label class="self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Propiedades</label>
                            <select onChange={(e) => setPropiedadSelect(e.target.value)} value={propiedadSelect} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {propiedades.map((val, key) => {
                                    return (
                                        <option key={val.id} value={val.id}>{val.nombrePropiedades}</option>
                                    )
                                }
                                )}
                            </select>
                        </div>
                        <div class="pt-2 flex self-center">
                            <label className="relative inline-flex items-center mb-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={activado}
                                    className="sr-only peer"
                                    checked={activado}
                                    onChange={handleToggle}
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{activado ? "Activado" : " Desactivado"}</span>
                            </label>
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guardar Cambios</button>
                    </form>
                </div>
            </div>
            }
        </div>
    )
}

export default UpdateProduct;