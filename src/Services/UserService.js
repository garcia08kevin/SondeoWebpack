import { useState } from 'react';
import axios from 'axios'

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

export async function loginUser(credentials) {
    return fetch('https://localhost:7125/api/Authentication/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export async function UserDetail(email) {
    const response = await fetch(`https://localhost:7125/api/Authentication/UserDetail?email=${email}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(email)
      })
    return await response.json();
}

export async function UserDetailById(id) {
  const response = await fetch(`https://localhost:7125/api/Authentication/UserDetailById?id=${id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(id)
    })
  return await response.json();
}

export async function DeleteUser(id) {
  const response = await fetch(`https://localhost:7125/api/Admin/RemoveUser?id=${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(id)
    })
  return await response.json();
}

export const notificacionService = async () => {  
  const response = await fetch(`https://localhost:7125/api/Notifications`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })    
    const data = await response.json();
    return data;
}

export async function createUser(user) {
  return fetch('https://localhost:7125/api/Admin/Registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(data => data.json())
 }

 export const UserActivation = async (email, eleccion) => {  
  const response = await fetch(`https://localhost:7125/api/Admin/ActivarUsuario?email=${email}&eleccion=${eleccion}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    })    
    const data = await response.json();
    return data;
}


export const getUsers = async () => {  
  const response = await fetch(`https://localhost:7125/api/Admin/GetAllUsers`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })    
    const data = await response.json();
    return data;
}

export const getRoles = async () => {  
  const response = await fetch(`https://localhost:7125/api/Admin/GetAllRoles`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })    
    const data = await response.json();
    return data;
}

export const getUserRol = async (id) => {  
  const response = await fetch(`https://localhost:7125/api/Admin/GetUserRole?id=${id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })    
    const data = await response.json();
    return data;
}

export const marcarComoLeida = async (id) => {  
  const response = await fetch(`https://localhost:7125/api/Notifications/MarcarComoLeido?id=${id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    })    
    const data = await response.json();
    return data;
}

export const nroNotificaciones = async () => {  
  const response = await axios.get('https://localhost:7125/api/Notifications/NoLeidas')
  const data = response.data;
  return data;
}
