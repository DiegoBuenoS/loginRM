/**
 * Componente Header
 * Cabeçalho do dashboard com informações do usuário.
 */

import React from 'react';
import { User, Bell, Search } from 'lucide-react';

const Header = ({ user, sidebarCollapsed }) => {
  // Extrair nome do usuário de forma segura
  const getUserName = () => {
    if (!user) return 'Usuário';
    
    // Se tiver name.formatted
    if (user.name && typeof user.name === 'object' && user.name.formatted) {
      return user.name.formatted;
    }
    
    // Se tiver givenName
    if (user.name && typeof user.name === 'object' && user.name.givenName) {
      return user.name.givenName;
    }
    
    // Se name for string
    if (typeof user.name === 'string') {
      return user.name;
    }
    
    // Se tiver username
    if (user.username) {
      return user.username;
    }
    
    return 'Usuário';
  };

  // Extrair código do usuário de forma segura
  const getUserCode = () => {
    if (!user) return 'N/A';
    
    // Tentar diferentes campos
    if (user.id) return user.id;
    if (user.code) return user.code;
    if (user.username) return user.username;
    if (user.login) return user.login;
    
    return 'N/A';
  };

  return (
    <header
      className={`
        ${sidebarCollapsed ? 'ml-20' : 'ml-64'}
        fixed top-0 right-0
        bg-white border-b border-gray-200
        transition-all duration-300
        z-40
        shadow-sm
      `}
      style={{ width: sidebarCollapsed ? 'calc(100% - 5rem)' : 'calc(100% - 16rem)' }}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Título da página */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600">Bem-vindo ao painel de controle</p>
          </div>

          {/* Ações do header */}
          <div className="flex items-center space-x-4">
            {/* Busca */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent w-64"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>

            {/* Notificações */}
            <button
              className="relative p-2 text-gray-600 hover:text-gray-900
                       hover:bg-gray-100 rounded-lg transition-colors"
              title="Notificações"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Informações do usuário */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {getUserName()}
                </p>
                <p className="text-xs text-gray-600">
                  Código: <span className="font-mono font-semibold">{getUserCode()}</span>
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700
                            rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
