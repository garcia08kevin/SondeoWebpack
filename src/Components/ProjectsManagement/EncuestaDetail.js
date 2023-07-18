import { Route, useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getDetalleEncuesta } from "../../Services/EncuestaService";
import images from '../../../public/icons/producto.png'

function EncuestaDetail() {
  const [encuesta, setEncuesta] = useState([]);
  const [user, setUser] = useState([]);
  const [medicion, setMedicion] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams()

  useEffect(() => {
    if (!apiCalled) {
      getDetalleEncuesta(id).then(response => {
        setEncuesta(response);
        setUser(response.customUser)
        setMedicion(response.medicion)
        setDetalle(response.detalleEncuestas)
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

  return (
    <div>
      {loading ? (
        <div role="status" class="translate-x-1/2 p-8">
          <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
          <span class="sr-only">Loading...</span>
        </div>
      ) :
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

          <a class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Detalle Encuesta </h5>
            <p><span class="font-bold">Medicion: </span>{medicion.nombreMedicion}</p>
            <p><span class="font-bold">Fecha Inicio: </span>{fechaFomato(encuesta.fechaInicio)}</p>
            <p><span class="font-bold">Fecha Cierre: </span>{encuesta.fechaCierre == null ? "En Curso" : fechaFomato(encuesta.fechaCierre)}</p>
            <p><span class="font-bold">Realiza por: </span>{user.name} {user.lastname}</p>
            <p><span class="font-bold">Dias trabajados: </span>{encuesta.diasTrabajados == 0 ? "Pendiente" : encuesta.diasTrabajados}</p>
            <p><span class="font-bold">Nro de productos: </span>{detalle.length}</p>
          </a>

          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="text-center px-6 py-3">
                  Imagen
                </th>
                <th scope="col" class="px-6 py-3">
                  Datos del Producto
                </th>
                <th scope="col" class="px-6 py-3">
                  Datos Recoletados
                </th>
              </tr>
            </thead>
            <tbody>
              {detalle.map((val, key) => {
                return (
                  <tr key={val.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td class="flex justify-center items-center px-6 py-4">
                      {<img class="object-fill h-50 w-40" src={val.producto.imagen == null ? images : `data:image/jpeg;base64,${val.imagen}`} alt="Product" />}
                    </td>
                    <td value={val.id} class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <p><span class="font-bold">Nombre del producto:</span> {val.producto.nombre}</p>
                      <p><span class="font-bold">Marca:</span> {val.producto.marca.nombreMarca}</p>
                      <p><span class="font-bold">Categoria:</span> {val.producto.categoria.nombreCategoria}</p>
                      <p><span class="font-bold">Propiedad:</span> {val.producto.propiedades.nombrePropiedades}</p>
                    </td>
                    <td value={val.id} class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <p><span class="font-bold">PVP: </span>{val.pvp}</p>
                      <p><span class="font-bold">PVD: </span>{val.pvd}</p>
                      <p><span class="font-bold">Stock Inicial: </span>{val.stockInicial}</p>
                      <p><span class="font-bold">Stock Final: </span>{val.stockFinal}</p>
                      <p><span class="font-bold">Compra:</span>{val.compra}</p>
                    </td>
                  </tr>

                )
              })}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

export default EncuestaDetail;