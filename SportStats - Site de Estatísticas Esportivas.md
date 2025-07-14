# SportStats - Site de Estatísticas Esportivas

## 📋 Descrição do Projeto

SportStats é uma aplicação web completa para acompanhamento de estatísticas esportivas em tempo real, desenvolvida com HTML, CSS, JavaScript puro no frontend e ASP.NET Core C# no backend. O projeto foi convertido de uma aplicação React original para demonstrar a implementação usando tecnologias web tradicionais.

## 🚀 Funcionalidades Principais

### Frontend
- **Interface Responsiva**: Design moderno que se adapta a diferentes dispositivos
- **Estatísticas em Tempo Real**: Cards dinâmicos com dados atualizados
- **Sistema de Pesquisa**: Busca por times, jogadores e competições
- **Navegação por Abas**: Partidas ao vivo, hoje e próximas
- **Tabela de Classificação**: Classificação completa com indicadores visuais
- **Lista de Artilheiros**: Top scorers com estatísticas detalhadas
- **Gráficos Interativos**: Visualizações de dados com Chart.js
- **Sistema de Cache**: Otimização de performance com cache local

### Backend
- **API RESTful**: Endpoints completos para todas as funcionalidades
- **Entity Framework**: ORM para gerenciamento de dados
- **Swagger UI**: Documentação interativa da API
- **CORS**: Configurado para integração com frontend
- **Seeding de Dados**: População automática do banco com dados de exemplo
- **DTOs**: Objetos de transferência de dados bem estruturados

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna com variáveis CSS e flexbox/grid
- **JavaScript ES6+**: Funcionalidades interativas e integração com API
- **Chart.js**: Biblioteca para gráficos
- **Fetch API**: Requisições HTTP

### Backend
- **ASP.NET Core 8.0**: Framework web
- **Entity Framework Core**: ORM
- **C#**: Linguagem de programação
- **Swagger/OpenAPI**: Documentação da API
- **In-Memory Database**: Para demonstração

## 📁 Estrutura do Projeto

```
sports-stats-html/
├── frontend/
│   ├── index.html              # Página principal
│   ├── css/
│   │   ├── styles.css          # Estilos principais
│   │   └── responsive.css      # Estilos responsivos
│   ├── js/
│   │   ├── main-api.js         # Aplicação principal
│   │   ├── utils/
│   │   │   ├── api.js          # Serviço de API
│   │   │   └── data.js         # Dados mock
│   │   └── components/
│   │       ├── search.js       # Componente de pesquisa
│   │       ├── tabs-api.js     # Componente de abas
│   │       └── charts.js       # Componente de gráficos
│   └── assets/                 # Imagens e ícones
└── backend/
    └── SportsStatsAPI/
        ├── Controllers/        # Controllers da API
        ├── Models/            # Modelos de dados
        ├── DTOs/              # Data Transfer Objects
        ├── Data/              # Contexto e seeding
        └── Program.cs         # Configuração da aplicação
```

## 🔧 Como Executar

### Pré-requisitos
- .NET 8.0 SDK
- Python 3.x (para servidor HTTP simples)
- Navegador web moderno

### Backend (API)
```bash
cd sports-stats-html/backend/SportsStatsAPI
dotnet restore
dotnet build
dotnet run
```
A API estará disponível em: `http://localhost:5000`
Swagger UI: `http://localhost:5000`

### Frontend
```bash
cd sports-stats-html/frontend
python3 -m http.server 8080
```
O site estará disponível em: `http://localhost:8080`

## 📊 Endpoints da API

### Partidas
- `GET /api/Matches` - Lista todas as partidas
- `GET /api/Matches/{id}` - Detalhes de uma partida
- `GET /api/Matches/live` - Partidas ao vivo
- `GET /api/Matches/today` - Partidas de hoje
- `GET /api/Matches/upcoming` - Próximas partidas

### Times
- `GET /api/Teams` - Lista todos os times
- `GET /api/Teams/{id}` - Detalhes de um time
- `GET /api/Teams/{id}/matches` - Partidas de um time
- `GET /api/Teams/{id}/players` - Jogadores de um time

