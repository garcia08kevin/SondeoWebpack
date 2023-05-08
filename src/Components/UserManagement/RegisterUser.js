import { useState, useEffect } from "react";
import { createUser, getRoles } from "../../Services/UserService";

function RegisterUser() {
    const [roles, setRoles] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);
    const [roleSelect, setRoleSelect] = useState("Administrador");
    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [respuesta, setRespuesta] = useState();

    useEffect(() => {
        if (!apiCalled) {
            getRoles().then(response => {
                setRoles(response);
                setApiCalled(true);
            });
        }
    }, [apiCalled]);

    const handleSubmit = async e => {
        e.preventDefault();
        const user = await createUser({
            name: nombre,
            lastname: apellido,
            email: email,
            role: roleSelect
        });
        if (user.result) {
            setError(false)
            setCorrect(true)
            console.log(user.contenido)
            setRespuesta(user)
        } else {
            setCorrect(false)
            setError(true)
            console.log(user)
            setRespuesta(user)
        }
    }

    return (
        <div class="shadow-2xl flex justify-evenly m-4 bg-gray-50 dark:bg-gray-900">
            <div class="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-center h-10 shadow-md">
                    <h1 class="text-2xl text-center  text-indigo-500">Crear Usuarios</h1>
                </div>
                <form onSubmit={handleSubmit} class="flex sm:p-8 justify-around">
                    <div>
                        <div class="m-4">
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre (Opcional)</label>
                            <input onChange={e => setNombre(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div class="m-4">
                            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido (Opcional)</label>
                            <input onChange={e => setApellido(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                    </div>

                    <div>
                        <div class="m-4">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="No puedes dejar este apartado en blanco" />
                        </div>

                        <div class="m-4 ">

                            <div>
                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Roles</label>
                                <select onChange={(e) => setRoleSelect(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {roles.map((val, key) => {
                                        key = val.id
                                        return (
                                            <option key={val.id}>{val.name}</option>
                                        )
                                    }
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="flex flex-col self-center">
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Crear Usuario</button>
                        <div class="pt-6">
                        {correct ? (
                            <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                {respuesta.contenido} {respuesta.token}
                            </div>
                        ) : null}
                        </div>
                        <div class="pt-6">
                        {error ? (
                            <div class="p-4 mx-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {respuesta.errors[0]}
                        </div>
                        ):null}
                        </div>
                        
                    </div>

                </form>
            </div>
        </div>
    );
}

export default RegisterUser;