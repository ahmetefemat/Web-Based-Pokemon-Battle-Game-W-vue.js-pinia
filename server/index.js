import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())

// Basit Pokémon verisi
const pokemons = [
  { id: 1, name: 'Charmander', type: 'fire', image: 'charmander.png' },
  { id: 2, name: 'Squirtle', type: 'water', image: 'squirtle.png' },
  { id: 3, name: 'Bulbasaur', type: 'grass', image: 'bulbasaur.png' },
  { id: 4, name: 'Pikachu', type: 'electric', image: 'pikachu.png' }
]


app.get('/api/pokemons', (req, res) => {
  res.json(pokemons)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
  