🖥️ Frontend - Cadastro de Usuários
------------------------------

Este é o frontend da aplicação **Cadastro de Usuários**, desenvolvido em **React.js**, responsável pela interface de registro e listagem de usuários com integração via API REST.

> 🔗 Repositório do backend: [Cadastro de Usuários - API Node.js](https://github.com/Alinne-Tannus/api-cadastro-de-usuarios)

---

📸 Preview
---------------------------------

![Preview do projeto](https://cadastro-de-usuarios-livid.vercel.app)


🚀 Tecnologias Utilizadas
-----------------------------

- [React.js](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/) (para ambiente de desenvolvimento)
- CSS3
- Imagens locais


⚙️ Funcionalidades
---------------------

- ✅ Cadastro de novos usuários
- ✅ Listagem dinâmica dos usuários cadastrados
- 🔄 Integração com API externa (backend Node.js + Prisma)
- 📥 Requisições via Axios
- ❌ Exclusão de usuários (em breve)


🧠 Estrutura do Projeto
-------------
frontend/
├── public/

├── src/

│ ├── assets/

│ ├── services/ # Configuração do Axios

│ ├── pages/

│ │ └── Home.jsx # Página principal com formulário

│ └── style.css

├── package.json

└── vite.config.js


📝 Como Rodar o Projeto
-----------------------
1. Clone o repositório:
   
```
git clone https://github.com/Alinne-Tannus/NOME-DO-REPO-FRONTEND.git

cd NOME-DO-REPO-FRONTEND
```

2.Instale as dependências:

```
  npm install
```

3. Inicie o servidor local:
```
  npm run dev
```
   
4. Acesse no navegador:

```
http://localhost:5173
```

Certifique-se de que o backend (API) esteja rodando em http://localhost:3000

📦 API Esperada (Backend)
------

A API deve estar disponível em:

```
http://localhost:3000/users
```


- `GET /users:` Lista os usuários
- `POST /users:` Cadastra novo usuário

🙋‍♀️ Desenvolvedora
-----------------
Feito por [Alinne Tannus](https://github.com/Alinne-Tannus)


