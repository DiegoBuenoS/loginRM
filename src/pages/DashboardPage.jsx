/**
 * Página de Dashboard
 * Painel de controle principal do sistema.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { logoutUser, isAuthenticated } from '../services/api.service';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  FileText,
  Users,
} from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(null);

  // Verificar autenticação ao carregar
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
      return;
    }

    // Carregar dados do usuário
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }

    // Se não houver dados, usar username como fallback
    if (!userData) {
      const username = localStorage.getItem('username');
      setUser({ username, id: username });
    }
  }, [navigate]);

  // Lidar com logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      navigate('/');
    }
  };

  // Lidar com navegação
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    console.log('Navegando para:', pageId);
  };

  // Cards de estatísticas
  const statsCards = [
    {
      title: 'Vendas Hoje',
      value: 'R$ 12.450,00',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'blue',
    },
    {
      title: 'Pedidos Abertos',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: ShoppingCart,
      color: 'green',
    },
    {
      title: 'NFs Emitidas',
      value: '156',
      change: '-5.2%',
      trend: 'down',
      icon: FileText,
      color: 'purple',
    },
    {
      title: 'Clientes Ativos',
      value: '1.248',
      change: '+8.1%',
      trend: 'up',
      icon: Users,
      color: 'orange',
    },
  ];

  // Renderizar conteúdo baseado na página atual
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Cards de estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((card, index) => {
                const Icon = card.icon;
                const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown;
                const colorClasses = {
                  blue: 'bg-blue-500',
                  green: 'bg-green-500',
                  purple: 'bg-purple-500',
                  orange: 'bg-orange-500',
                };

                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6
                             hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${colorClasses[card.color]}`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <div
                        className={`flex items-center space-x-1 text-sm font-medium
                                  ${
                                    card.trend === 'up'
                                      ? 'text-green-600'
                                      : 'text-red-600'
                                  }`}
                      >
                        <TrendIcon size={16} />
                        <span>{card.change}</span>
                      </div>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">
                      {card.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Gráficos e tabelas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vendas Recentes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Vendas Recentes
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          Pedido #{1000 + item}
                        </p>
                        <p className="text-sm text-gray-600">Cliente ABC Ltda</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          R$ {(Math.random() * 5000 + 1000).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-600">Hoje, 14:30</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Produtos Mais Vendidos */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Produtos Mais Vendidos
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Produto A', qty: 145, value: 12500 },
                    { name: 'Produto B', qty: 98, value: 8900 },
                    { name: 'Produto C', qty: 76, value: 6800 },
                    { name: 'Produto D', qty: 54, value: 4200 },
                    { name: 'Produto E', qty: 32, value: 2800 },
                  ].map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          {product.qty} unidades
                        </p>
                      </div>
                      <div className="w-32">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(product.qty / 145) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-24 text-right">
                        <p className="font-semibold text-gray-900">
                          R$ {product.value.toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'pedidos':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pedidos</h2>
            <p className="text-gray-600">
              Funcionalidade de pedidos será implementada em breve.
            </p>
          </div>
        );

      case 'notas-fiscais':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Notas Fiscais</h2>
            <p className="text-gray-600">
              Funcionalidade de notas fiscais será implementada em breve.
            </p>
          </div>
        );

      case 'relatorios':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Relatórios</h2>
            <p className="text-gray-600">
              Funcionalidade de relatórios será implementada em breve.
            </p>
          </div>
        );

      case 'configuracoes':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configurações</h2>
            <p className="text-gray-600">
              Funcionalidade de configurações será implementada em breve.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Header */}
      <Header user={user} sidebarCollapsed={sidebarCollapsed} />

      {/* Main Content */}
      <main
        className={`
          ${sidebarCollapsed ? 'ml-20' : 'ml-64'}
          mt-20
          p-6
          transition-all duration-300
        `}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardPage;