### Jogadores
- `GET /api/Players` - Lista todos os jogadores
- `GET /api/Players/{id}` - Detalhes de um jogador
- `GET /api/Players/top-scorers` - Artilheiros

### Competições
- `GET /api/Competitions` - Lista todas as competições
- `GET /api/Competitions/{id}` - Detalhes de uma competição
- `GET /api/Competitions/{id}/standings` - Classificação
- `GET /api/Competitions/{id}/matches` - Partidas da competição

### Estatísticas
- `GET /api/Statistics/overview` - Visão geral
- `GET /api/Statistics/goals` - Estatísticas de gols
- `GET /api/Statistics/results` - Distribuição de resultados
- `GET /api/Statistics/cards` - Cards de estatísticas

### Pesquisa
- `GET /api/Search` - Pesquisa geral
- `GET /api/Search/suggestions` - Sugestões de pesquisa

## 🎨 Características do Design

### Paleta de Cores
- **Azul Principal**: `#3b82f6` - Elementos principais e links
- **Laranja**: `#f59e0b` - Destaques e alertas
- **Verde**: `#10b981` - Indicadores positivos
- **Vermelho**: `#ef4444` - Indicadores negativos e ao vivo
- **Cinzas**: Variações para texto e backgrounds

### Tipografia
- **Fonte Principal**: System fonts (Inter, Segoe UI, etc.)
- **Tamanhos**: Sistema de escala consistente
- **Pesos**: 400 (normal), 600 (semibold), 700 (bold)

### Layout
- **Grid System**: CSS Grid e Flexbox
- **Responsividade**: Mobile-first approach
- **Espaçamento**: Sistema consistente baseado em rem
- **Bordas**: Border-radius padronizado

## 🔄 Funcionalidades Avançadas

### Sistema de Cache
- Cache local para otimizar requisições
- Timeout configurável (30 segundos padrão)
- Invalidação automática

### Estados de Loading
- Indicadores visuais durante carregamento
- Estados vazios quando não há dados
- Fallback para dados mock

### Tratamento de Erros
- Recuperação graceful de falhas da API
- Mensagens de erro amigáveis
- Fallback para dados offline

### Atualizações em Tempo Real
- Refresh automático a cada 30 segundos
- Atualização manual disponível
- Indicadores de status ao vivo

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptações
- Menu mobile com hamburger
- Cards empilhados em mobile
- Tabelas com scroll horizontal
- Gráficos redimensionáveis

## 🧪 Testes Realizados

### Funcionalidades Testadas
- ✅ Carregamento de dados da API
- ✅ Sistema de pesquisa
- ✅ Navegação por abas
- ✅ Responsividade
- ✅ Estados de loading e erro
- ✅ Gráficos e visualizações
- ✅ Integração frontend-backend

### Dados de Teste
- 5 competições
- 19 times
- 48 jogadores
- 20 partidas
- Estatísticas completas

## 🚀 Melhorias Futuras

### Funcionalidades
- [ ] Autenticação de usuários
- [ ] Sistema de favoritos
- [ ] Notificações push
- [ ] Mais esportes (basquete, tênis)
- [ ] Histórico de partidas
- [ ] Comparação de times/jogadores

### Técnicas
- [ ] WebSockets para tempo real
- [ ] Service Workers para offline
- [ ] Testes automatizados
- [ ] CI/CD pipeline
- [ ] Banco de dados persistente
- [ ] Containerização com Docker

### UX/UI
- [ ] Tema escuro
- [ ] Personalização de dashboard
- [ ] Animações mais elaboradas
- [ ] Acessibilidade melhorada
- [ ] PWA (Progressive Web App)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.

## 👥 Contribuição

Projeto desenvolvido como conversão de React para HTML/CSS/JS + C#, demonstrando:
- Migração de tecnologias
- Integração frontend-backend
- Boas práticas de desenvolvimento
- Design responsivo
- API RESTful completa

---

**SportStats** - Sua fonte confiável para estatísticas esportivas ao vivo! ⚽🏀🎾

