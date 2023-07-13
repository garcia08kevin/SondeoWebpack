import { Route, useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getDetalleEncuesta } from "../../Services/EncuestaService";

function EncuestaDetail() {
  const [encuesta, setEncuesta] = useState([]);
  const [user, setUser] = useState([]);
  const [medicion, setMedicion] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  const { id } = useParams()

  useEffect(() => {
    if (!apiCalled) {
      getDetalleEncuesta(id).then(response => {
        setEncuesta(response);
        setUser(response.customUser)
        setMedicion(response.medicion)
        setDetalle(response.detalleEncuestas)
        console.log(response)
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

  return (
    <div class="space-y-4">
      <nav class="flex  mt-2" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a href="/controlProjects" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              Retroceder
            </a>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Detalle encuesta</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Detalle Encuesta </h5>
        <div class="flex flex-row justify-evenly">
          <div>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Fecha Inicio: {fechaFomato(encuesta.fechaInicio)}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Fecha Cierre: {encuesta.fechaCierre == null ? "En Curso" : fechaFomato(encuesta.fechaCierre)}</p>
          </div>
          <div>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Dias trabajados: {encuesta.diasTrabajados == 0 ? "Pendiente" : encuesta.diasTrabajados}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Realizada por: {user.name} {user.lastname}</p>
          </div>
          <div>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Medicion: {medicion.nombreMedicion}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Nro de productos: {detalle.length}</p>
          </div>
        </div>
      </div>

      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nombre del Producto
            </th>
            <th scope="col" class="px-6 py-3">
            PvD
            </th>
            <th scope="col" class="px-6 py-3">
              PvP
            </th>
            <th scope="col" class="px-6 py-3">
              Stock Inicial
            </th>
            <th scope="col" class="px-6 py-3">
              Stock Final
            </th>
            <th scope="col" class="px-6 py-3">
              Compra
            </th>
          </tr>
        </thead>
        <tbody>
          {detalle.map((val, key) => {
            return (
              <tr key={val.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td value={val.id} class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <a href={`/controlProduct/productDetail/${val.productoId}`} class="text-blue-600 dark:text-blue-500 hover:underline">{val.producto.nombre}</a>
                </td>
                <td class="px-6 py-4">
                  {val.pvd}
                </td>
                <td class="px-6 py-4">
                  {val.pvp}
                </td>
                <td class="px-6 py-4">
                  {val.stockInicial}
                </td>
                <td class="px-6 py-4">
                  {val.stockFinal == -1 ? "En proceso" : val.stockFinal}
                </td>
                <td class="px-6 py-4">
                  {val.compra}
                </td>
              </tr>

            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EncuestaDetail;