/**
 * Testes do Serviço de API
 * 
 * Testes unitários para o serviço de requisições HTTP.
 * @file Testes do api.service
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loginUser, logoutUser, getUserInfo } from './api.service';
import axios from 'axios';

// Mock do axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      post: vi.fn(),
      get: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    })),
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe('Serviço de API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('loginUser', () => {
    it('deve fazer login com credenciais válidas', async () => {
      const mockResponse = {
        data: {
          access_token: 'token_acesso',
          refresh_token: 'refresh_token',
          expires_in: 3600,
        },
      };

      axios.post = vi.fn().mockResolvedValue(mockResponse);

      const result = await loginUser('usuario@email.com', 'senha123');

      expect(result).toEqual(mockResponse.data);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'access_token',
        'token_acesso'
      );
    });

    it('deve armazenar refresh token quando fornecido', async () => {
      const mockResponse = {
        data: {
          access_token: 'token_acesso',
          refresh_token: 'refresh_token',
        },
      };

      axios.post = vi.fn().mockResolvedValue(mockResponse);

      await loginUser('usuario@email.com', 'senha123');

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'refresh_token',
        'refresh_token'
      );
    });

    it('deve lançar erro com credenciais inválidas', async () => {
      const mockError = {
        response: {
          status: 401,
          data: { message: 'Credenciais inválidas' },
        },
      };

      axios.post = vi.fn().mockRejectedValue(mockError);

      await expect(loginUser('usuario@email.com', 'senha_errada')).rejects.toThrow();
    });
  });

  describe('logoutUser', () => {
    it('deve fazer logout com sucesso', async () => {
      localStorage.getItem = vi.fn().mockReturnValue('refresh_token');
      axios.post = vi.fn().mockResolvedValue({ data: {} });

      const result = await logoutUser();

      expect(result).toBe(true);
      expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('refresh_token');
    });

    it('deve limpar tokens mesmo se houver erro', async () => {
      localStorage.getItem = vi.fn().mockReturnValue('refresh_token');
      axios.post = vi.fn().mockRejectedValue(new Error('Erro na requisição'));

      await expect(logoutUser()).rejects.toThrow();
      expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('refresh_token');
    });
  });

  describe('getUserInfo', () => {
    it('deve obter informações do usuário', async () => {
      const mockUserInfo = {
        data: {
          sub: '123',
          email: 'usuario@email.com',
          name: 'Usuário Teste',
        },
      };

      axios.get = vi.fn().mockResolvedValue(mockUserInfo);

      const result = await getUserInfo();

      expect(result).toEqual(mockUserInfo.data);
    });

    it('deve lançar erro quando não autorizado', async () => {
      const mockError = {
        response: {
          status: 401,
          data: { message: 'Não autorizado' },
        },
      };

      axios.get = vi.fn().mockRejectedValue(mockError);

      await expect(getUserInfo()).rejects.toThrow();
    });
  });
});
