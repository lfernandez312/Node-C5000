import express from 'express';
import { promises as fs } from 'fs';

const app = express();
const port = 8080;
const urlProducts = '/products';
const productosJsonPath = 'productos.json';

// Obtener todos los productos o limitar por el parámetro de consulta 'limit'
app.get(urlProducts, async (req, res) => {
    try {
        const data = await fs.readFile(productosJsonPath, 'utf8');
        const allProducts = JSON.parse(data);
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;
        const products = limit ? allProducts.slice(0, limit) : allProducts;
        res.json(products);
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
        const data = await fs.readFile(productosJsonPath, 'utf8');
        const allProducts = JSON.parse(data);
        const product = allProducts.find((p) => p.id === productId);

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