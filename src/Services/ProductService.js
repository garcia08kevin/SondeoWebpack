export const getProducts = async () => {
    const response = await fetch(`https://localhost:7125/api/Productos`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getCategorias = async () => {
    const response = await fetch(`https://localhost:7125/api/Categorias`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getProductsById = async (id) => {
    const response = await fetch(`https://localhost:7125/api/Productos/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const ProductActivation = async (id) => {  
    const response = await fetch(`https://localhost:7125/api/Admin/ActivarProducto?id=${id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      })    
      return response.json();
  }