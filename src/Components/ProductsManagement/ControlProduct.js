import { Routes, Route, Link, Outlet } from 'react-router-dom';

function ControlProduct(){
    return(
        <div class="flex flex-col grow">
            <Outlet />
        </div>
    )
}

export default ControlProduct;