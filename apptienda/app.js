const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

require('./routes/produto.route')(app);
require('./routes/venta.route')(app);
require('./routes/compra.route')(app);

const puerto = 3030;

app.listen(puerto, () => {
    console.log(`API escuchando por el puerto ${puerto}`)
});