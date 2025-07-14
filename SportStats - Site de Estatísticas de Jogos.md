# SportStats - Site de Estatísticas de Jogos

## Resumo do Projeto

Criei um site completo de estatísticas esportivas inspirado no Sofascore, com design moderno e funcionalidades avançadas.

## Funcionalidades Implementadas

### 🏠 Página Principal
- Hero section com design atrativo
- Cards de estatísticas em tempo real
- Seção de partidas com abas (Ao Vivo, Hoje, Próximas)
- Seção de esportes disponíveis

### 📊 Estatísticas e Análises
- Tabela de classificação completa da La Liga
- Lista de artilheiros com estatísticas detalhadas
- Gráficos interativos (barras e pizza) usando Recharts
- Indicadores visuais para classificação e rebaixamento

### 🔍 Sistema de Pesquisa
- Busca em tempo real por times, jogadores e competições
- Dropdown com resultados categorizados
- Interface intuitiva com ícones e badges

### 📱 Design Responsivo
- Layout adaptável para desktop e mobile
- Componentes otimizados com Tailwind CSS
- Navegação sticky e interações suaves

## Tecnologias Utilizadas

- **React 18** - Framework principal
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes de interface
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones
- **Vite** - Build tool

## Estrutura do Projeto

```
sports-stats-site/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Cabeçalho com navegação e pesquisa
│   │   ├── Footer.jsx          # Rodapé
│   │   ├── MatchCard.jsx       # Card de partida
│   │   ├── StatsCard.jsx       # Card de estatísticas
│   │   ├── StandingsTable.jsx  # Tabela de classificação
│   │   ├── StatsChart.jsx      # Componente de gráficos
│   │   ├── TopScorers.jsx      # Lista de artilheiros
│   │   └── SearchResults.jsx   # Resultados de pesquisa
│   ├── data/
│   │   └── mockData.js         # Dados simulados
│   ├── assets/
│   │   ├── icons/              # Ícones de esportes
│   │   ├── backgrounds/        # Imagens de fundo
│   │   └── images/             # Imagens geradas
│   ├── App.jsx                 # Componente principal
│   └── App.css                 # Estilos globais
└── public/                     # Arquivos públicos
```

## Dados Simulados

O site utiliza dados mock realistas incluindo:
- Partidas ao vivo e agendadas
- Classificação completa da La Liga
- Estatísticas de artilheiros
- Dados para gráficos
- Resultados de pesquisa

## Como Executar

1. Navegue até o diretório do projeto:
   ```bash
   cd sports-stats-site
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   pnpm run dev --host
   ```

4. Acesse http://localhost:5174

## Características Técnicas

- **Performance**: Otimizado com Vite e componentes React eficientes
- **Acessibilidade**: Estrutura semântica e navegação por teclado
- **SEO**: Meta tags apropriadas e estrutura HTML semântica
- **Responsividade**: Design mobile-first com breakpoints bem definidos

## Próximos Passos (Sugestões)

1. **Integração com API real** - Substituir dados mock por API de esportes
2. **Sistema de autenticação** - Login e perfis de usuário
3. **Favoritos persistentes** - Salvar times e jogadores favoritos
4. **Notificações push** - Alertas para partidas importantes
5. **Mais esportes** - Expandir para basquete, tênis, etc.
6. **Análises avançadas** - Estatísticas mais detalhadas e comparações

## Conclusão

O site SportStats foi desenvolvido com sucesso, oferecendo uma experiência moderna e intuitiva para acompanhar estatísticas esportivas. O projeto demonstra o uso de tecnologias modernas do React e design responsivo, criando uma base sólida para futuras expansões.

