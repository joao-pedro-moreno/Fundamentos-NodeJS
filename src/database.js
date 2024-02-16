import fs from "node:fs/promises"

// Pega o caminho do arquivo a partir do database.js
const databasePath = new URL("../db.json", import.meta.url)

export class Database {
  // # Deixa a propriedade privada
  #database = {}

  constructor() {
    // Promisse que tenta ler o arquivo, caso ele não exista cria um vazio
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  // Cria o arquivo db.json
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)

      this.#persist()
    }
  }
}