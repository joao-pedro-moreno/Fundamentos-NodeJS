import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"

// - HTTP
//  - Método HTTP
//  - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso no Back-end
// POST => Criar um recurso no Back-end
// PUT => Atualizar um recurso no Back-end
// PATCH => Atualizar uma informação específica de um recurso no Back-end 
// DELETE => Deleta um recurso no Back-end

// GET => /users -> Buscando usuários no Back-end
// POST => Criar um usuário no Back-end

// Stateful - Stateless

// Stateful => Aplicação que salva os dados localmente na memória
// Stateless => Aplicação que utiliza de meios externos para salvar os dados

// JSON => JavaScrip Object Notation

// Headers (Requisição/Resposta) => Metadados

// HTTP Status Code

// UUID => Universal Unique ID

// Formas de receber informações das aplicações
// - Query Parameters => URL Stateful -> Filtros, paginação, não-obrigatórios
//    Ex: http://localhost:3333/users/userId=1&name=Joao
// 
// - Route Parameters => Identificação de recurso
//    Ex: http://localhost:3333/users/1
// 
// - Request Body => Envio de informações de um formulário
// 
// Query e Route parameters devem ser usados apenas para dados não sensíveis



const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups }

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
