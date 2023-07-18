import { Route, useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getLocalesById } from "../../Services/EncuestaService";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

function LocalDetail() {
    const [apiCalled, setApiCalled] = useState(false);
    const [localData, setLocalData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams()

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    useEffect(() => {
        if (!apiCalled) {
            getLocalesById(id).then(response => {
                setLocalData(response);
                setLoading(false);
            });
            setApiCalled(true);
        }
    }, [apiCalled]);

    const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    const url = 'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Mx8jeowXb4Euzzo4pc4G'

    return (
        <div>
            {loading ? (
                <div role="status" class="pb-10 translate-x-1/2 translate-y-1/2 top-2/4 left-1/2">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                    <span class="sr-only">Loading...</span>
                </div>
            ) :
                <div>
                    <nav class="flex  mt-2" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                                <a href="/controlProjects/localesList" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Lista de Locales
                                </a>
                            </li>
                            <li aria-current="page">
                                <div class="flex items-center">
                                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Detalles del local</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <section className="text-gray-700 body-font overflow-hidden bg-white">
                        <div className="container py-10 mx-auto">
                            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                <div className="lg:w-1/2 w-full">
                                    <MapContainer className="w-full h-96"
                                        center={[51.505, -0.09]}
                                        zoom={13}
                                        scrollWheelZoom={false}
                                    >
                                        <TileLayer url={url} attribution={attribution} />
                                        <Marker position={[51.505, -0.09]} />
                                    </MapContainer>
                                </div>
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h1 className="text-2xl title-font text-gray-500 tracking-widest py-2"><span className="uppercase">Nombre del Local: </span>{localData.nombre}</h1>
                                    <h2 className="text-gray-900 text-2xl title-font font-medium py-2">Ciudad: {localData.ciudad}</h2>
                                    <h2 className="text-gray-900 text-2xl title-font font-medium py-2">Tipo de establecimiento: {localData.canal}</h2>
                                    <h2 className="text-gray-900 text-2xl title-font py-2">Direccion: {localData.direccion}</h2>
                                    <div className="flex items-center border-b-2 border-gray-200 py-2"></div>
                                    <h2 className="text-gray-900 text-2xl title-font py-2">Estado: {localData.habilitado ? <span class="bg-green-100 text-green-800 text-xs font-medium px-4 py-2 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Habilitado</span> : <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-4 py-2 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Deshabilitado</span>}</h2>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            }
        </div>
    );
}

export default LocalDetail;