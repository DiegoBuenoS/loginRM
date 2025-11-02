/**
 * Testes da Página de Login
 * 
 * Testes unitários para a página de login.
 * @file Testes do LoginPage
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import * as apiService from '../services/api.service';

// Mock do serviço de API
vi.mock('../services/api.service');

describe('Página de Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('deve renderizar o formulário de login', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('RM Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('deve validar email obrigatório', async () => {
    render(<LoginPage />);
    
    const button = screen.getByRole('button', { name: 'Entrar' });
    await userEvent.click(button);
    
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
  });

  it('deve validar formato de email', async () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const button = screen.getByRole('button', { name: 'Entrar' });
    
    await userEvent.type(emailInput, 'email_invalido');
    await userEvent.type(passwordInput, 'senha123');
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument();
    });
  });

  it('deve validar senha obrigatória', async () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const button = screen.getByRole('button', { name: 'Entrar' });
    
    await userEvent.type(emailInput, 'usuario@email.com');
    await userEvent.click(button);
    
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
  });

  it('deve validar comprimento mínimo da senha', async () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const button = screen.getByRole('button', { name: 'Entrar' });
    
    await userEvent.type(emailInput, 'usuario@email.com');
    await userEvent.type(passwordInput, '123');
    await userEvent.click(button);
    
    expect(screen.getByText('Senha deve ter no mínimo 6 caracteres')).toBeInTheDocument();
  });

  it('deve fazer login com sucesso', async () => {
    apiService.loginUser.mockResolvedValue({
      access_token: 'token_acesso',
      refresh_token: 'refresh_token',
    });

    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const button = screen.getByRole('button', { name: 'Entrar' });
    
    await userEvent.type(emailInput, 'usuario@email.com');
    await userEvent.type(passwordInput, 'senha123');
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(/Login realizado com sucesso/)).toBeInTheDocument();
    });
  });

  it('deve exibir erro ao falhar login', async () => {
    apiService.loginUser.mockRejectedValue({
      response: {
        status: 401,
        data: { message: 'Email ou senha incorretos' },
      },
    });

    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const button = screen.getByRole('button', { name: 'Entrar' });
    
    await userEvent.type(emailInput, 'usuario@email.com');
    await userEvent.type(passwordInput, 'senha_errada');
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Email ou senha incorretos')).toBeInTheDocument();
    });
  });

  it('deve salvar email quando "Lembrar-me" está marcado', async () => {
    apiService.loginUser.mockResolvedValue({
      access_token: 'token_acesso',
    });

    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const rememberCheckbox = screen.getByRole('checkbox', { name: /Lembrar-me/ });
    const button = screen.getByRole('button', { name: 'Entrar' });
    
    await userEvent.type(emailInput, 'usuario@email.com');
    await userEvent.type(passwordInput, 'senha123');
    await userEvent.click(rememberCheckbox);
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'rememberEmail',
        'usuario@email.com'
      );
    });
  });

  it('deve desabilitar botão durante carregamento', async () => {
    apiService.loginUser.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 1000))
    );

    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const button = screen.getByRole('button', { name: 'Entrar' });
    
    await userEvent.type(emailInput, 'usuario@email.com');
    await userEvent.type(passwordInput, 'senha123');
    await userEvent.click(button);
    
    expect(button).toBeDisabled();
  });
});
