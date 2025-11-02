/**
 * Serviço de API - TOTVS RM
 * 
 * Serviço para comunicação com a API do TOTVS RM.
 * Usa autenticação Basic (usuário e senha).
 * 
 * @file Serviço de API
 * @author Diego Bueno
 * @version 1.0.0
 */

import axios from 'axios';
import API_CONFIG from '../config/api.config';

// Criar instância do Axios com configurações padrão
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.GENERAL.REQUEST_TIMEOUT,
  headers: API_CONFIG.AUTH_CONFIG.HEADERS,
});

// Interceptor para adicionar autenticação às requisições
apiClient.interceptors.request.use(
  (config) => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    
    if (username && password) {
      // Autenticação Basic: Base64(username:password)
      const credentials = btoa(`${username}:${password}`);
      config.headers.Authorization = `Basic ${credentials}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar erros de resposta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Não autorizado - limpar credenciais
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('user_data');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

/**
 * Fazer login com credenciais de usuário
 * 
 * @param {string} username - Nome de usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise} Dados do usuário
 */
export const loginUser = async (username, password) => {
  try {
    // Criar credenciais Basic Auth
    const credentials = btoa(`${username}:${password}`);
    
    // Fazer requisição para validar usuário
    const response = await apiClient.get(
      `${API_CONFIG.AUTH.USERS}/${username}`,
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    // Armazenar credenciais e dados do usuário
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('user_data', JSON.stringify(response.data));

    if (API_CONFIG.GENERAL.DEBUG) {
      console.log('Login bem-sucedido:', response.data);
    }

    return response.data;
  } catch (error) {
    if (API_CONFIG.GENERAL.DEBUG) {
      console.error('Erro ao fazer login:', error);
    }
    throw error;
  }
};

/**
 * Fazer logout do usuário
 * 
 * @returns {Promise} Resultado do logout
 */
export const logoutUser = async () => {
  try {
    // Limpar dados do localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('user_data');

    if (API_CONFIG.GENERAL.DEBUG) {
      console.log('Logout bem-sucedido');
    }

    return true;
  } catch (error) {
    if (API_CONFIG.GENERAL.DEBUG) {
      console.error('Erro ao fazer logout:', error);
    }
    // Mesmo se houver erro, limpar dados locais
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('user_data');
    throw error;
  }
};

/**
 * Obter informações do usuário autenticado
 * 
 * @returns {Promise} Dados do usuário
 */
export const getUserInfo = async () => {
  try {
    const username = localStorage.getItem('username');
    
    if (!username) {
      throw new Error('Usuário não autenticado');
    }

    const response = await apiClient.get(`${API_CONFIG.AUTH.USERS}/${username}`);
    
    if (API_CONFIG.GENERAL.DEBUG) {
      console.log('Informações do usuário:', response.data);
    }
    
    return response.data;
  } catch (error) {
    if (API_CONFIG.GENERAL.DEBUG) {
      console.error('Erro ao obter informações do usuário:', error);
    }
    throw error;
  }
};

/**
 * Validar se o usuário está autenticado
 * 
 * @returns {boolean} True se autenticado
 */
export const isAuthenticated = () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  return !!(username && password);
};

export default apiClient;
