/**
 * Componente Sidebar
 * Painel lateral de navegação do dashboard.
 */

import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Sidebar = ({ collapsed, onToggle, onLogout, currentPage, onNavigate }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      id: 'pedidos',
      label: 'Pedidos',
      icon: FileText,
      path: '/pedidos',
      badge: '12',
    },
    {
      id: 'notas-fiscais',
      label: 'Notas Fiscais',
      icon: Receipt,
      path: '/notas-fiscais',
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      icon: BarChart3,
      path: '/relatorios',
    },
    {
      id: 'configuracoes',
      label: 'Configurações',
      icon: Settings,
      path: '/configuracoes',
    },
  ];

  return (
    <div
      className={`
        ${collapsed ? 'w-20' : 'w-64'}
        bg-gradient-to-b from-blue-900 to-blue-800
        text-white
        transition-all duration-300
        flex flex-col
        h-screen
        fixed left-0 top-0
        shadow-xl
        z-50
      `}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-blue-700">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RM</span>
            </div>
            <span className="font-bold text-lg">TOTVS RM</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          title={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-blue-700 text-white shadow-lg'
                        : 'text-blue-100 hover:bg-blue-700/50 hover:text-white'
                    }
                  `}
                  title={collapsed ? item.label : ''}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left font-medium">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer - Logout */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg
                     text-blue-100 hover:bg-red-600 hover:text-white
                     transition-all duration-200"
          title={collapsed ? 'Sair' : ''}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="font-medium">Sair</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
