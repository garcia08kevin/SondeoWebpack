import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { getUsers, getUserRol } from "../../Services/UserService";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function UserList() {
  const [users, setUsers] = useState([]);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    Usuarios();
  }, [apiCalled]);


  function Usuarios() {
    if (!apiCalled) {
      getUsers().then(response => {
        setUsers(response);
        setApiCalled(true);
      });
    }
  }

  return (
    <div class="shadow-2xl rounded-lg  flex flex-col m-5">
      <div class="flex items-center justify-center h-10 shadow-md">
        <h1 class="text-2xl text-center  text-indigo-500">Lista de Usuarios</h1>
      </div>
      <div class="relative overflow-x-auto table-fixed m-4">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Id
              </th>
              <th scope="col" class="px-6 py-3">
                Nombre
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Estado
              </th>
              <th scope="col" class="px-6 py-3">
                Detalles
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((val, key) => {
              return (

                <tr key={val.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {val.id}
                  </th>
                  <td class="px-6 py-4">
                    {val.name} {val.lastname}
                  </td>
                  <td class="px-6 py-4">
                    {val.email}
                  </td>
                  <td class="px-6 py-4">
                    {val.cuentaActiva == true ? <div class=" p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
                      <div>
                        <span class="font-medium text-center ">Activado</span>
                      </div>
                    </div> : 
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                      <div>
                        <span class="font-medium text-center ">No Activado</span>
                      </div>
                    </div>}
                  </td>
                  <td class="px-6 py-4">
                    <Link to={`/controlUser/userDetail/${val.id}`}>
                      <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        <MoreVertIcon />
                      </button>
                    </Link>
                  </td>
                </tr>

              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;