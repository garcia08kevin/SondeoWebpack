import { useEffect, useState, useRef } from "react";
import { getMarcas, getCategorias, getPropiedades } from "../../Services/ProductService";
import axios from "axios";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Webcam from "react-webcam";
import Quagga from 'quagga';
import { getToken } from "../../Services/UserService";

const CreateProduct = ({ respuesta }) => {
    const [apiCalled, setApiCalled] = useState(false);
    const [marcas, setMarcas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [propiedades, setPropiedades] = useState([]);
    const [nombre, setNombre] = useState();
    const [categoriaSelect, setCategoriaSelect] = useState(1);
    const [marcaSelect, setMarcaSelect] = useState(1);
    const [propiedadSelect, setPropiedadSelect] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [tomarFoto, setTomarFoto] = useState(false);
    const [codeBar, setCodeBar] = useState("");
    const [imagen, setImagen] = useState(null);
    const [preliminar, setPreliminar] = useState(false);
    const [preliminarImagen, setPreliminarImagen] = useState(false);
    const webcamRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);


    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "environment"
    };

    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${getToken()}`
        },
        withCredentials: true,
        credentials: 'same-origin',
    }

    

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

    const handleSubmit = async e => {
        e.preventDefault();
        let data = new FormData();
        data.append('Nombre', nombre);
        data.append('imagen', selectedImage);
        data.append('activado', true);
        data.append('categoriaId', categoriaSelect);
        data.append('marcaId', marcaSelect);
        data.append('propiedadesId', propiedadSelect);
        data.append('barCode', codeBar);

        axios.post(`${process.env.API_URL}/api/ManageProductos/Productos`, data, config).then(response => {
            respuesta(response.data);
        })
    }

    const ReadBarCode = async () => {
        const response = await fetch(imagen);
        const blob = await response.blob();
        const archivo = new File([blob], "CodigoImagen", { type: blob.type });
        if (archivo) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const imageSrc = fileReader.result;
                Quagga.decodeSingle(
                    {
                        src: imageSrc,
                        numOfWorkers: 0,
                        decoder: {
                            readers: ['ean_reader'],
                        },
                    },
                    (result) => {
                        setShowCreate(false)
                        setTomarFoto(false)
                        setPreliminar(false)
                        if (result && result.codeResult) {
                            setCodeBar(result.codeResult.code);
                        } else {
                            setCodeBar("No detectado");
                        }
                    }
                );
            };
            fileReader.readAsDataURL(archivo);
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setPreliminarImagen(true)
        const objectUrl = URL.createObjectURL(file)
        setImagen(objectUrl)
        setSelectedImage(file);
    };

    const guardarFotoCodigo = (event) => {
        const file = event.target.files[0]
        const objectUrl = URL.createObjectURL(file)
        setImagen(objectUrl)
        setSelectedFile(file);
        setPreliminar(true)
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
                    <div class="">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Codigo de barras</label>
                        {codeBar != "" ? (
                            <div class="grid grid-cols-3 gap-2">
                                <input type="number" onChange={e => setCodeBar(e.target.value)} value={codeBar} id="small-input" class="col-span-2 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <button type="button" onClick={() => {
                                    setShowCreate(false)
                                    setTomarFoto(false)
                                    setImagen(null)
                                    setCodeBar("")
                                }} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><HighlightOffIcon /></button>
                            </div>
                        ) : null}
                        {!showCreate && codeBar === "" ? (<button type="button" onClick={() => setShowCreate(true)} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Agregar Codigo de barras</button>) : null}
                        {showCreate ? (
                            <div class="pt-2 flex justify-center self-center">
                                {!tomarFoto ? (<button type="button" onClick={() => setTomarFoto(true)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Tomar Foto</button>) : null}

                                {tomarFoto ? (
                                    <>
                                        <div
                                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                        >
                                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                <div class="">
                                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                        <button onClick={() => setTomarFoto(false)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                            <span class="sr-only">Close modal</span>
                                                        </button>
                                                        <div class="p-5 text-center">
                                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Codigo de barras</label>
                                                            <div class="flex flex-col m-2">
                                                                <Webcam
                                                                    audio={false}
                                                                    height={videoConstraints.height}
                                                                    screenshotFormat="image/jpeg"
                                                                    width={videoConstraints.width}
                                                                    videoConstraints={videoConstraints}
                                                                    ref={webcamRef}
                                                                >
                                                                    {({ getScreenshot }) => (
                                                                        <button type="button" class="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => {
                                                                            setTomarFoto(false)
                                                                            setImagen(getScreenshot)
                                                                            setPreliminar(true)
                                                                        }}>Tomar Foto</button>
                                                                    )}
                                                                </Webcam>
                                                            </div>
                                                            <button onClick={() => setTomarFoto(false)} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                ) : null}



                                {!tomarFoto ? (<button type="button" onClick={() => { document.getElementById('barcode').click(); }} class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Seleccionar foto</button>) : null}

                                <input
                                    type="file"
                                    id="barcode"
                                    style={{ display: 'none' }}
                                    onChange={guardarFotoCodigo}
                                />

                                <button type="button" onClick={() => {
                                    setShowCreate(false)
                                    setTomarFoto(false)
                                    setImagen(null)
                                }} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><HighlightOffIcon /></button>
                            </div>
                        ) : null}
                    </div>
                    <div>

                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Imagen del producto</label>

                        <button type="button" onClick={() => { document.getElementById('image').click(); }} class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Seleccionar foto</button>

                        <input
                            type="file"
                            id="image"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <div class="col-span-2 flex justify-center">
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Crear Producto</button>
                    </div>
                </form>
                <section class="grow">
                    {preliminar ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div class="">
                                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            <button onClick={() => {setPreliminar(false); setImagen(null)}} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                            <div class="p-5 text-center">
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Codigo de barras</label>
                                                <img class="object-contain h-48 w-96" src={imagen} alt="Product" />
                                            </div>
                                            <button onClick={ReadBarCode} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Aceptar</button>

                                            <button onClick={() => {setPreliminar(false); setImagen(null)}} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {preliminarImagen ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    <div class="">
                                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            <button onClick={() => {setPreliminarImagen(false); setImagen(null)}} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                <span class="sr-only">Close modal</span>
                                            </button>
                                            <div class="p-5 text-center">
                                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Codigo de barras</label>
                                                <img class="object-contain h-48 w-96" src={imagen} alt="Product" />
                                            </div>
                                            <button onClick={() => setPreliminarImagen(false)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Aceptar</button>

                                            <button onClick={() => {setPreliminarImagen(false); setImagen(null)}} data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                </section>
            </div>
        </div>
    )
}

export default CreateProduct;