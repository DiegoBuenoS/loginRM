# Guia de Contribuição - RM Login

Obrigado por considerar contribuir para o RM Login! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## Código de Conduta

Todos os contribuidores devem seguir nosso Código de Conduta. Esperamos comportamento profissional e respeitoso em todas as interações.

## Como Contribuir

### Reportando Bugs

Antes de criar um relatório de bug, verifique a lista de issues, pois você pode descobrir que o bug já foi reportado. Ao criar um relatório de bug, inclua o máximo de detalhes possível:

- **Use um título descritivo** para a issue
- **Descreva os passos exatos** que reproduzem o problema
- **Forneça exemplos específicos** para demonstrar os passos
- **Descreva o comportamento observado** e aponte o que exatamente é o problema
- **Explique qual era o comportamento esperado**
- **Inclua screenshots** se possível
- **Mencione sua versão do Node.js e navegador**

### Sugerindo Melhorias

Sugestões de melhorias são sempre bem-vindas! Ao criar uma sugestão de melhoria, inclua:

- **Use um título descritivo**
- **Forneça uma descrição detalhada** da melhoria sugerida
- **Liste alguns exemplos** de como a melhoria seria útil
- **Mencione outras aplicações** que implementam algo similar

### Pull Requests

- Preencha o template fornecido
- Siga os estilos de código do projeto
- Inclua comentários apropriados no código
- Termine todos os arquivos com uma nova linha
- Evite commits muito grandes - mantenha-os focados

## Processo de Desenvolvimento

### 1. Fork e Clone

```bash
git clone https://github.com/seu-usuario/rm_login.git
cd rm_login
```

### 2. Crie uma Branch

```bash
git checkout -b feature/sua-feature-aqui
```

Use nomes descritivos para suas branches:
- `feature/adicionar-autenticacao-2fa` para novas funcionalidades
- `fix/corrigir-validacao-email` para correções de bugs
- `docs/atualizar-readme` para documentação
- `refactor/melhorar-performance` para refatorações

### 3. Faça suas Mudanças

- Escreva código limpo e bem documentado
- Adicione comentários em português para lógica complexa
- Siga as convenções de nomenclatura do projeto
- Teste suas mudanças localmente

### 4. Commit suas Mudanças

```bash
git add .
git commit -m "Descrição clara e concisa da mudança"
```

Use mensagens de commit em português e seja descritivo:
- ✅ `Adicionar validação de email em tempo real`
- ❌ `Corrigir bug`

### 5. Push para sua Fork

```bash
git push origin feature/sua-feature-aqui
```

### 6. Abra um Pull Request

- Descreva claramente qual problema seu PR resolve
- Inclua referências a issues relacionadas
- Adicione screenshots se fizer mudanças na UI
- Aguarde revisão

## Estilos de Código

### JavaScript/React

- Use `const` por padrão, `let` quando necessário
- Use arrow functions
- Adicione comentários JSDoc para funções
- Use nomes descritivos para variáveis

```javascript
/**
 * Valida um email
 * @param {string} email - Email a validar
 * @returns {boolean} True se email é válido
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### CSS/Tailwind

- Use classes Tailwind quando possível
- Evite CSS inline
- Use nomes descritivos para classes customizadas
- Mantenha especificidade baixa

### Documentação

- Escreva em português brasileiro
- Use Markdown para formatação
- Inclua exemplos de código quando apropriado
- Mantenha links atualizados

## Checklist para Pull Request

Antes de submeter seu PR, verifique:

- [ ] Meu código segue os estilos de código do projeto
- [ ] Executei `npm run lint` (se disponível)
- [ ] Adicionei testes para novas funcionalidades
- [ ] Atualizei a documentação conforme necessário
- [ ] Minhas mudanças não quebram nenhum teste existente
- [ ] Adicionei comentários úteis no meu código
- [ ] Removi código de debug e console.log desnecessários

## Perguntas?

Sinta-se livre para abrir uma issue com a tag `pergunta` ou entrar em contato com os mantenedores.

---

**Obrigado por contribuir para o RM Login! 🎉**
