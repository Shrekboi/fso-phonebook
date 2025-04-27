const express = require('express')
var morgan = require('morgan')
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.static("dist"))


let people =  [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]
  


app.get('/api/persons', (request, response) => {
    response.json(people)
})

app.get('/info', (request, response) => {
    response.end(
        `Phonebook has info for ${people.length} people yes \n${new Date()}`

    )
})

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id
  persons = people.filter((person => Number(person.id) !== Number(id)))

  response.status(204).end()

})

app.use(express.json())

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = people.find((note) => note.id === Number(id))

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})


const generateId = () => {
  const maxId =
    people.length > 0 ? Math.max(...people.map((n) => Number(n.id))) : 0
  return String(maxId + 1)
}



app.use(morgan('tiny'))

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).end("name or number missing")

  }

  if (people.some(person => person.name === body.name)) {
    return response.status(400).end('name must be unique')
  }

  const note = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  people = people.concat(note)

  response.json(note)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})