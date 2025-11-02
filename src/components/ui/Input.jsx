/**
 * Componente Input
 * 
 * Campo de entrada de texto reutilizável com estilos modernos.
 * Suporta diferentes tipos de input e estados de validação.
 * 
 * @component
 * @example
 * <Input type="email" placeholder="seu@email.com" error="Email inválido" />
 */

import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(
  ({ className, type = 'text', error, icon: Icon, ...props }, ref) => (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon size={20} />
        </div>
      )}
      <input
        type={type}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 transition-all duration-200',
          'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
          'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          Icon && 'pl-10',
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
);

Input.displayName = 'Input';

export default Input;
