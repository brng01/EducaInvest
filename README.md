<h1 align="center">
  <img src="https://i.postimg.cc/nh0MSzxT/logo-educainvest.jpg" alt="EducaInvest Logo" width="60" style="vertical-align: middle; margin-right: 10px;"/>
  EducaInvest
</h1>

<p align="center">
Plataforma Gamificada de Educação Financeira com IA
</p>

<p align="center">
Projeto final desenvolvido no programa <strong>DiverseDev 2025</strong> em parceria com <strong>Ada Tech + Mercado Eletrônico</strong>.
</p>

---

## 🌐 Acesse o Projeto

🔗 **Aplicação Online:**  
https://educainvest.lovable.app/

---

## 🎯 Sobre o Projeto

O **EducaInvest** é uma solução focada no **Investidor Iniciante**.  

Nosso objetivo é **democratizar o acesso ao conhecimento financeiro**, transformando a aprendizagem em uma jornada **gamificada, interativa e personalizada**.

Diferente de portais financeiros tradicionais, o EducaInvest utiliza **Inteligência Artificial Generativa (RAG)** e **Dados em Tempo Real** para oferecer um tutor personalizado que responde dúvidas com base em conteúdo educacional curado, reduzindo alucinações e garantindo maior confiabilidade.

---

## ✨ Funcionalidades Principais

### 🎮 Gamificação (Learning Experience)

- Sistema de níveis  
- XP por progresso  
- Recompensas visuais  
- Ranking entre usuários  

Objetivo: aumentar engajamento e retenção na jornada de aprendizagem.

---

### 🤖 Tutor Inteligente (Chatbot RAG)

- Responde dúvidas usando o conteúdo das aulas (Supabase).  
- Arquitetura híbrida:  
  - Busca vetorial / textual  
  - Complemento com conhecimento geral de finanças  
- UX avançada:  
  - Respostas resumidas  
  - Sugestão de assuntos relacionados à pergunta do usuário como opção para se apronfundar mais no assunto 

---

### 📊 Simulador Financeiro Real

Compara:

- Poupança  
- Tesouro Direto  
- CDB  

Utiliza taxas reais atualizadas diariamente:

- Selic  
- CDI  
- IPCA  

Automação via fluxo ETL integrado ao Banco Central e BrasilAPI.

---

## 🧩 Stack de Tecnologia

<p align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-UI-black)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-Automation-FF6D00?logo=n8n&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-RAG-412991?logo=openai&logoColor=white)
![RAG Architecture](https://img.shields.io/badge/Architecture-RAG-blueviolet)

</p>

---

## 🛠️ Arquitetura da Solução

O projeto utiliza uma arquitetura moderna e desacoplada, garantindo escalabilidade e segurança.

### 1️⃣ Frontend (Interface)

Desenvolvido em React + Vite com TypeScript, utilizando a plataforma Lovable como base para aceleração de desenvolvimento e design system.

- UI Kit: Shadcn/ui + Tailwind CSS (Tema Dark Neon)  
- State Management: React Query para cache e performance  

---

### 2️⃣ Backend & Automação (n8n)

O “cérebro” do sistema roda no **n8n**, orquestrando dois fluxos principais:

#### 🔄 Fluxo ETL Diário

- Conecta na BrasilAPI  
- Conecta ao Banco Central (Série 196)  
- Trata os dados (ex: anualização da poupança)  
- Atualiza o Supabase  

#### 🧠 Fluxo Chatbot RAG

1. Recebe a pergunta  
2. Extrai palavras-chave com GPT-4o-mini  
3. Busca contexto no banco  
4. Gera resposta pedagógica estruturada  

---

### 3️⃣ Banco de Dados (Supabase)

- PostgreSQL  
- Armazenamento relacional de usuários, progresso e indicadores  
- Full Text Search para busca semântica  
- RLS (Row Level Security) configurado para proteger os dados  

---

## 📂 Estrutura do Projeto

```
EducaInvest/
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── hooks/
│   ├── integrations/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
└── package.json
```

---

## 🚀 Como Rodar Localmente

### 📌 Pré-requisitos

- Node.js  
- npm  

---

### 🔧 Passo a Passo

#### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/educainvest.git
cd educainvest
```

#### 2️⃣ Instale as dependências

```bash
npm install
```

#### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

#### 4️⃣ Execute o projeto

```bash
npm run dev
```

Acesse:

```
http://localhost:8080
```

---

## 🌟 Diferenciais do Projeto

- Educação financeira simplificada e acessível  
- IA com arquitetura RAG para reduzir alucinações  
- Dados financeiros atualizados automaticamente  
- Gamificação como motor de engajamento  
- Foco em iniciantes  
