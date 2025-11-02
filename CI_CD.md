# Guia de CI/CD - RM Login

Este documento descreve a configuração de Integração Contínua e Entrega Contínua (CI/CD) do projeto RM Login.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [GitHub Actions](#github-actions)
3. [Pipelines Configurados](#pipelines-configurados)
4. [Variáveis de Ambiente](#variáveis-de-ambiente)
5. [Deploy](#deploy)
6. [Troubleshooting](#troubleshooting)

## 🎯 Visão Geral

O projeto utiliza **GitHub Actions** para automatizar:

- ✅ Execução de testes
- ✅ Verificação de código
- ✅ Build do projeto
- ✅ Deploy automático
- ✅ Análise de segurança

## 🔄 GitHub Actions

### Workflows Disponíveis

O projeto contém dois workflows principais:

#### 1. **CI Pipeline** (`.github/workflows/ci.yml`)

Executado em cada push e pull request para `main` e `develop`.

**Jobs:**
- **test**: Executa testes em Node 18 e 20
- **build**: Faz build do projeto
- **security**: Verifica vulnerabilidades
- **code-quality**: Valida qualidade de código

#### 2. **Deploy Pipeline** (`.github/workflows/deploy.yml`)

Executado automaticamente após sucesso do CI na branch `main`.

**Jobs:**
- **deploy**: Deploy para Vercel ou Netlify (opcional)

## 📊 Pipelines Configurados

### Pipeline de Testes

```
Push/PR → Instalar → Lint → Testes → Cobertura → Codecov
```

**Detalhes:**
- Executa em múltiplas versões do Node.js
- Gera relatório de cobertura
- Envia para Codecov (opcional)

### Pipeline de Build

```
Testes OK → Instalar → Build → Upload Artefato
```

**Detalhes:**
- Só executa se testes passarem
- Armazena build por 5 dias
- Pronto para deploy

### Pipeline de Segurança

```
npm audit → Verificar dependências desatualizadas
```

**Detalhes:**
- Verifica vulnerabilidades moderadas
- Lista dependências desatualizadas
- Continua mesmo se houver avisos

## 🔐 Variáveis de Ambiente

### Configurar Secrets no GitHub

1. Acesse seu repositório no GitHub
2. Vá para **Settings → Secrets and variables → Actions**
3. Clique em **New repository secret**
4. Adicione as seguintes variáveis:

#### Para Deploy em Vercel

```
VERCEL_TOKEN          # Token de autenticação Vercel
VERCEL_ORG_ID         # ID da organização Vercel
VERCEL_PROJECT_ID     # ID do projeto Vercel
```

#### Para Deploy em Netlify

```
NETLIFY_AUTH_TOKEN    # Token de autenticação Netlify
NETLIFY_SITE_ID       # ID do site Netlify
```

#### Para Codecov (Opcional)

```
CODECOV_TOKEN         # Token Codecov para upload de cobertura
```

### Obter Tokens

**Vercel:**
1. Acesse [vercel.com](https://vercel.com)
2. Vá para Settings → Tokens
3. Crie um novo token

**Netlify:**
1. Acesse [netlify.com](https://netlify.com)
2. Vá para User settings → Applications → Personal access tokens
3. Crie um novo token

**Codecov:**
1. Acesse [codecov.io](https://codecov.io)
2. Conecte seu repositório GitHub
3. Copie o token fornecido

## 🚀 Deploy

### Deploy Manual

Para fazer deploy manual sem esperar o CI/CD:

```bash
# Build local
npm run build

# Deploy em Vercel
vercel --prod

# Deploy em Netlify
netlify deploy --prod
```

### Deploy Automático

O deploy automático ocorre quando:

1. ✅ Testes passam com sucesso
2. ✅ Build é concluído
3. ✅ Push é feito na branch `main`

### Monitorar Deploy

1. Acesse a aba **Actions** do seu repositório
2. Clique no workflow mais recente
3. Veja os logs de cada job

## 📈 Métricas e Relatórios

### Cobertura de Testes

Após cada execução de testes:

1. Acesse [codecov.io](https://codecov.io)
2. Selecione seu repositório
3. Veja a cobertura por arquivo

### Status do Build

Adicione um badge ao README:

```markdown
![CI/CD](https://github.com/seu-usuario/rm_login/actions/workflows/ci.yml/badge.svg)
```

## 🔧 Customizar Workflows

### Alterar Versões do Node.js

Edite `.github/workflows/ci.yml`:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # Adicione versões
```

### Adicionar Novo Job

```yaml
my-job:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Fazer algo
      run: echo "Fazendo algo"
```

### Executar Job Condicionalmente

```yaml
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
```

## 🐛 Troubleshooting

### Testes Falhando no CI mas Passando Localmente

**Causa comum:** Diferenças de ambiente

**Solução:**
```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install

# Executar testes como no CI
npm run test
```

### Build Falhando

**Verificar:**
1. Todos os testes passam? `npm run test`
2. Lint passa? `npm run lint`
3. Build local funciona? `npm run build`

### Deploy Não Está Acontecendo

**Verificar:**
1. Secrets estão configurados?
2. Workflow está ativo?
3. Branch é `main`?
4. CI passou com sucesso?

### Timeout em Testes

**Aumentar timeout:**

```javascript
it('teste lento', async () => {
  // teste
}, 10000); // 10 segundos
```

## 📚 Recursos Úteis

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vitest CI Guide](https://vitest.dev/guide/ci.html)
- [Vercel GitHub Integration](https://vercel.com/docs/git)
- [Netlify CI/CD](https://docs.netlify.com/configure-builds/overview/)

## ✅ Checklist de Setup

- [ ] Repositório criado no GitHub
- [ ] Workflows copiados para `.github/workflows/`
- [ ] Secrets configurados (se usando deploy)
- [ ] Testes passando localmente
- [ ] Lint passando localmente
- [ ] Build passando localmente
- [ ] Primeiro push feito
- [ ] Verificar aba Actions
- [ ] Deploy funcionando (se configurado)

---

**CI/CD bem configurado = Deployments confiáveis! 🚀**
