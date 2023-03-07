const fs = require ('fs')

class ProductManager {
    constructor(path){
        this.path = path
    }
    //consultarProductos
    getProducts = async() => {
        if (fs.existsSync(this.path)) {
            const infoProduct = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(infoProduct)
            return products
        } else {
            console.log('El archivo no existe');
            return[]
        }
    }
    //consultarById
    getProductsById = async (id) => {
        const products = await this.getProducts()
        const product = products.find(p=>p.id === id)
        if(product){
            return product
        } else {
            return 'El Producto NO existe'
        }
    }
    //crearProducto
    addProduct = async (product) => {
        //consultamos los Productos
        const products = await this.getProducts()
        //generamos el Id
        const id = this.#generarId(products)
        const newProduct = {id, ...product}
        products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products))
        return newProduct
    }
    //elimiarArchivo
    deleteProducts = async() => {
        if(fs.existsSync(this.path)){
            await fs.promises.unlink(this.path)
            return 'Productos ELIMINADOS'
        } else {
            return 'El Archivo NO existe!'
        }
    }
    //eliminarProductoById
    deleteProductsById = async(id) => {
        const products = await this.getProducts()
        const arrayProductsNew = products.filter((p) => p.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(arrayProductsNew))
    }
    //actualizarProducto
    updateProduct = async (id,obj) => {
        const products = await this.getProducts()
        const indexProduct = products.findIndex(p=>p.id === id)
        if(indexProduct === -1){
            return 'Producto NO encontrado'
        }
        const productUpdate = {...products[indexProduct],...obj}
        products.splice(indexProduct,1,productUpdate)
        await fs.promises.writeFile(this.path,JSON.stringify(products))
    }
    #generarId = (products) => {
        let id
        if (products.length === 0) {
            id = 1
        } else {
            id = products[products.length-1].id + 1
        }
        return id
    }
}

const product1 = {
    title: 'arroz',
    description: 'comida',
    price: 500,
    thumbnail: 'no definido',
    code : 1234,
    stock: 44
}
const product2 = {
    title: 'pan',
    description: 'comida',
    price: 200,
    thumbnail: 'no definido',
    code : 12,
    stock: 10
}

async function prueba() {
    const manager = new ProductManager('archivos.json')
    //await manager.addProduct(product1)
    //await manager.addProduct(product2)
    //const archivos = await manager.getProducts()
    //const product = await manager.getProductsById()
    //await manager.deleteProductsById(4)
    //await manager.deleteProducts()
    //await manager.updateProduct(12,{description:'nada'})
    //console.log(product);
}
prueba()