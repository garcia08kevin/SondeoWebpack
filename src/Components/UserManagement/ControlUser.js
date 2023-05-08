import { Routes, Route, Link, Outlet } from 'react-router-dom';

function ControlUser() {
    return (
      <div class="flex flex-col grow ">              
        <div class="shadow-2xl px-5 flex justify-evenly m-5">
          <div class="flex flex-col my-5 font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <Link to="/controlUser/useList">Lista Usuarios</Link>          
        </div>
        <div class="flex my-5 font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <Link to="/controlUser/registerUser">Crear Usuario</Link>          
        </div>
        <div class="flex my-5 font-medium text-blue-600 dark:text-blue-500 hover:underline">
          <Link to="/controlUser/blockUser">Bloquear Usuario</Link>          
        </div>        
      </div>
      <Outlet />
    </div>
    );
  }
  
export default ControlUser;