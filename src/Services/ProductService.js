export const getProducts = async () => {
    const response = await fetch(`https://localhost:7125/api/ProductosAdmin`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getProductosByEncuestador = async (id, todo) => {
    const response = await fetch(`https://localhost:7125/api/ProductosAdmin/GetProductosByEncuestador/${id}?todo=${todo}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getCategorias = async () => {
    const response = await fetch(`https://localhost:7125/api/CategoriasAdmin`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export async function crearCategoria(categoria) {
    return fetch('https://localhost:7125/api/CategoriasAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
    })
        .then(data => data.json())
}

export const getCategoriaById = async (id) => {
    const response = await fetch(`https://localhost:7125/api/CategoriasAdmin/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const UpdateCategoria = async (id, propiedad) => {
    const response = await fetch(`https://localhost:7125/api/CategoriasAdmin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propiedad)
    })
    return response.json();
}

export const deleteCategoria = async (id) => {
    await fetch(`https://localhost:7125/api/CategoriasAdmin/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
}

export const getMarcas = async () => {
    const response = await fetch(`https://localhost:7125/api/MarcasAdmin`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export async function crearMarca(marca) {
    return fetch('https://localhost:7125/api/MarcasAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(marca)
    })
        .then(data => data.json())
}

export const getMarcaById = async (id) => {
    const response = await fetch(`https://localhost:7125/api/MarcasAdmin/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const UpdateMarca = async (id, propiedad) => {
    const response = await fetch(`https://localhost:7125/api/MarcasAdmin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propiedad)
    })
    return response.json();
}

export const deleteMarca = async (id) => {
    await fetch(`https://localhost:7125/api/MarcasAdmin/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
}

export const getPropiedades = async () => {
    const response = await fetch(`https://localhost:7125/api/PropiedadesAdmin`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export async function crearPropiedades(propiedad) {
    return fetch('https://localhost:7125/api/PropiedadesAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(propiedad)
    })
        .then(data => data.json())
}

export const getPropiedadesById = async (id) => {
    const response = await fetch(`https://localhost:7125/api/PropiedadesAdmin/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const UpdatePropiedad = async (id, propiedad) => {
    const response = await fetch(`https://localhost:7125/api/PropiedadesAdmin/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propiedad)
    })
    return response.json();
}

export const deletePropiedad = async (id) => {
    await fetch(`https://localhost:7125/api/PropiedadesAdmin/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
}

export const getProductsById = async (id) => {
    const response = await fetch(`https://localhost:7125/api/ProductosAdmin/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const ProductActivation = async (id) => {
    const response = await fetch(`https://localhost:7125/api/ProductosAdmin/ActivarProducto?id=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export async function crearProducto(producto) {
    return fetch('https://localhost:7125/api/ProductosAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(data => data.json())
}

export async function actualizarProducto(producto, id) {
    return fetch(`https://localhost:7125/api/ProductosAdmin/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(data => data.json())
}

export const deleteProducts = async (id) => {
    const response = await fetch(`https://localhost:7125/api/ProductosAdmin/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}