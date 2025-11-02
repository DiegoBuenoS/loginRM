# Guia de Testes - RM Login

Este documento descreve como executar, escrever e manter testes no projeto RM Login.

## 📋 Índice

1. [Executando Testes](#executando-testes)
2. [Estrutura de Testes](#estrutura-de-testes)
3. [Escrevendo Testes](#escrevendo-testes)
4. [Cobertura de Testes](#cobertura-de-testes)
5. [Boas Práticas](#boas-práticas)

## 🚀 Executando Testes

### Testes em Modo Watch

Execute testes continuamente, reexecutando quando arquivos mudam:

```bash
npm run test:watch
```

### Testes Únicos

Execute todos os testes uma vez:

```bash
npm run test
```

### Testes com Interface Gráfica

Visualize os testes em uma interface interativa:

```bash
npm run test:ui
```

### Cobertura de Testes

Gere relatório de cobertura de código:

```bash
npm run test:coverage
```

## 📁 Estrutura de Testes

Os testes estão organizados próximos aos arquivos que testam:

```
src/
├── components/
│   └── ui/
│       ├── Button.jsx
│       └── Button.test.jsx      # Teste do Button
├── pages/
│   ├── LoginPage.jsx
│   └── LoginPage.test.jsx       # Teste do LoginPage
├── services/
│   ├── api.service.js
│   └── api.service.test.js      # Teste do serviço
└── test/
    └── setup.js                 # Configuração global de testes
```

## ✍️ Escrevendo Testes

### Estrutura Básica

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MeuComponente from './MeuComponente';

describe('MeuComponente', () => {
  it('deve renderizar corretamente', () => {
    render(<MeuComponente />);
    expect(screen.getByText('Texto esperado')).toBeInTheDocument();
  });
});
```

### Testando Componentes React

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('deve chamar onClick quando clicado', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    
    const button = screen.getByRole('button');
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Testando Serviços

```javascript
import { loginUser } from './api.service';
import axios from 'axios';

vi.mock('axios');

describe('loginUser', () => {
  it('deve fazer login com sucesso', async () => {
    axios.post = vi.fn().mockResolvedValue({
      data: { access_token: 'token' }
    });
    
    const result = await loginUser('user@email.com', 'senha');
    
    expect(result.access_token).toBe('token');
  });
});
```

### Testando Validações

```javascript
it('deve validar email', async () => {
  render(<LoginPage />);
  
  const emailInput = screen.getByLabelText('Email');
  const button = screen.getByRole('button', { name: 'Entrar' });
  
  await userEvent.type(emailInput, 'email_invalido');
  await userEvent.click(button);
  
  expect(screen.getByText('Email inválido')).toBeInTheDocument();
});
```

## 📊 Cobertura de Testes

### Verificar Cobertura

```bash
npm run test:coverage
```

Isto gera um relatório em `coverage/` com detalhes de cobertura.

### Metas de Cobertura

Recomendamos:
- **Linhas**: 80%+
- **Funções**: 80%+
- **Branches**: 75%+
- **Statements**: 80%+

## ✨ Boas Práticas

### 1. Nomes Descritivos

```javascript
// ✅ Bom
it('deve exibir mensagem de erro quando email é inválido', () => {});

// ❌ Ruim
it('testa validação', () => {});
```

### 2. Arrange-Act-Assert

```javascript
it('deve fazer login com sucesso', async () => {
  // Arrange - Preparar dados
  const mockResponse = { access_token: 'token' };
  axios.post = vi.fn().mockResolvedValue({ data: mockResponse });
  
  // Act - Executar ação
  const result = await loginUser('user@email.com', 'senha');
  
  // Assert - Verificar resultado
  expect(result.access_token).toBe('token');
});
```

### 3. Testes Isolados

```javascript
// ✅ Bom - Cada teste é independente
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

// ❌ Ruim - Testes dependem uns dos outros
```

### 4. Mock de Dependências Externas

```javascript
// ✅ Bom - Mock do axios
vi.mock('axios');

// ❌ Ruim - Fazer requisições reais
```

### 5. Testes de Usuário

```javascript
// ✅ Bom - Simular ações do usuário
await userEvent.type(input, 'texto');
await userEvent.click(button);

// ❌ Ruim - Manipular DOM diretamente
input.value = 'texto';
```

## 🔍 Queries Recomendadas

Ordem de preferência ao selecionar elementos:

1. **getByRole** - Mais acessível
   ```javascript
   screen.getByRole('button', { name: 'Entrar' })
   ```

2. **getByLabelText** - Para inputs
   ```javascript
   screen.getByLabelText('Email')
   ```

3. **getByPlaceholderText** - Para inputs sem label
   ```javascript
   screen.getByPlaceholderText('Digite aqui')
   ```

4. **getByText** - Para texto visível
   ```javascript
   screen.getByText('Bem-vindo')
   ```

5. **getByTestId** - Último recurso
   ```javascript
   screen.getByTestId('custom-id')
   ```

## 📚 Recursos Úteis

- [Documentação Vitest](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

## 🤝 Contribuindo com Testes

Ao contribuir, certifique-se de:

1. Escrever testes para novas funcionalidades
2. Manter cobertura acima de 80%
3. Executar `npm run test` antes de fazer push
4. Seguir as convenções de nomenclatura
5. Documentar testes complexos

---

**Testes bem escritos = Código confiável! 🎉**
