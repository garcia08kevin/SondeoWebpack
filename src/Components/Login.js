import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { loginUser, CurrentUser } from '../Services/UserService';
import image from '../../public/icons/logo.png'

export default function Login({ setToken }) {

  const [message, setMessage] = useState();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const token = await loginUser({
      userName,
      password
    });
    if (!token.result) {
      var mensaje = token.respose;
      setMessage(mensaje);
    } else {
      localStorage.setItem('currentUser', JSON.stringify(token.user))
      setToken(token);
    }
    setLoading(false);
  }

  return (

    <div className="dark:bg-slate-800 login-wrapper">
      <section class="lg:w-4/5 mx-auto flex flex-wrap">
        <div class="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="dark:bg-slate-800 bg-white p-16">
            <img src={image} />
          </div>
          <div class="w-full bg-white md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6">
                <div>
                  <label class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Nombre de Usuario</label>
                  <input onChange={e => setUserName(e.target.value)} type="text"class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                  <input onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                {!loading ? (
                  <div class="flex">
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Iniciar Sesión</button>
                  </div>
                ) :
                  <div class="flex">
                    <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                      <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                      </svg>
                      Cargando...
                    </button>
                  </div>
                }
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
