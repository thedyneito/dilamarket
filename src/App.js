require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { URL } = require('url');

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ CORS corregido para permitir Vercel y localhost
app.use(cors({
  origin: ['https://dilamarket-ftgv.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// ✅ Verificación de DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL no está definida');
  process.exit(1);
}

let dbUrl;
try {
  dbUrl = new URL(process.env.DATABASE_URL);
} catch (error) {
  console.error('❌ URL inválida:', error.message);
  process.exit(1);
}

// ✅ Conexión a MySQL con pool
const pool = mysql.createPool({
  host: dbUrl.hostname,
  port: dbUrl.port || 3306,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.replace('/', ''),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ✅ Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ Backend Dilamarket funcionando');
});

// ✅ Ruta de productos
app.get('/productos', (req, res) => {
  pool.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      console.error('❌ Error al obtener productos:', err);
      return res.status(500).send('Error al obtener productos');
    }
    res.json(results);
  });
});

// ✅ Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
