import images from '../../public/icons/usuario.png'
import productos from '../../public/icons/productosBox.png'
import mediciones from '../../public/icons/mediciones.png'
import { getUsers, getDataUser } from '../Services/UserService';
import React, { useEffect, useState } from 'react';


function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    if (!apiCalled) {
      setDataUser(getDataUser())
      getUsers().then(response => {
        const limitedData = response.slice(0, 5);
        setUsuarios(limitedData);
        setApiCalled(true);
        setLoading(false)
      });
    }
  }, [apiCalled]);

  return (
    <div>
      <h2 class="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Bienvenido nuevamente {dataUser.name} {dataUser.lastname}</h2>
      <div class="grid grid-cols-3 grid-flow-col gap-4">

        <div class="row-span-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img class="rounded-t-lg" src={productos} alt="" />
          <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Control de Productos</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Administrar productos, marcas, categorias y propiedades de los productos para realizar encuestas</p>
            <a href="/controlProduct" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Administrar Productos
              <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>

        <a href="/controlProjects" class="place-self-center row-span-2 col-span-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={mediciones} alt="" />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Control de Proyectos</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Administrar las mediciones para las ciudades junto con sus encuestas</p>
          </div>
        </a>

        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex flex-col items-center pb-10 px-4 pt-4">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={images} alt="usuario" />
            <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{dataUser.name} {dataUser.lastname}</h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">{dataUser.role}</span>
            <div class="flex mt-4 space-x-3 md:mt-6">
              <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cambiar datos personales</a>
              <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Cambiar Imagen</a>
            </div>
          </div>
        </div>

        <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Usuarios</h5>
            <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              Ver todos
            </a>
          </div>
          {loading ? (
            <div role="status" class="translate-x-1/2 translate-y-1/2 top-1/4 left-1/2">
              <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) :
            <div class="flow-root">
              <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                {usuarios.map((val, key) => {
                  return (
                    <li key={val.id} class="py-3 sm:py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <img class="w-8 h-8 rounded-full" src={images} alt="listUsuario" />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {val.name} {val.lasname}
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {val.username}
                          </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {val.role}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          }
        </div>

      </div>
    </div>
  );
}

export default Home;