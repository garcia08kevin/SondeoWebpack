import { Route, useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getMarcas, getCategorias, getPropiedades,actualizarProducto, getProductsById } from "../../Services/ProductService";

function UpdateProduct() {
    const { id } = useParams()

    const [apiCalled, setApiCalled] = useState(false);
    const [idProducto, setidProducto] = useState([]);
    const [activado, setActivado] = useState(false);
    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [propiedades, setPropiedades] = useState([]);
    const [nombre, setNombre] = useState("");
    const [categoriaSelect, setCategoriaSelect] = useState(1);
    const [marcaSelect, setMarcaSelect] = useState(1);
    const [propiedadSelect, setPropiedadSelect] = useState(1);

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
                setidProducto(response.id)
                setNombre(response.nombre);
                setActivado(response.activado)
                setCategoriaSelect(response.categoriaId)
                setMarcaSelect(response.marcaId)
                setPropiedadSelect(response.propiedadesId)           
            });            
            setApiCalled(true);
        }
    }, [apiCalled]);

    console.log(categoriaSelect);
    function handleToggle() {
        setActivado(!activado);
        console.log('isEnabled:', !activado);
        console.log(marcaSelect)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(categoriaSelect)
        const CurrentUserString = localStorage.getItem('currentUser');
        const CurrentUser = JSON.parse(CurrentUserString);
        const user = await actualizarProducto({
            id: idProducto,
            nombre: nombre,
            activado: activado,
            categoriaId: categoriaSelect,
            marcaId: marcaSelect,
            propiedadesId : propiedadSelect,
            customUserId: CurrentUser.id
        },id);
        console.log(user.result)
    }

    return (
        <div class="p-6 px-20">
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
                        <option>Hola</option>
                            {categorias.map((val, key) => {
                                return (
                                    <option key={val.id} value={val.id}>{val.nombreCategoria}</option>
                                )}
                            )}
                        </select>
                    </div>
                    <div>
                        <label class="self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Marcas</label>
                        <select onChange={(e) => setMarcaSelect(e.target.value)} value={marcaSelect} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {marcas.map((val, key) => {
                                return (
                                    <option key={val.id} value={val.id}>{val.nombreMarca}</option>
                                )}
                            )}
                        </select>
                    </div>
                    <div>
                        <label class="self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Propiedades</label>
                        <select onChange={(e) => setPropiedadSelect(e.target.value)} value={propiedadSelect} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {propiedades.map((val, key) => {
                                return (
                                    <option key={val.id} value={val.id}>{val.nombrePropiedades}</option>
                                )}
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
    )
}

export default UpdateProduct;