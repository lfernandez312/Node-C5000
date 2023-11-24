const fs = require('fs');

//CONSIGNA Realizar una clase “ProductManager” que gestione un conjunto de productos.
class ProductManager {
    constructor(filePath) {
        //Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
        this.products = [];
        this.productIdCounter = 1;
        this.path = filePath;

        if (filePath) {
            this.loadFromFile(filePath);
        }
    }
    //Cada producto que gestione debe contar con las propiedades:- title (nombre del producto)- description (descripción del producto)- price (precio)- thumbnail (ruta de imagen)- code (código identificador)- stock (número de piezas disponibles)
    addProduct(product) {
        product.id = this.productIdCounter++;
        this.products.push(product);
        this.saveToFile();
        console.log("Producto agregado:", product);
    }

    getProducts() {
        this.loadFromFile();
        return this.products;
    }

    getProductById(id) {
        this.loadFromFile();

        const product = this.products.find((product) => product.id === id);

        if (product) {
            return product;
        } else {
            console.error("Not found");
        }
    }

    updateProduct(id, updatedProduct) {
        this.loadFromFile();

        const index = this.products.findIndex((product) => product.id === id);

        if (index !== -1) {
            // Mantengo el ID original
            updatedProduct.id = id;
            this.products[index] = updatedProduct;
            this.saveToFile();
            console.log("Producto actualizado:", updatedProduct);
        } else {
            console.error("Not found");
        }
    }

    deleteProduct(id) {
        this.loadFromFile();

        const index = this.products.findIndex((product) => product.id === id);

        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1)[0];
            this.saveToFile();
            console.log("Producto eliminado:", deletedProduct);
        } else {
            console.error("Not found");
        }
    }

    saveToFile() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data);
        console.log(`Productos guardados en ${this.path}`);
    }

    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            console.log(`Productos cargados desde ${this.path}`);
        } catch (error) {
            console.error('Error al cargar productos desde el archivo:', error.message);
        }
    }
}

// Uso la nueva variable path al crear una instancia de ProductManager
const productManager = new ProductManager('productos.json');

// uso del método addProduct
productManager.addProduct({
    title: "Producto de ejemplo",
    description: "Descripción del producto de ejemplo",
    price: 150,
    thumbnail: "ruta/imagen/ejemplo.jpg",
    code: "abc123",
    stock: 10,
});

//uso del método updateProduct
productManager.updateProduct(1, {
    title: "Producto Actualizado",
    description: "Nueva descripción del producto",
    price: 200,
    thumbnail: "ruta/imagen/actualizada.jpg",
    code: "xyz789",
    stock: 5,
});

//uso del método deleteProduct
productManager.deleteProduct(1);

//uso del método getProducts después de actualizar y eliminar
const updatedProducts = productManager.getProducts();
console.log("Productos después de actualizar y eliminar:", updatedProducts);
