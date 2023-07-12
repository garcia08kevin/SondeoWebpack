import { useState } from 'react';

export const getToken = () => {
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
};

export default function useToken() {

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
  return fetch(`${process.env.API_URL}/api/Authentication/Login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export async function UserDetailById(id) {
  const response = await fetch(`${process.env.API_URL}/api/Accounts/GetUsersById?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(id)
  })
  return await response.json();
}

export async function GetAllUserByRole(role) {
  const response = await fetch(`${process.env.API_URL}/api/Accounts/GetAllUserByRole?role=${role}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
  })
  return await response.json();
}

export const UserActivation = async (email, eleccion) => {
  const response = await fetch(`${process.env.API_URL}/api/Accounts/ActivarUsuario?email=${email}&eleccion=${eleccion}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  })
  const data = await response.json();
  return data;
}

export const ResetPassword = async (id) => {
  const response = await fetch(`${process.env.API_URL}/api/Accounts/ResetPassword?userId=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  })
  const data = await response.json();
  return data;
}

export async function createUser(user) {
  return fetch(`${process.env.API_URL}/api/Accounts/Registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(user)
  })
    .then(data => data.json())
}

export const getUsers = async () => {
  const response = await fetch(`${process.env.API_URL}/api/Accounts/GetUsers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  })
  const data = await response.json();
  return data;
}

export async function DeleteUser(id) {
  const response = await fetch(`${process.env.API_URL}/api/Accounts/RemoveUser?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(id)
  })
  return await response.json();
}

export const getRoles = async () => {
  const response = await fetch(`${process.env.API_URL}/api/Accounts/GetAllRoles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  })
  const data = await response.json();
  return data;
}

export const getUserRol = async (id) => {
  const response = await fetch(`${process.env.API_URL}/api/Roles/GetUserRole?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  })
  const data = await response.json();
  return data;
}

export const notificacionService = async () => {
  const response = await fetch(`${process.env.API_URL}/api/Accounts/Notificaciones`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  })
  const data = await response.json();
  return data;
}

export const marcarComoLeida = async (id) => {
  await fetch(`${process.env.API_URL}/api/Notifications/MarcarComoLeido?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  })
}

export const nroNotificaciones = async () => {
  const response = await axios.get('https://localhost:7125/api/Notifications/NoLeidas')
  const data = response.data;
  return data;
}
