/**
 * Configuração de Endpoints da API TOTVS RM
 * 
 * Baseado na documentação oficial:
 * https://tdn.totvs.com/pages/releaseview.action?pageId=419548959
 * 
 * @file Configuração de endpoints da API
 * @author Diego Bueno
 * @version 1.0.0
 */

const API_CONFIG = {
  // URL base da API TOTVS RM
  // Formato: http://{domínio}:{porta}
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8051',

  // Endpoints da API Framework
  AUTH: {
    // Endpoint para autenticação de usuários
    // GET /api/framework/v1/users/{username}
    USERS: '/api/framework/v1/users',
    
    // Endpoint para validar credenciais
    LOGIN: '/api/framework/v1/users',
  },

  // Configurações de autenticação
  AUTH_CONFIG: {
    // TOTVS RM usa autenticação Basic (usuário e senha )
    TYPE: 'basic',
    
    // Contexto da aplicação (geralmente o código da empresa/coligada)
    CONTEXT: import.meta.env.VITE_CONTEXT || '1',
    
    // Headers customizados
    HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },

  // Configurações gerais
  GENERAL: {
    REQUEST_TIMEOUT: 30000,
    DEBUG: import.meta.env.MODE === 'development',
    API_VERSION: 'v1',
  },
};

export default API_CONFIG;
