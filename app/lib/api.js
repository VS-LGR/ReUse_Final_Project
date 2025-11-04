import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Cliente API centralizado para comunicação com o backend Next.js
 */

/**
 * Faz uma requisição para a API
 * @param {string} endpoint - Endpoint da API (ex: '/api/auth/login')
 * @param {object} options - Opções do fetch (method, body, headers, etc)
 * @returns {Promise<Response>}
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Adicionar token de autenticação se existir
  const token = await AsyncStorage.getItem('@auth_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Se não for JSON, retornar a resposta diretamente
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return response;
    }

    const data = await response.json();
    
    // Se a resposta não foi ok, lançar erro
    if (!response.ok) {
      const error = new Error(data.error || 'Request failed');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return { ok: true, data, status: response.status };
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Login do usuário
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} Dados do usuário
 */
export async function login(email, password) {
  const response = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    // Salvar dados do usuário no AsyncStorage
    await AsyncStorage.setItem('@logged_in_user', JSON.stringify(response.data));
    return response.data;
  }

  throw new Error(response.data?.error || 'Login failed');
}

/**
 * Registro de novo usuário
 * @param {object} userData - Dados do usuário (name, email, password, etc)
 * @returns {Promise<object>} Dados do usuário criado
 */
export async function register(userData) {
  const response = await apiRequest('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    return response.data;
  }

  throw new Error(response.data?.error || 'Registration failed');
}

/**
 * Buscar dados de um usuário
 * @param {string} userId - ID do usuário
 * @returns {Promise<object>} Dados do usuário
 */
export async function getUser(userId) {
  const response = await apiRequest(`/api/users/${userId}`);

  if (response.ok) {
    return response.data;
  }

  throw new Error(response.data?.error || 'Failed to fetch user');
}

/**
 * Atualizar XP do usuário
 * @param {string} userId - ID do usuário
 * @param {number} amount - Quantidade de XP a adicionar
 * @returns {Promise<object>} Dados atualizados do usuário
 */
export async function updateXP(userId, amount) {
  const response = await apiRequest(`/api/users/${userId}/xp`, {
    method: 'PATCH',
    body: JSON.stringify({ amount }),
  });

  if (response.ok) {
    return response.data;
  }

  throw new Error(response.data?.error || 'Failed to update XP');
}

/**
 * Verificar se o usuário está logado
 * @returns {Promise<object|null>} Dados do usuário ou null
 */
export async function getLoggedInUser() {
  try {
    const userData = await AsyncStorage.getItem('@logged_in_user');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error('Error getting logged in user:', error);
    return null;
  }
}

/**
 * Logout do usuário
 */
export async function logout() {
  await AsyncStorage.removeItem('@logged_in_user');
  await AsyncStorage.removeItem('@auth_token');
}

