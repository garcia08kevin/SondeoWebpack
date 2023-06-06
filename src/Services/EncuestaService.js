export const crearMedicion = async (id) => {
    const response = await fetch(`https://localhost:7125/api/EncuestasAdmin/CrearMedicion?ciudadId=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const historico = async (id) => {
    const response = await fetch(`https://localhost:7125/api/EncuestasAdmin/HistoricoMediciones/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getMediciones = async () => {
    const response = await fetch(`https://localhost:7125/api/EncuestasAdmin/MedicionesActivas`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getDetalleEncuesta = async (id) => {
    const response = await fetch(`https://localhost:7125/api/EncuestasAdmin/DetalleEncuesta/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getCiudades = async () => {
    const response = await fetch(`https://localhost:7125/api/Cuidades`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getCanales = async () => {
    const response = await fetch(`https://localhost:7125/api/Canales`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getLocales = async (id) => {
    const response = await fetch(`https://localhost:7125/api/Locales?idCiudad=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getLocalesById = async (id) => {
    const response = await fetch(`https://localhost:7125/api/Locales/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getEncuestasFromLocal = async (id) => {
    const response = await fetch(`https://localhost:7125/api/EncuestasAdmin/EncuestasFromLocal/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}