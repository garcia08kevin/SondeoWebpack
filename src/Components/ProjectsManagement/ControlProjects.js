import { Routes, Route, Link, Outlet } from 'react-router-dom';

function ControlProjects() {
    return (
        <div class="h-auto p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li class="mr-2">
                    <a href="/controlProjects/medicionesActivas" class={location.pathname == "/controlProjects/medicionesActivas" || location.pathname == "/controlProjects" ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                        : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"} >Mediciones Activas</a>
                </li>
                <li class="mr-2">
                    <a href="/controlProjects/localesList" class={location.pathname == "/controlProjects/localesList" ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                        : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"} >Lista de Locales</a>
                </li>
                <li class="mr-2">
                    <a href="/controlProjects/historicoMediciones" class={location.pathname == "/controlProjects/historicoMediciones" ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                        : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"} >Historico Mediciones</a>
                </li>
            </ul>
            <Outlet class="h-full" />
        </div>
    )
}

export default ControlProjects;