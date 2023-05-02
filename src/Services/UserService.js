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

export async function CurrentUser(email) {
    const response = await fetch(`https://localhost:7125/api/Authentication/CurrentUser?email=${email}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(email)
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
