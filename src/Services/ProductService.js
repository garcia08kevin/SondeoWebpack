import { getToken } from "./UserService";

export const getCategorias = async () => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Categorias`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export const crearCategoria = async (categoria) => {
    return fetch(`${process.env.API_URL}/api/ManageProductos/Categorias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(categoria)
    })
        .then(data => data.json())
}

export const getCategoriaById = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Categorias/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export const UpdateCategoria = async (id, propiedad) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Categorias/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(propiedad)
    })
    return response.json();
}

export const deleteCategoria = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Categorias/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export const getMarcas = async () => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Marcas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export async function crearMarca(marca) {
    return fetch(`${process.env.API_URL}/api/ManageProductos/Marcas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(marca)
    })
        .then(data => data.json())
}

export const getMarcaById = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Marcas/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export const UpdateMarca = async (id, propiedad) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Marcas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(propiedad)
    })
    return response.json();
}

export const deleteMarca = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Marcas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export const getPropiedades = async () => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Propiedades`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export async function crearPropiedades(propiedad) {
    return fetch(`${process.env.API_URL}/api/ManageProductos/Propiedades`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(propiedad)
    })
        .then(data => data.json())
}

export const getPropiedadesById = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Propiedades/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export const UpdatePropiedad = async (id, propiedad) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Propiedades/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(propiedad)
    })
    return response.json();
}

export const deletePropiedad = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Propiedades/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export const getProductsById = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Productos/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export const getProducts = async () => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Productos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export const getProductosNoActivados = async (id, todo) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Productos/NoActivados`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}

export const ProductActivation = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Productos/ActivarProducto?id=${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
    })
    return response.json();
}

export async function actualizarProducto(producto, id) {
    return fetch(`${process.env.API_URL}/api/ManageProductos/Productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(producto)
    })
        .then(data => data.json())
}

export const deleteProducts = async (id) => {
    const response = await fetch(`${process.env.API_URL}/api/ManageProductos/Productos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return response.json();
}