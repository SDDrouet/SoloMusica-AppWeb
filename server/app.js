const express = require('express');
const app = express();

const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv/config')

app.use(cors({ origin : true }));

// Convertimos los datos en json
app.use(express.json());

app.get('/', (req, res) => {
    return res.json('Hello Worlddd');
});

// Ruta de autenticación del usaurio
const authRoutes = require('./routes/auth');
app.use('/api/users', authRoutes);

// Artist routes
const artistRoutes = require('./routes/artist');
app.use('/api/artists', artistRoutes);

// Album routes
const albumRoutes = require('./routes/albums');
app.use('/api/albums', albumRoutes);

// Song routes
const songRoutes = require('./routes/songs');
app.use('/api/songs', songRoutes);

 // Connect to MongoDB
 mongoose.connect(process.env.DB_CONECTION_STRING, { useNewUrlParser: true });
 mongoose.connection
 .once('open', () => { console.log('Conectado a MongoDB') })
 .on('error', (error) => { console.log('Error al conectar a MongoDB', error) });

app.listen(4010, () => {
  console.log('Server is running on port 4010');
});