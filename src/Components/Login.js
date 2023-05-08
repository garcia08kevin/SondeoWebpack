import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { loginUser, UserDetail } from '../Services/UserService';

export default function Login({ setToken }) {

  const [message, setMessage] = useState();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    
    if (!token.result) {
      var mensaje = token.errors[0];
      setMessage(mensaje);
    } else {
      const userData = await UserDetail(email)
      localStorage.setItem('name', JSON.stringify(userData.name));
      localStorage.setItem('lastname', JSON.stringify(userData.lastname));
      localStorage.setItem('role', JSON.stringify(userData.role));
      setToken(token);
    }
  }

  return (

    <div className="login-wrapper">
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white" />
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electronico</label>
                  <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                  <input onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</a>
                </div>
                <div class="flex">
                  <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Iniciar Sesión</button>
                  {message != null ? (
                    <div class="p-4 mx-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      {message}
                    </div>
                  ) : null}
                  <>
                  </>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
