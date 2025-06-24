# DORA Metrics Demo

Este projeto demonstra como coletar as 4 principais métricas da DORA usando GitHub Actions.

## Métricas
- **Deployment Frequency**
- **Lead Time for Changes**
- **Change Failure Rate**
- **Mean Time to Recovery (manual)**

## Workflows
- `deploy.yml` — Simula deploy bem-sucedido.
- `failure-simulator.yml` — Simula deploys com possibilidade de falha.
- `metrics-collector.yml` — Coleta dados de deploy e PR para gerar as métricas.

## Rodando o Coletor
Execute manualmente o workflow `Collect DORA Metrics`. O resultado estará no artefato `metrics.json`.
