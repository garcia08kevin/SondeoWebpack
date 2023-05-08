import { nroNotificaciones } from "../Services/UserService";
import React, { useState, useEffect } from 'react';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";


function Sidebar() {
    let [nNotificaciones, setNotificaciones] = useState();
    
    const logout = async() => {
        await localStorage.clear();
        window.location.reload()
    }

    return (
        <div class="min-h-screen flex flex-row bg-gray-100">
        <div class="flex flex-col w-60 rounded-r-3xl overflow-hidden">
          <div class="flex items-center justify-center h-20 shadow-md">
            <h1 class="text-3xl text-center uppercase text-indigo-500">Sondeo Management</h1>
          </div>
          <ul class="flex flex-col py-4">
            <li>
              <a href="/" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
                <span class="text-center font-medium">Inicio</span>
              </a>
            </li>
            <li>
              <a href="/controlUser" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-music"></i></span>
                <span class="text-sm font-medium">Control Usuarios</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-drink"></i></span>
                <span class="text-sm font-medium">Control Productos</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-user"></i></span>
                <span class="text-sm font-medium">Profile</span>
              </a>
            </li>
            <li>
              <a href="/notificaciones" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-bell"></i></span>
                <span class="text-sm font-medium">Notificationes</span>
                <span class="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">{nNotificaciones}</span>
              </a>
            </li>
            <li onClick={logout}>
              <a href="" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-log-out"></i></span>
                <span class="text-sm font-medium">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default Sidebar;