# Plano de Conversão: React para HTML/CSS/JavaScript + C#

## Análise do Projeto Atual

O projeto SportStats atual está implementado em React com as seguintes características:

### Componentes React Existentes
- **Header.jsx** - Cabeçalho com navegação e pesquisa
- **Footer.jsx** - Rodapé com links
- **MatchCard.jsx** - Card de partida individual
- **StatsCard.jsx** - Card de estatísticas
- **StandingsTable.jsx** - Tabela de classificação
- **StatsChart.jsx** - Gráficos usando Recharts
- **TopScorers.jsx** - Lista de artilheiros
- **SearchResults.jsx** - Dropdown de resultados de pesquisa

### Dependências a Serem Substituídas
- **React** → JavaScript puro com DOM manipulation
- **Tailwind CSS** → CSS customizado
- **shadcn/ui** → Componentes HTML/CSS customizados
- **Recharts** → Chart.js ou Canvas API
- **Lucide React** → Ícones SVG ou Font Awesome

## Estratégia de Conversão

### Frontend (HTML/CSS/JavaScript)
1. **Estrutura HTML** - Criar arquivo index.html com estrutura semântica
2. **Estilos CSS** - Converter classes Tailwind para CSS customizado
3. **JavaScript** - Implementar funcionalidades com vanilla JS
4. **Gráficos** - Usar Chart.js para visualizações
5. **Responsividade** - Media queries CSS

### Backend (C#)
1. **ASP.NET Core Web API** - Para endpoints REST
2. **Entity Framework** - Para gerenciamento de dados
3. **SQL Server/SQLite** - Banco de dados
4. **CORS** - Para comunicação com frontend
5. **Swagger** - Documentação da API

## Estrutura de Arquivos Planejada

```
sports-stats-html/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── styles.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── components/
│   │   └── utils/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   └── lib/
│       └── chart.js
└── backend/
    ├── SportsStatsAPI/
    │   ├── Controllers/
    │   ├── Models/
    │   ├── Services/
    │   └── Data/
    └── SportsStatsAPI.sln
```

## Funcionalidades a Implementar

### Frontend JavaScript
- Sistema de roteamento simples
- Gerenciamento de estado local
- Manipulação do DOM
- Requisições AJAX para API
- Sistema de componentes modular

### Backend C#
- Endpoints para partidas
- Endpoints para classificações
- Endpoints para artilheiros
- Sistema de pesquisa
- Middleware de CORS



## Análise Detalhada dos Componentes

### Estrutura de Dados
O projeto utiliza dados mock bem estruturados:
- **Partidas**: id, homeTeam, awayTeam, scores, status, time, competition
- **Classificação**: name, played, wins, draws, losses, goals, points
- **Artilheiros**: name, team, goals, matches
- **Estatísticas**: gráficos de barras e pizza

### Estado da Aplicação
- **activeTab**: controla abas de partidas (live, today, upcoming)
- **searchQuery**: termo de pesquisa
- **searchResults**: resultados filtrados
- **showResults**: controle do dropdown de pesquisa

### Funcionalidades Principais
1. **Navegação por abas** - Sistema de tabs para diferentes tipos de partidas
2. **Pesquisa em tempo real** - Filtro de times, jogadores e competições
3. **Gráficos interativos** - Visualizações de estatísticas
4. **Design responsivo** - Adaptação para diferentes telas

## Mapeamento de Conversão

### React → JavaScript Puro
- `useState` → Variáveis globais + funções de atualização
- `useEffect` → Event listeners e inicialização
- JSX → Template strings + innerHTML
- Props → Parâmetros de função
- Event handlers → addEventListener

### Tailwind → CSS Customizado
- Classes utilitárias → Propriedades CSS específicas
- Responsive breakpoints → Media queries
- Color palette → Variáveis CSS customizadas
- Spacing system → Valores em rem/px

### Componentes UI → HTML/CSS
- Cards → Divs com classes CSS
- Buttons → Elementos button estilizados
- Inputs → Elementos input com validação
- Tabs → Sistema de navegação com JavaScript

