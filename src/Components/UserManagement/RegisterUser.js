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
            setRespuesta(user)
        } else {
            setCorrect(false)
            setError(true)
            setRespuesta(user)
        }
    }

    return (
        <div class="bg-white rounded-lg ">
            <h2 class="text-2xl font-bold dark:text-white">Agregar Usuario</h2>
            <form onSubmit={handleSubmit} class="grid grid-cols-2 gap-4 sm:p-8 justify-around">
                <div class="flex flex-col">
                    <label for="text" class="self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                    <input onChange={e => setNombre(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div class="flex flex-col">
                    <label for="text" class="self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                    <input onChange={e => setApellido(e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div class="flex flex-col">
                    <label for="email" class="self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div class="flex flex-col">
                    <label class="self-center block m-2 text-sm font-medium text-gray-900 dark:text-white">Roles</label>
                    <select onChange={(e) => setRoleSelect(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {roles.map((val, key) => {
                            key = val.id
                            return (
                                <option key={val.id}>{val.name}</option>
                            )
                        }
                        )}
                    </select>
                </div >
                <div class="col-span-2 self-center pt-5">
                    <button type="submit" class="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Usuario</button>
                </div>
                <div class="col-span-2 self-center mt-3">
                    {correct ? (
                        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            {respuesta.contenido} {respuesta.token}
                        </div>
                    ) : null}
                </div>
                <div class="col-span-2 self-center mt-3">
                    {error ? (
                        <div class="p-4 mx-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {respuesta.errors[0]}
                        </div>
                    ) : null}
                </div>
            </form>
        </div>
    );
}

export default RegisterUser;