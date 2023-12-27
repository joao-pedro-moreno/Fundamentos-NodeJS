import http from "node:http"

// - HTTP
//  - Método HTTP
//  - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso no Back-end
// POST => Criar um recurso no Back-end
// PUT => Atualizar um recurso no Back-end
// PATCH => Atualizar uma informação específica de um recurso no Back-end 
// DELETE => Deleta um recurso no Back-end

// GET => /users => Buscando usuários no Back-end
// POST => Criar um usuário no Back-end

// Stateful - Stateless

// Stateful => Aplicação que salva os dados localmente na memória
// Stateless => Aplicação que utiliza de meios externos para salvar os dados

// JSON - JavaScrip Object Notation

// Headers (Requisição/Resposta) => Metadados

// HTTP Status Code

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === "GET" && url === "/users") {
    // Early return (Caso o código execute o "return", nenhum código abaixo é executado)
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users))
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com"
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)
