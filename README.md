# Overview

Front end do SGI (Sistema de Gerenciamento Integrado) da rede de postos Graciosa

### Ambientes:

- Homologação: https://sgi-api-homologacao.onrender.com

- Produção: https://sgi-api-producao.onrender.com

### Tech Stack:

- Vite, uma ferramenta de front-end para construir aplicações web 

- React.js, uma ferramenta para construir componentes de UI

- Bootstrap CSS, uma ferramenta de frontend com recursos avançados

### Padrões nos nomes de branches:

#### Composição:

- ```<categoria>/<o que a branch faz em si>```

#### Categorias

- docs/ apenas mudanças de documentação;

- feature/ O nome já diz também o que é, uma nova feature que será adicionada ao projeto, componente e afins;

- fix/ a correção de um bug;

- perf/ mudança de código focada em melhorar performance;

- refactor/ mudança de código que não adiciona uma funcionalidade e também não corrigi um bug;

- style/ mudanças no código que não afetam seu significado (espaço em branco, formatação, ponto e vírgula, etc);

- test/ adicionar ou corrigir testes.

- improvement/ Uma melhoria em algo já existente, seja de performance, de escrita, de layout, etc.

#### exemplos:

- refactor/create-password

- feature/insert-or-update-scales

- fix/scale-calculate

### Padrões nos nomes dos Commits:

#### Composição:

- ```<categoria>: <o que a branch faz em si>```

#### Categorias:

- docs: apenas mudanças de documentação;

- feat: O nome já diz também o que é, uma nova feature que será adicionada ao projeto, componente e afins;

- fix: a correção de um bug;

- perf: mudança de código focada em melhorar performance;

- refactor: mudança de código que não adiciona uma funcionalidade e também não corrigi um bug;

- style: mudanças no código que não afetam seu significado (espaço em branco, formatação, ponto e vírgula, etc);

- test: adicionar ou corrigir testes.

- improvement: Uma melhoria em algo já existente, seja de performance, de escrita, de layout, etc.

#### Exemplos:

- refactor: create password

- feature: insert or update scales

- fix: scale calculate

# Iniciando

### Clonando o projeto:

```bash
git clone https://github.com/postos-graciosa-ti/sgi-front.git
```

### Adicionando o arquivo .env:

```bash
cd sgi-front
```

```bash
VITE_API_BASE_URL=your-api-url
```

### Instalando as dependências:

```bash
npm install
```

### Rodando o projeto localmente:

```bash
npm run dev
```