import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { descargarMedicion } from '../../Services/EncuestaService';
import { downloadExcel } from 'react-export-table-to-excel';

function DownloadContent() {
    const [apiCalled, setApiCalled] = useState(false);
    const [medicionData, setMedicionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const header = ["Nombre de la medicion", "Nombre del encuestador", "Local Encuestado", "Fecha Inicio", "Fecha Cierre", "Dias Trabajados", "Nombre del producto", "Codigo de barras", "Categoria", "Marca", "Propiedad", "Stock inicial", "Stock final", "Compra", "Pvd", "Pvp"];
    const { id } = useParams()

    useEffect(() => {
        if (!apiCalled) {
            descargarMedicion(id).then(response => {
                setMedicionData(response);
                console.log(response)
                setLoading(false);
            });
            setApiCalled(true);
        }
    }, [apiCalled]);

    function fechaFomato(fecha) {
        const dateObj = new Date(fecha);

        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
        return formattedDate;
    }

    function handleDownloadExcel() {
        downloadExcel({
            fileName: "Medicion",
            sheet: "Medicion",
            tablePayload: {
                header,
                // accept two different data structures
                body: medicionData,
            },
        });
    }


    return (
        <div class="overflow-x-auto sm:overflow-visible">
            <h2 class="text-center m-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Vista Preliminar</h2>
            <button type="button" onClick={() => handleDownloadExcel()} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Descargar Medicion</button>
            <table class="table-auto max-w-full text-xs text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {header.map((head) => (
                            <th key={head} scope="col" class="px-6 py-3">
                                {head}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {medicionData.map((val, key) => {
                        return (
                            <tr key={key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="px-6 py-4">
                                    {val.nombreMedicion}
                                </td>
                                <td class="px-6 py-4">
                                    {val.nombreEncuestador}
                                </td>
                                <td class="px-6 py-4">
                                    {val.localEncuestado}
                                </td>
                                <td class="px-6 py-4">
                                    {fechaFomato(val.fechaInicio)}
                                </td>
                                <td class="px-6 py-4">
                                    {fechaFomato(val.fechaCierre)}
                                </td>
                                <td class="px-6 py-4">
                                    {val.diasTrabajados}
                                </td>
                                <td class="px-6 py-4">
                                    {val.nombreProducto}
                                </td>
                                <td class="px-6 py-4">
                                    {val.codigoProducto}
                                </td>
                                <td class="px-6 py-4">
                                    {val.productoCategoria}
                                </td>
                                <td class="px-6 py-4">
                                    {val.productoMarca}
                                </td>
                                <td class="px-6 py-4">
                                    {val.productoPropiedad}
                                </td>
                                <td class="px-6 py-4">
                                    {val.stockInicial}
                                </td>
                                <td class="px-6 py-4">
                                    {val.stockFinal}
                                </td>
                                <td class="px-6 py-4">
                                    {val.compra}
                                </td>
                                <td class="px-6 py-4">
                                    {val.pvd}
                                </td>
                                <td class="px-6 py-4">
                                    {val.pvp}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DownloadContent;