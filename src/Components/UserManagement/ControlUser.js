import SidebarUser from "./SidebarUser";

function ControlUser() {
    return (
      <>      
      <div class="shadow-2xl flex m-5">
        <h1>Control Usuarios</h1>
      </div>
      <div class="flex justify-self-end">
      <SidebarUser/>
      </div>
      </>
    );
  }
  
export default ControlUser;