
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Importar base de datos
const { sequelize } = require('./models');

// Middleware básico
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del React build
app.use(express.static(path.join(__dirname, 'client/build')));

// Rutas API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/followups', require('./routes/followups'));
app.use('/api/quotations', require('./routes/quotations'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/resumen', require('./routes/resumen'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/apikeys', require('./routes/apikeys'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/super-admin', require('./routes/super-admin'));
app.use('/api/webhooks', require('./routes/webhooks'));
app.use('/api/users', require('./routes/users'));

// Ruta catch-all: servir el React app para rutas del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Importar seeder de roles
const seedRoles = require("./seeders/seedRoles");

// Sincronizar base de datos y arrancar servidor
sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("✅ Base de datos sincronizada correctamente");
    
    // Ejecutar seeder de roles
    await seedRoles();
    console.log("✅ Roles base creados/verificados");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Servidor CRM corriendo en http://0.0.0.0:${PORT}`);
      console.log(`🚀 Backend API disponible en puerto ${PORT}`);
      console.log(`📱 Frontend React servido desde /client/build`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al sincronizar base de datos:", err);
    process.exit(1);
  });
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/quotations', require('./routes/quotations'));
app.use('/api/followups', require('./routes/followups'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/apikeys', require('./routes/apikeys'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/resumen', require('./routes/resumen'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/automation', require('./routes/automation'));
app.use('/api/webhooks', require('./routes/webhooks'));

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CRM ProSeller API funcionando',
    timestamp: new Date().toISOString()
  });
});

// Servir archivos estáticos del frontend construido
app.use(express.static(path.join(__dirname, 'client/build')));

// Servir el frontend React para todas las rutas no API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor CRM ProSeller ejecutándose en puerto ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
