export const crearMedicion = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/Mediciones/CrearMedicion?ciudadId=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const historico = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/Mediciones/HistoricoMediciones/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getMediciones = async () => {
    const response = await fetch(`${process.env.API_URL}/api/Mediciones/MedicionesActivas`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getDetalleEncuesta = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/Mediciones/DetalleEncuesta/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getCiudades = async () => {
    const response = await fetch(`${process.env.API_URL}/api/ManageLocales/Ciudades`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getCanales = async () => {
    const response = await fetch(`${process.env.API_URL}/api/ManageLocales/Canales`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getLocales = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageLocales/Locales?idCiudad=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getLocalesById = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageLocales/Locales/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getEncuestasFromLocal = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/Mediciones/EncuestasFromLocal/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}