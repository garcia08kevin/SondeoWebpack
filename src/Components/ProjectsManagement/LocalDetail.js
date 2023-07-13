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
    const [ciudad, setCiudad] = useState("");

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
                setCiudad(response.ciudad)
            });
            setApiCalled(true);
        }
    }, [apiCalled]);

    const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    const url = 'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Mx8jeowXb4Euzzo4pc4G'

    return (
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
                            <h2 className="text-gray-900 text-2xl title-font font-medium py-2">Ciudad: {ciudad.nombreCiudad}</h2>
                            <h2 className="text-gray-900 text-2xl title-font py-2">Direccion: {localData.direccion}</h2>
                            <div className="flex items-center border-b-2 border-gray-200 py-2"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LocalDetail;