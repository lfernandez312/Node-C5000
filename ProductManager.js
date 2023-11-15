//CONSIGNA Realizar una clase “ProductManager” que gestione un conjunto de productos.
class ProductManager {
  //Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }
  //Cada producto que gestione debe contar con las propiedades:- title (nombre del producto)- description (descripción del producto)- price (precio)- thumbnail (ruta de imagen)- code (código identificador)- stock (número de piezas disponibles)
  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    // Validar que no se repita el campo "code"
    const codeExists = this.products.some((product) => product.code === code);
    if (codeExists) {
      console.error("Ya existe un producto con el mismo código.");
      return;
    }

    const newProduct = {
      id: this.productIdCounter++, //Al agregarlo, debe crearse con un id autoincrementable  
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    console.log("Producto agregado:", newProduct);
  }

  //Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
  getProducts() {
    return this.products;
  }
  //Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (product) {
      return product;
    } else {
      console.error("Not found"); //En caso de no coincidir ningún id, mostrar en consola un error “Not found”  
    }
  }
}

const productManager = new ProductManager();

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

const productById = productManager.getProductById(1);
console.log("Producto por ID:", productById);

const nonExistentProduct = productManager.getProductById(3); // Producto no encontrado
