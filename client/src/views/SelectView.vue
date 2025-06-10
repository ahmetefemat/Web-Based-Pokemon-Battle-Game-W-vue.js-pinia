<template>
  <div class="select-view">
    <h1>Choose Your Pokémon</h1>
    
    <!-- Type Effectiveness sayfasına yönlendiren buton -->
    <button class="type-btn" @click="goToTypeEffectiveness">Type Effectiveness</button>

    <div class="pokemon-list">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="pokemon-card"
        :class="{ selected: selectedPlayer?.id === pokemon.id || selectedEnemy?.id === pokemon.id }"
        @click="selectPokemon(pokemon)"
      >
        <!-- Pokémon görseli -->
        <img :src="`/images/${pokemon.image}`" :alt="pokemon.name" />
        <p>{{ pokemon.name }}</p>
        <small>{{ pokemon.type }}</small>
      </div>
    </div>

    <!-- Savaş başlatma butonu, her iki Pokémon seçilmeden aktif olmaz -->
    <button @click="startBattle" :disabled="!selectedPlayer || !selectedEnemy">Start Battle</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBattleStore } from '../store/battle'
import { useRouter } from 'vue-router'
import axios from 'axios'

const pokemons = ref([])                // Tüm Pokémon verileri burada tutulur
const selectedPlayer = ref(null)        // Oyuncunun seçtiği Pokémon
const selectedEnemy = ref(null)         // Rakibin seçtiği Pokémon
const store = useBattleStore()
const router = useRouter()

// API'den Pokémon verilerini çeker
const fetchPokemons = async () => {
  const res = await axios.get('http://localhost:3000/api/pokemons')
  pokemons.value = res.data
}

// Pokémon seçim mantığı
const selectPokemon = (pokemon) => {
  if (!selectedPlayer.value) {
    selectedPlayer.value = pokemon
  } else if (!selectedEnemy.value && pokemon.id !== selectedPlayer.value.id) {
    selectedEnemy.value = pokemon
  } else if (selectedPlayer.value?.id === pokemon.id) {
    selectedPlayer.value = null
  } else if (selectedEnemy.value?.id === pokemon.id) {
    selectedEnemy.value = null
  }
}

// Savaşı başlatır ve seçilen Pokémonları store'a aktarır
const startBattle = () => {
  store.setPlayers(selectedPlayer.value, selectedEnemy.value)
  router.push('/battle')
}

// Type Effectiveness sayfasına yönlendirir
const goToTypeEffectiveness = () => {
  router.push('/type-effectiveness')
}

// Bileşen yüklendiğinde Pokémon verilerini çeker
onMounted(fetchPokemons)
</script>

<style scoped>
/* Görsel tasarım ve genel stil ayarları */
.select-view {
  min-height: 100vh;
  background-color: #121212;
  color: #E0E0E0;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 40px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h1 {
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 40px;
  color: #FFFFFF;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  max-width: 900px;
  width: 100%;
  margin-bottom: 40px;
}

.pokemon-card {
  width: 140px;
  background-color: #1E1E1E;
  border-radius: 16px;
  padding: 18px 10px 24px;
  cursor: pointer;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.2);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  user-select: none;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemon-card:hover {
  box-shadow: 0 0 20px rgba(70, 137, 245, 0.882);
  transform: translateY(-6px);
}

.pokemon-card.selected {
  border-color: #3B82F6;
  box-shadow: 0 0 25px rgba(59, 130, 246, 0.7);
}

.pokemon-card img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 14px;
  filter: drop-shadow(0 0 8px #3B82F6);
}

.pokemon-card p {
  font-weight: 700;
  font-size: 18px;
  margin: 0 0 6px;
  color: #FFFFFF;
  text-transform: capitalize;
}

.pokemon-card small {
  font-weight: 600;
  font-size: 14px;
  color: #9CA3AF;
  text-transform: capitalize;
}

button {
  width: 200px;
  padding: 14px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 30px;
  border: none;
  background-color: #3B82F6;
  color: white;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(59, 130, 246, 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:disabled {
  background-color: #5B8DF9;
  cursor: not-allowed;
  box-shadow: none;
}

button:hover:not(:disabled) {
  background-color: #2563EB;
  box-shadow: 0 8px 22px rgba(37, 99, 235, 0.7);
}

/* Type Effectiveness yönlendirme butonu */
.type-btn {
  position: fixed;
  left: 20px;
  bottom: 20px;
  background-color: #5B8DF9;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
  transition: background-color 0.3s ease;
}

.type-btn:hover {
  background-color: #2563EB;
  box-shadow: 0 8px 22px rgba(37, 99, 235, 0.7);
}
</style>
