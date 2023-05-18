import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { loginUser, CurrentUser } from '../Services/UserService';
import image from '../../public/icons/logo.png'

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
      await CurrentUser({
        token: token.token
      }).then(respose => localStorage.setItem('currentUser', JSON.stringify(respose)))
      setToken(token);
    }
  }

  return (

    <div className="login-wrapper">
      <section class="lg:w-4/5 mx-auto flex flex-wrap">
        <div class="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="bg-white p-16">
            <img src={image} />
          </div>
          <div class="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6">
                <div>
                  <label for="email" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Correo Electronico</label>
                  <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                  <input onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div class="flex items-center justify-between">
                  <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</a>
                </div>
                <div class="flex">
                  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Iniciar Sesión</button>
                </div>
              </form>
              {message != null ? (
                <div class="p-4 mx-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  {message}
                </div>
              ) : null}
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
