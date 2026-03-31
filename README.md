# FIAP Labs — App de Reserva de Laboratórios

## Sobre o Projeto

**Problema resolvido:** O processo de reserva de laboratórios na FIAP é feito de forma manual, gerando filas, conflitos de horário e falta de visibilidade sobre a disponibilidade dos labs.

**Solução:** Aplicativo mobile que permite que alunos consultem os laboratórios disponíveis e realizem reservas de forma rápida e intuitiva, com confirmação imediata e histórico de agendamentos.

### Funcionalidades implementadas

- Visualização de todos os laboratórios com status em tempo real (livre/ocupado)
- Reserva de laboratório com seleção de data, horário, turma e finalidade
- Listagem das reservas do usuário com filtros por status
- Cancelamento de reservas ativas
- Resumo dinâmico da reserva durante o preenchimento
- Loading states ao carregar dados
- Tela de estado vazio com ação para fazer nova reserva

---

## Integrantes do Grupo

| Nome | RM |
|------|----|
| Rodrigo Nakata | 556417 |
| Gabriel Padula | 554907 |
| Arthur Abonizio | 555506 |

---

## Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [Expo Go](https://expo.dev/go) instalado no celular (Android ou iOS)
- npm v9 ou superior

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/fiap-mdi-cp1-labs-app.git

# 2. Acesse a pasta do projeto
cd fiap-mdi-cp1-labs-app

# 3. Instale as dependências
npm install --legacy-peer-deps

# 4. Inicie o servidor de desenvolvimento
npx expo start
```

5. Escaneie o QR Code exibido no terminal com o app **Expo Go** (Android) ou com a câmera do iPhone (iOS)

---

## Demonstração

### Telas do App

| Início | Nova Reserva | Minhas Reservas |
|--------|-------------|-----------------|
| _print aqui_ | _print aqui_ | _print aqui_ |

> **GIF/Vídeo:** _Adicionar link do YouTube ou Google Drive aqui_

---

## Decisões Técnicas

### Estrutura do projeto

```
app-router/
├── app/
│   ├── _layout.js              # Layout raiz (Stack)
│   └── (tabs)/
│       ├── _layout.js          # Layout de abas (Tab Navigator)
│       ├── index.js            # Tela: Início / Dashboard
│       ├── nova-reserva.js     # Tela: Nova Reserva
│       └── reservas.js         # Tela: Minhas Reservas
├── components/
│   ├── Header.js               # Cabeçalho reutilizável com logo
│   ├── LabCard.js              # Card de laboratório com Image
│   └── StatusBadge.js          # Badge de status reutilizável
└── assets/
    └── icon.png
```

### Hooks utilizados

| Hook | Onde | Para quê |
|------|------|----------|
| `useState` | `nova-reserva.js` | Controla lab, dia, horário, turma e finalidade selecionados |
| `useState` | `reservas.js` | Controla filtro ativo, card expandido e lista de reservas |
| `useState` | `index.js` | Controla lista de labs e estado de loading |
| `useEffect` | `index.js` | Simula o carregamento assíncrono dos laboratórios |
| `useEffect` | `reservas.js` | Simula a busca das reservas do usuário |

### Navegação

Utilizado **Expo Router** com estrutura de arquivos no padrão `app/(tabs)/`:
- Navegação por abas na parte inferior (Tab Navigator)
- Redirecionamentos entre telas via `useRouter().push()`
- Layout raiz com Stack Navigator sem header visível

### Componentização

Componentes reutilizáveis extraídos para a pasta `components/`:
- **`Header`** — cabeçalho vermelho com logo (usa `Image`)
- **`LabCard`** — card completo de laboratório (usa `Image`, `TouchableOpacity`)
- **`StatusBadge`** — badge colorido de status reutilizado em 3 telas

---

## Próximos Passos

- [ ] Integração com API REST para dados reais de laboratórios e reservas
- [ ] Autenticação com login FIAP (RM + senha)
- [ ] Notificações push para lembrar da reserva
- [ ] Filtro de disponibilidade por data/hora antes de reservar
- [ ] QR Code para check-in no laboratório no dia da reserva
