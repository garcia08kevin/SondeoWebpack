import { useEffect, useState } from "react";
import { getMarcas, getCategorias, getPropiedades, crearProducto } from "../../Services/ProductService";
import axios from "axios";

function CreateProduct() {
    const [apiCalled, setApiCalled] = useState(false);
    const [activado, setActivado] = useState(false);
    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [propiedades, setPropiedades] = useState([]);
    const [nombre, setNombre] = useState();
    const [categoriaSelect, setCategoriaSelect] = useState(1);
    const [marcaSelect, setMarcaSelect] = useState(1);
    const [propiedadSelect, setPropiedadSelect] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);

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
            setApiCalled(true);
        }
    }, [apiCalled]);

    function handleToggle() {
        setActivado(!activado);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const CurrentUserString = localStorage.getItem('currentUser');
        const CurrentUser = JSON.parse(CurrentUserString);
        let  data = new FormData();
        data.append('Nombre', nombre);
        data.append('imagen', selectedFile);
        data.append('activado', activado);
        data.append('categoriaId', categoriaSelect);
        data.append('marcaId', marcaSelect);
        data.append('propiedadesId', propiedadSelect);
        data.append('UserEmail', CurrentUser.email);

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post('https://localhost:7125/api/ProductosAdmin', data, config).then(response => {
            console.log(response);
        })
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file);
    };

    return (
        <div class="p-6 px-20">
            <h2 class="text-2xl font-bold dark:text-white">Agregar Producto</h2>
            <div>
                <form onSubmit={handleSubmit} class="grid grid-cols-2 content-center gap-4 pt-5">
                    <div class="pt-3">
                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del producto</label>
                        <input onChange={e => setNombre(e.target.value)} type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label class="self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
                        <select onChange={(e) => setCategoriaSelect(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                        <select onChange={(e) => setMarcaSelect(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                        <select onChange={(e) => setPropiedadSelect(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                                value=""
                                className="sr-only peer"
                                checked={activado}
                                onChange={handleToggle}
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{activado ? "Activado" : " Desactivado"}</span>
                        </label>
                    </div>
                    <div>

                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Imagen del producto</label>
                        <input onChange={handleFileChange} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

                    </div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Crear Producto</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct;