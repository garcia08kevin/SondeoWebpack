import { Routes, Route, Link, Outlet } from 'react-router-dom';

function ControlUser() {
    return (
      <div class="flex flex-col grow">              
      <Outlet />
    </div>
    );
  }
  
export default ControlUser;