import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8080;
const urlProducts = '/products';

// Instanciamos la clase ProductManager
const productManager = new ProductManager('productos.json');

app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

// Obtener todos los productos o limitar por el parámetro de consulta 'limit'
app.get(`${urlProducts}`, async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts(limit);
        res.json({ products });
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).json({ error: 'El archivo productos.json no existe, ejecute primero el archivo ProductManager.js para crear productos' });
        } else {
            res.status(500).json({ error: 'Error al obtener los productos' });
        }
    }
});

// Obtener un producto específico por su ID
app.get(`${urlProducts}/:pid`, async (req, res) => {
    try {
        const productId = parseInt(req.params.pid, 10);
        const product = await productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).json({ error: 'El archivo productos.json no existe, ejecute primero el archivo ProductManager.js para crear productos' });
        } else {
            res.status(500).json({ error: 'Error al obtener el producto' });
        }
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}${urlProducts}`);
});
