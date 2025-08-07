// Configuración de la API para Create React App

// Usamos la variable de entorno de CRA, o el origin como respaldo
const getApiUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // En producción o si no se define, usa la URL del frontend
  return window.location.origin;
};

export const API_URL = getApiUrl();

const apiConfig = {
  API_URL,
};

export default apiConfig;
