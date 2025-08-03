
// server/seeders/seedRoles.js
const { Role } = require("../models");

const seedRoles = async () => {
  const rolesBase = [
    {
      name: "owner",
      displayName: "Propietario",
      description: "Acceso total al sistema",
      permissions: {
        dashboard: { read: true, write: true, delete: true },
        leads: { read: true, write: true, delete: true },
        clients: { read: true, write: true, delete: true },
        followups: { read: true, write: true, delete: true },
        users: { read: true, write: true, delete: true },
        settings: { read: true, write: true, delete: true },
        apikeys: { read: true, write: true, delete: true },
        admin: { read: true, write: true, delete: true }
      }
    },
    {
      name: "admin",
      displayName: "Administrador",
      description: "Gestión completa excepto configuración de usuarios",
      permissions: {
        dashboard: { read: true, write: true, delete: false },
        leads: { read: true, write: true, delete: true },
        clients: { read: true, write: true, delete: true },
        followups: { read: true, write: true, delete: true },
        users: { read: true, write: false, delete: false },
        settings: { read: true, write: true, delete: false },
        apikeys: { read: true, write: true, delete: false },
        admin: { read: true, write: false, delete: false }
      }
    },
    {
      name: "manager",
      displayName: "Gerente",
      description: "Supervisión de ventas y equipos",
      permissions: {
        dashboard: { read: true, write: true, delete: false },
        leads: { read: true, write: true, delete: false },
        clients: { read: true, write: true, delete: false },
        followups: { read: true, write: true, delete: false },
        users: { read: true, write: false, delete: false },
        settings: { read: true, write: false, delete: false },
        apikeys: { read: false, write: false, delete: false },
        admin: { read: false, write: false, delete: false }
      }
    },
    {
      name: "vendedor",
      displayName: "Vendedor",
      description: "Gestión de prospectos y clientes asignados",
      permissions: {
        dashboard: { read: true, write: false, delete: false },
        leads: { read: true, write: true, delete: false },
        clients: { read: true, write: true, delete: false },
        followups: { read: true, write: true, delete: false },
        users: { read: false, write: false, delete: false },
        settings: { read: false, write: false, delete: false },
        apikeys: { read: false, write: false, delete: false },
        admin: { read: false, write: false, delete: false }
      }
    },
    {
      name: "viewer",
      displayName: "Visualizador",
      description: "Solo lectura de dashboards y reportes",
      permissions: {
        dashboard: { read: true, write: false, delete: false },
        leads: { read: true, write: false, delete: false },
        clients: { read: true, write: false, delete: false },
        followups: { read: true, write: false, delete: false },
        users: { read: false, write: false, delete: false },
        settings: { read: false, write: false, delete: false },
        apikeys: { read: false, write: false, delete: false },
        admin: { read: false, write: false, delete: false }
      }
    }
  ];

  for (const roleData of rolesBase) {
    const [role, created] = await Role.findOrCreate({
      where: { name: roleData.name },
      defaults: roleData
    });

    if (created) {
      console.log(`✅ Rol creado: ${roleData.name} (${roleData.displayName})`);
    } else {
      console.log(`🔄 Rol ya existe: ${roleData.name}`);
    }
  }
};

module.exports = seedRoles;
