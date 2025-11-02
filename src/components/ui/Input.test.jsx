/**
 * Testes do Componente Input
 * 
 * Testes unitários para o componente Input.
 * @file Testes do Input
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Componente Input', () => {
  it('deve renderizar um input', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    
    expect(input).toBeInTheDocument();
  });

  it('deve aceitar valor inicial', () => {
    render(<Input value="teste" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveValue('teste');
  });

  it('deve chamar onChange quando o valor muda', async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'novo valor');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('deve renderizar placeholder quando fornecido', () => {
    render(<Input placeholder="Digite aqui" />);
    const input = screen.getByPlaceholderText('Digite aqui');
    
    expect(input).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando fornecida', () => {
    render(<Input error="Email inválido" />);
    
    expect(screen.getByText('Email inválido')).toBeInTheDocument();
  });

  it('deve aplicar classe de erro ao input quando há erro', () => {
    render(<Input error="Erro" />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveClass('border-red-500');
  });

  it('deve desabilitar o input quando disabled é true', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    
    expect(input).toBeDisabled();
  });

  it('deve aceitar diferentes tipos de input', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveAttribute('type', 'email');
  });

  it('deve renderizar ícone quando fornecido', () => {
    const IconComponent = () => <span>Ícone</span>;
    render(<Input icon={IconComponent} />);
    
    expect(screen.getByText('Ícone')).toBeInTheDocument();
  });

  it('deve aplicar padding esquerdo quando há ícone', () => {
    const IconComponent = () => <span>Ícone</span>;
    render(<Input icon={IconComponent} />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveClass('pl-10');
  });
});
