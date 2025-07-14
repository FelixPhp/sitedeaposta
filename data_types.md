
# Tipos de Dados Necessários para Estatísticas de Jogos

Para replicar as funcionalidades do Sofascore, os seguintes tipos de dados serão essenciais:

## 1. Dados de Partidas
*   **Informações Básicas:** ID da partida, data, hora, status (ao vivo, finalizado, agendado), competição, rodada.
*   **Times:** ID do time, nome, escudo, país.
*   **Placar:** Gols (tempo normal, prorrogação, pênaltis), placar do intervalo.
*   **Eventos de Jogo:** Gols (minuto, jogador, assistente), cartões (minuto, jogador, tipo), substituições (minuto, jogador que entra, jogador que sai).
*   **Estatísticas da Partida:** Posse de bola, chutes (total, no gol, fora), passes (total, precisão), faltas, escanteios, impedimentos, defesas do goleiro, desarmes, etc.

## 2. Dados de Competições
*   **Informações Básicas:** ID da competição, nome, país, tipo (liga, copa).
*   **Classificação:** Posição, time, jogos, vitórias, empates, derrotas, gols pró, gols contra, saldo de gols, pontos.
*   **Artilharia:** Jogador, time, número de gols.
*   **Assistências:** Jogador, time, número de assistências.

## 3. Dados de Times
*   **Informações Básicas:** ID do time, nome, escudo, país, treinador.
*   **Elenco:** Lista de jogadores com suas posições e números de camisa.
*   **Histórico de Jogos:** Resultados de partidas anteriores.

## 4. Dados de Jogadores
*   **Informações Básicas:** ID do jogador, nome, data de nascimento, nacionalidade, posição, altura, peso.
*   **Estatísticas de Carreira:** Jogos jogados, gols, assistências, cartões (amarelos, vermelhos), minutos jogados por temporada/competição.
*   **Histórico de Transferências:** Clubes anteriores, datas de transferência.

## 5. Dados de Odds
*   **Informações de Apostas:** Odds para vitória do time da casa, empate, vitória do time visitante, over/under, etc.

## 6. Dados de Notícias/Artigos
*   **Conteúdo:** Título, corpo do texto, imagem, data de publicação, autor, tags.

Esses dados formarão a base para as funcionalidades do site, permitindo a exibição de resultados, estatísticas detalhadas e perfis de entidades esportivas.

