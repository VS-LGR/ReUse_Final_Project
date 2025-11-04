/**
 * Configurações da aplicação mobile
 * Detecta automaticamente se está em desenvolvimento ou produção
 */

// Detectar se está em desenvolvimento
const isDevelopment = __DEV__ || process.env.NODE_ENV === 'development';

// URL da API baseada no ambiente
// Em desenvolvimento, usa localhost
// Em produção, usa a URL do Vercel ou variável de ambiente
export const API_URL = (() => {
  // Permitir override via variável de ambiente
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // Em desenvolvimento, usar localhost
  if (isDevelopment) {
    // Para Android emulador, usar 10.0.2.2
    // Para iOS simulator, usar localhost
    // Para dispositivo físico, usar IP da máquina
    return 'http://localhost:3000';
  }

  // Em produção, usar URL do Vercel
  // Substitua pela sua URL real do Vercel
  return 'https://reuse-app.vercel.app';
})();

export default {
  API_URL,
  isDevelopment,
};

