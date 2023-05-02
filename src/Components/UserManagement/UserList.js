import { Outlet } from "react-router-dom";

function UserList() {
    return (
      <>    
      <div class="shadow-2xl flex m-8">
        <h1>Lista Usuarios</h1>
      </div>
      <Outlet/>
      </>      
    );
  }
  
export default UserList;