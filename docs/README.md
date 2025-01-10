# Decisão de Arquitetura para o Sistema de Operações e Infrações

### Submissores

Jamille dos Santos Monteiro

## Registro de alterações

09-01-2025 - Aprovado - Proposta inicial da decisão de arquitetura para o sistema.

## Casos de Uso Referenciados

Caso de Uso: Gerenciamento de Operações - Gerenciar cadastro de operações, veículos, e gerar relatórios analíticos de infrações.

## Contexto

Este projeto apresenta uma arquitetura centralizada em separação de responsabilidades, onde cada funcionalidade tem um módulo dedicado. A arquitetura escolhida é baseada em Clean Architecture com princípios de TDD para validação de funcionalidades.

## Projeto Proposto

### Camadas da Arquitetura

Telas desenvolvidas com Angular para uma experiência de usuário moderna.

1.  Camada de Apresentação (Interface do Usuário)

    - Funcionalidades principais:
      - Tela de Login.
      - Cadastro de Operações.
      - Cadastro de Veículos.
      - Geração e exibição de relatórios.

2.  Camada de Aplicação (Casos de Uso)

    - Modulo de operações:

      - Registrar operação
      - Atualizar operação
      - Deletar operação
      - Listar operação

    - Modulo de veículo:

      - Registrar veículo
      - Atualizar veículo
      - Deletar veículo
      - Listar veículo

    - Modulo de relatório:

      - Gerar relatórios por período, local ou agente.

    - Modulo de login:
      - Autenticação de usuários

3.  Camada de Domínio (Regras de Negócio)
    - Regras de validação para:
      - Garantir que operações só podem ser cadastradas com datas válidas.
      - Histórico de infrações atualizado automaticamente após registro de nova infração.
      - Cálculo automático do nível de álcool para registros de bafômetro.
