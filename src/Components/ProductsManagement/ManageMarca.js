import { useEffect, useState } from "react";
import { getMarcas, crearMarca, deleteMarca, getMarcaById, UpdateMarca } from "../../Services/ProductService";

export function ManageMarca() {
  const [activado, setActivado] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const [marcas, setMarcas] = useState([]);
  const [marcaSelect, setMarcaSelect] = useState(1);
  const [nombre, setNombre] = useState("");
  const [actualizar, setActualizar] = useState("");
  const [activarActualizar, setActivarActualizar] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!apiCalled) {
        getMarcas().then(response => {
            setMarcas(response);
            setLoading(false)
      });
      setApiCalled(true);
    }
  }, [apiCalled]);

  const handleSubmit = async e => {
    e.preventDefault();
    const userData = localStorage.getItem('currentUser');
    const usuario = JSON.parse(userData);
    const marca = await crearMarca({
      nombreMarca: nombre
    }, usuario.email);
  }

  const getMarcaId = async () => {
    const propiedad = await getMarcaById(marcaSelect).then(response => {
      setActualizar(response.nombreMarca);
      setActivarActualizar(true);
    });
  }

  const actualizarElemento = async () => {
    const propiedad = await UpdateMarca(marcaSelect, {
      id: marcaSelect,
      nombreMarca: actualizar
    })
    console.log(propiedad)
  }

  const eliminar = async () => {
    const propiedad = await deleteMarca(marcaSelect)
  }

  return (
    <div>
      {
        loading ? (
          <div role="status" class="p-6 px-20">
            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) :
        <div class="p-6 px-20">
        <h2 class="text-2xl font-bold dark:text-white">Administrar Marcas</h2>
        <label class="pt-5 self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Agregar Marca</label>
        <div class="flex flex-col  content-center">
          <form onSubmit={handleSubmit} class="flex flex-row gap-4">
            <input onChange={e => setNombre(e.target.value)} type="text" id="small-input" class="self-center block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <button type="submit" class=" w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Agregar</button>
          </form>
          <label class="pb-3 self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Modificar Propiedad</label>
          <form class="flex flex-row">
            <div>
            <button  onClick={() => eliminar()} type="button" class="w-1/2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
              <button onClick={activarActualizar ? () => actualizarElemento(): () => getMarcaId()} type="button" class="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Modificar</button>
            </div>
            <div>
              <div class="pb-2">
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
                <input onChange={e => setActualizar(e.target.value)}  defaultValue={actualizar} disabled={activarActualizar ? false: true} type="text" id="small-input" class="self-center block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
            </div>
          </form>
        </div>
      </div>
      }
    </div>
  );
}
