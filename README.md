# 📩 Mindtech Newsletter

Aplicação full stack para gerenciamento de assinaturas de newsletter.  
Permite cadastrar e remover emails de forma simples, utilizando **Go + PostgreSQL no backend** e **React + Vite + Tailwind no frontend**.

---

## 🚀 Tecnologias

### Backend

- [Go](https://golang.org/) (Gin Framework)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

### Frontend

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

---

## 📦 Requisitos

Antes de rodar a aplicação, certifique-se de ter instalado:

- [Docker](https://www.docker.com/)
- [Make](https://gnuwin32.sourceforge.net/packages/make.htm) (opcional, recomendado para Windows para facilitar os comandos)

---

## ⚙️ Como rodar

### 1. Clone o repositório

```bash
git clone https://github.com/fellipemarconi/Mindtech-Newsletter.git
```

### 2. Configure as variáveis de ambiente

Na raiz do projeto mude o nome do arquivo .env-example para .env

```bash
# Windows
ren .env-example .env

# Linux/Mac
mv .env-example .env
```

Edite os valores conforme necessário (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, etc).

## Troque apenas onde está escrito "CHANGE_ME" !!!

Exemplo de `.env`:

```env
POSTGRES_USER="CHANGE_ME"  (Usuário de sua escolha)
POSTGRES_PASSWORD="CHANGE_ME"  (Senha de sua escolha)
POSTGRES_DB="CHANGE_ME"  (Nome da base de dados de sua escolha)
SECRET_KEY="CHANGE_ME"  (Uma string grande como codificador para o sign)
```

---

### 3. Rodando com Docker 🐳

Na raiz do projeto e com o Docker aberto abra o terminal e rode os comandos abaixo:

```bash
docker-compose up --build

# Se tiver o Make utilize:
make build
make up

```

### 4. Aplicação rodando

```bash
http://localhost:8080/

```

## 👤 Autor

Feito por [Fellipe Marconi](https://github.com/fellipemarconi) 🚀
