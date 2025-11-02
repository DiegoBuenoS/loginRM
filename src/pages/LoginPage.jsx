/**
 * Página de Login - TOTVS RM
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { loginUser } from '../services/api.service';
import API_CONFIG from '../config/api.config';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // Estados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Estados de controle
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  /**
   * Validar email/username
   */
  const validateEmail = (email) => {
    // Para TOTVS RM, pode ser username ou email
    return email.trim().length > 0;
  };

  /**
   * Validar formulário antes de enviar
   */
  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Usuário é obrigatório');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Senha é obrigatória');
      isValid = false;
    } else if (password.length < 3) {
      setPasswordError('Senha deve ter no mínimo 3 caracteres');
      isValid = false;
    }

    return isValid;
  };

  /**
   * Manipular envio do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulário
    if (!validateForm()) {
      return;
    }
    
    // Limpar mensagens apenas se validação passou
    setError('');
    setSuccess('');

    setIsLoading(true);

    try {
      // Fazer login
      const response = await loginUser(email, password);

      // Armazenar preferência de "lembrar-me"
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
      } else {
        localStorage.removeItem('rememberEmail');
      }

      setSuccess('Login realizado com sucesso! Redirecionando...');

      // Redirecionar para dashboard após 1.5 segundos
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      // Tratar diferentes tipos de erro
      if (err.response?.status === 401) {
        setError('Usuário ou senha incorretos');
      } else if (err.response?.status === 404) {
        setError('Usuário não encontrado');
      } else if (err.response?.status === 429) {
        setError('Muitas tentativas de login. Tente novamente mais tarde.');
      } else if (err.code === 'ECONNABORTED') {
        setError('Tempo limite excedido. Verifique sua conexão.');
      } else if (err.message === 'Network Error') {
        setError('Erro de conexão. Verifique sua internet e a URL da API.');
      } else {
        setError(err.response?.data?.message || 'Erro ao fazer login. Tente novamente.');
      }

      if (API_CONFIG.GENERAL.DEBUG) {
        console.error('Erro de login:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Carregar email salvo ao montar componente
   */
  React.useEffect(() => {
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <Lock className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">RM Login</h1>
            <p className="text-gray-600">Autenticação TOTVS RM</p>
          </div>

          {/* Mensagens de status */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start space-x-3">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de usuário */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Usuário
              </label>
              <Input
                id="email"
                type="text"
                placeholder="Digite seu usuário"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                  setError('');
                }}
                error={emailError}
                icon={Mail}
                disabled={isLoading}
              />
            </div>

            {/* Campo de senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                  setError('');
                }}
                error={passwordError}
                icon={Lock}
                disabled={isLoading}
              />
            </div>

            {/* Checkbox "Lembrar-me" */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600">Lembrar-me</span>
              </label>
            </div>

            {/* Botão de login */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Entrar
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600">
            <p>TOTVS RM - Sistema de Gestão</p>
          </div>
        </div>

        {/* Debug info */}
        {API_CONFIG.GENERAL.DEBUG && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
            <p className="font-mono">API: {API_CONFIG.BASE_URL}</p>
            <p className="font-mono">Auth: {API_CONFIG.AUTH_CONFIG.TYPE}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;