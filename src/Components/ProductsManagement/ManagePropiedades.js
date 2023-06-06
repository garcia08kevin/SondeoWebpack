import { useEffect, useState } from "react";
import { getPropiedades, crearPropiedades, deletePropiedad, getPropiedadesById, UpdatePropiedad } from "../../Services/ProductService";

export function ManagePropiedades() {
  const [activado, setActivado] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadSelect, setPropiedadSelect] = useState(1);
  const [nombre, setNombre] = useState("");
  const [actualizar, setActualizar] = useState("");
  const [activarActualizar, setActivarActualizar] = useState(false);


  useEffect(() => {
    if (!apiCalled) {
      getPropiedades().then(response => {
        setPropiedades(response);
      });
      setApiCalled(true);
    }
  }, [apiCalled]);

  const handleSubmit = async e => {
    e.preventDefault();
    const userData = localStorage.getItem('currentUser');
    const usuario = JSON.parse(userData);
    const propiedad = await crearPropiedades({
      nombrePropiedades: nombre
    },usuario.email);
  }

  const getPropiedadId = async () => {
    const propiedad = await getPropiedadesById(propiedadSelect).then(response => {
      setActualizar(response.nombrePropiedades);
      setActivarActualizar(true);
    });
  }

  const actualizarElemento = async () => {
    const propiedad = await UpdatePropiedad(propiedadSelect, {
      id: propiedadSelect,
      nombrePropiedades: actualizar
    })
    if(propiedad){
      toast.success(`Se ha cambiado el estado del usuario completamente`);
    }
  }

  const eliminar = async () => {
    const propiedad = await deletePropiedad(propiedadSelect)
  }

  return (
    <div class="p-6 px-20">
      <h2 class="text-2xl font-bold dark:text-white">Administrar Propiedades</h2>
      <label class="pt-5 self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Agregar Propiedad</label>
      <div class="flex flex-col  content-center">
        <form onSubmit={handleSubmit} class="flex flex-row gap-4">
          <input onChange={e => setNombre(e.target.value)} type="text" id="small-input" class="self-center block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <button type="submit" class=" w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Agregar</button>
        </form>
        <label class="pb-3 self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Modificar Propiedad</label>
        <form class="flex flex-row">
          <div>
          <button  onClick={() => eliminar()} type="button" class="w-1/2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Eliminar</button>
            <button onClick={activarActualizar ? () => actualizarElemento(): () => getPropiedadId()} type="button" class="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Modificar</button>
          </div>
          <div>
            <div class="pb-2">
              <select onChange={(e) => setPropiedadSelect(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {propiedades.map((val, key) => {
                  return (
                    <option key={val.id} value={val.id}>{val.nombrePropiedades}</option>
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
  );
}
