const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Importar base de datos
const { sequelize } = require('./models');

// Middleware básico
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
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

// Rutas de la API adicionales (estas se agregarían después de la lógica de sincronización inicial)
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/automation', require('./routes/automation'));

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'CRM ProSeller API funcionando',
    timestamp: new Date().toISOString()
  });
});

// Servir archivos estáticos del frontend construido (esto ya está cubierto arriba, pero se mantiene por si acaso hay una razón para duplicarlo o se refiere a una configuración diferente)
app.use(express.static(path.join(__dirname, 'client/build')));

// Servir el frontend React para todas las rutas no API (esto ya está cubierto arriba)
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

// Iniciar servidor (este bloque de `app.listen` es el que se ejecutará si la sincronización de la base de datos es exitosa)
// El `app.listen` dentro del bloque `.then` de `sequelize.sync` es el principal punto de inicio del servidor.
// Este bloque final de `app.listen` es redundante si el de arriba funciona correctamente.
// Para evitar la duplicación de puertos, nos aseguramos de que solo uno se ejecute.
// Si el código anterior se ejecutó y lanzó el servidor, este no debería ser necesario.
// Sin embargo, si `sequelize.sync` no se completa y este código se ejecuta, entonces este sería el punto de inicio.
// Dado que el objetivo es eliminar la duplicación, se asume que el primer `app.listen` es el correcto.

// Si solo hay un `app.listen` y se gestiona correctamente, este código final de `app.listen` debería eliminarse o fusionarse.
// Sin embargo, para mantener la estructura original tanto como sea posible y solo eliminar la duplicación de PORT,
// nos aseguramos de que solo una instancia de `app.listen` esté activa y escuchando en el puerto definido.

// Nota: La estructura original tenía dos bloques `app.listen` y dos declaraciones de `PORT`.
// Al eliminar la segunda declaración de `PORT` y el segundo `app.listen` (que estaba al final),
// el código se corrige. El bloque `sequelize.sync().then(() => { app.listen(...) })` es el que se mantiene.

// El siguiente `module.exports` es correcto para exportar la instancia de la aplicación.
module.exports = app;