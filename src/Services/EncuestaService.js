export const crearMedicion = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/Mediciones/CrearMedicion?ciudadId=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const cerrarMedicion = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/Mediciones/CerrarMedicion/${id}`, {
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

export const getLocales = async () => {
    const response = await fetch(`${process.env.API_URL}/api/ManageLocales/Locales`, {
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

export const habilitarLocal = async (id, eleccion) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageLocales/HabilitarLocal?id=${id}&eleccion=${eleccion}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    return data;
  }

export const getEncuestasFromLocal = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/Mediciones/EncuestasFromLocal/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}