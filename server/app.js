const express = require('express');
const app = express();

const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv/config')

app.use(cors({ origin : true }));

app.get('/', (req, res) => {
    return res.json('Hello World');
});

// Ruta de autenticación del usaurio
const authRoutes = require('./routes/auth');
app.use('/api/users', authRoutes);

 // Connect to MongoDB
 mongoose.connect(process.env.DB_CONECTION_STRING, { useNewUrlParser: true });
 mongoose.connection
 .once('open', () => { console.log('Conectado a MongoDB') })
 .on('error', (error) => { console.log('Error al conectar a MongoDB', error) });

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});