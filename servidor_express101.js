import express from 'express';
import url from 'url';

const app = express();

// Ruta principal
app.get('/', (req, res) => {
    const p = { "titulo": "Hola mundo", "author": "patob" };
    res.status(200).json(p); // Devuelve el objeto como JSON
});

// Ruta para manejar los parámetros de consulta
app.get('/verificar', (req, res) => {
    const queryParams = req.query;

    if (queryParams.a == 1 && queryParams.b == 2) {
        res.send('si me viste es porque a=1 y b=2');
    } else {
        res.send('si me viste es porque a NO ES =1 y b NO ES = 2');
    }
});

const puerto = 1984;

app.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
});
