
const { ApiKey } = require("../models");

const checkApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'] || req.query.api_key;

    if (!apiKey) {
      return res.status(401).json({ message: "API Key requerida" });
    }

    const keyRecord = await ApiKey.findOne({
      where: { 
        key: apiKey,
        isActive: true 
      }
    });

    if (!keyRecord) {
      return res.status(401).json({ message: "API Key inválida o inactiva" });
    }

    // Adjuntar información básica a la request
    req.user = {
      id: keyRecord.userId || null,
      apiKeyPermissions: keyRecord.permissions
    };

    req.apiKey = {
      id: keyRecord.id,
      key: keyRecord.key,
      permissions: keyRecord.permissions
    };

    next();
  } catch (error) {
    console.error("Error verificando API Key:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = checkApiKey;
