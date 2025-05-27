const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Fisica2023*',
  database: 'auth_db',
  port: 3306
});

// Conectar a MySQL
connection.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Ruta de ejemplo
app.get('/api/datos', (req, res) => {
  connection.query('SELECT * FROM tabla_ejemplo', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//  Aquí agregas el nuevo endpoint de login 
app.post('/api/login', (req, res) => {
  console.log('Datos recibidos:', req.body);
  
  if (!req.body.email || !req.body.password) {
    console.log('Faltan credenciales');
    return res.status(400).json({ message: 'Email y password requeridos' });
  }

  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [req.body.email],
    (err, results) => {
      if (err) {
        console.error('Error en BD:', err);
        return res.status(500).json({ message: 'Error en servidor' });
      }
      
      console.log('🔍 Resultados BD:', results);
      
      if (results.length === 0) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }
      
      const user = results[0];
      // Comparación SIN encriptar (solo para debug)
      if (user.password !== req.body.password) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      console.log('✅ Login exitoso para:', user.email);
      res.json({ 
        token: 'token-de-prueba', 
        user: { id: user.id, email: user.email } 
      });
    }
  );
});

// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});