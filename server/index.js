// Express framework'ü ve CORS'u içe aktarıyoruz
import express from 'express'
import cors from 'cors'

// Uygulamayı başlatıyoruz
const app = express()
// Sunucunun dinleyeceği port numarası
const PORT = 3000

app.use(cors())

// Statik olarak tanımlanmış örnek Pokémon verileri
const pokemons = [
  { id: 1, name: 'Charmander', type: 'fire', image: 'charmander.png' },
  { id: 2, name: 'Squirtle', type: 'water', image: 'squirtle.png' },
  { id: 3, name: 'Bulbasaur', type: 'grass', image: 'bulbasaur.png' },
  { id: 4, name: 'Pikachu', type: 'electric', image: 'pikachu.png' }
]

// '/api/pokemons' endpoint'i tanımlanıyor
// Bu endpoint'e yapılan GET isteği, yukarıdaki Pokémon listesini JSON formatında döner
app.get('/api/pokemons', (req, res) => {
  res.json(pokemons)
})

// Sunucu belirtilen port üzerinden dinlenmeye başlanıyor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
