<template>
  <div class="type-effectiveness-view">
    <!-- Geri dönmek için buton -->
    <button class="back-button" @click="goBack">← Back</button>
    <h1>Pokémon Type Comparison</h1>

    <!-- Pokémon seçimi için kartlar -->
    <div class="pokemon-selection">
      <div
        v-for="poke in pokemons"
        :key="poke.name"
        :class="['pokemon-card', isSelected(poke) ? 'selected' : '']"
        @click="selectPokemon(poke)"
      >
        <!-- Pokémon resmi ve bilgileri -->
        <img :src="`/images/${poke.image}`" :alt="poke.name" />
        <div class="info">
          <p class="name">{{ poke.name }}</p>
          <p class="type">{{ poke.type }}</p>
        </div>
      </div>
    </div>

    <!-- Hem oyuncu hem düşman seçildiğinde karşılaştırma sonucu gösterilir -->
    <div v-if="player && enemy" class="comparison-result">
      <!-- Oyuncu bilgileri -->
      <div class="pokemon-info">
        <img :src="`/images/${player.image}`" :alt="player.name" />
        <p class="name">{{ player.name }}</p>
        <p class="type">{{ player.type }}</p>
      </div>

      <div class="versus">VS</div>

      <!-- Düşman bilgileri -->
      <div class="pokemon-info">
        <img :src="`/images/${enemy.image}`" :alt="enemy.name" />
        <p class="name">{{ enemy.name }}</p>
        <p class="type">{{ enemy.type }}</p>
      </div>

      <!-- Etkinlik durumu metinleri -->
      <div class="matchup-text">
        <p :class="playerEffectivenessClass">{{ playerEffectivenessText }}</p>
        <p :class="enemyEffectivenessClass">{{ enemyEffectivenessText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Geri gitme fonksiyonu
function goBack() {
  window.history.back();
}

// Pokémon verileri (isim, tür ve resim)
const pokemons = [
  { name: 'Bulbasaur', type: 'grass', image: 'bulbasaur.png' },
  { name: 'Charmander', type: 'fire', image: 'charmander.png' },
  { name: 'Squirtle', type: 'water', image: 'squirtle.png' },
  { name: 'Pikachu', type: 'electric', image: 'pikachu.png' },
]

// Seçilen oyuncu ve düşman Pokémon'ları
const player = ref(null)
const enemy = ref(null)

// Pokémon seçme fonksiyonu
function selectPokemon(poke) {
  if (!player.value) {
    // Eğer oyuncu seçilmemişse, seçilen poke oyuncu olur
    player.value = poke
    // Aynı Pokémon hem oyuncu hem düşman olmasın diye kontrol
    if (enemy.value && enemy.value.name === poke.name) {
      enemy.value = null
    }
  } else if (!enemy.value && poke.name !== player.value.name) {
    // Eğer düşman seçilmemiş ve seçilen poke oyuncu değilse düşman olur
    enemy.value = poke
  } else if (poke.name === player.value.name) {
    // Aynı oyuncuyu tekrar seçerse seçim iptal edilir
    player.value = null
  } else if (poke.name === enemy.value.name) {
    // Aynı düşmanı tekrar seçerse seçim iptal edilir
    enemy.value = null
  }
}

// Bir Pokémon'un seçili olup olmadığını kontrol eden fonksiyon
function isSelected(poke) {
  return (player.value && player.value.name === poke.name) || (enemy.value && enemy.value.name === poke.name)
}

// Türlerin güçlü ve zayıf oldukları türler tablosu
const typeChart = {
  fire: { strongAgainst: ['grass'], weakAgainst: ['water', 'rock'] },
  water: { strongAgainst: ['fire', 'rock'], weakAgainst: ['grass', 'electric'] },
  grass: { strongAgainst: ['water', 'rock'], weakAgainst: ['fire', 'bug'] },
  electric: { strongAgainst: ['water'], weakAgainst: ['ground'] },
  rock: { strongAgainst: ['fire', 'bug'], weakAgainst: ['water', 'grass'] },
  bug: { strongAgainst: ['grass'], weakAgainst: ['fire', 'rock'] },
}

// Saldıran türüne göre savunana karşı etkinlik durumu hesaplama fonksiyonu
function effectiveness(attackerType, defenderType) {
  if (!typeChart[attackerType]) return 'Neutral' // Tür tablosunda yoksa nötr
  if (typeChart[attackerType].strongAgainst.includes(defenderType)) return 'Strong' // Güçlü ise
  if (typeChart[attackerType].weakAgainst.includes(defenderType)) return 'Weak' // Zayıf ise
  return 'Neutral' // Diğer durumlar nötr
}

// Oyuncunun düşmana karşı etkinliği (computed, otomatik hesaplanır)
const playerEffectiveness = computed(() => {
  if (!player.value || !enemy.value) return 'Neutral'
  return effectiveness(player.value.type, enemy.value.type)
})

// Düşmanın oyuncuya karşı etkinliği
const enemyEffectiveness = computed(() => {
  if (!player.value || !enemy.value) return 'Neutral'
  return effectiveness(enemy.value.type, player.value.type)
})

// Oyuncu için açıklama metni
const playerEffectivenessText = computed(() => {
  if (!player.value || !enemy.value) return ''
  switch (playerEffectiveness.value) {
    case 'Strong':
      return `${player.value.name}'s attacks are strong against ${enemy.value.name}.`
    case 'Weak':
      return `${player.value.name}'s attacks are weak against ${enemy.value.name}.`
    default:
      return `${player.value.name}'s attacks are neutral against ${enemy.value.name}.`
  }
})

// Düşman için açıklama metni
const enemyEffectivenessText = computed(() => {
  if (!player.value || !enemy.value) return ''
  switch (enemyEffectiveness.value) {
    case 'Strong':
      return `${enemy.value.name}'s attacks are strong against ${player.value.name}.`
    case 'Weak':
      return `${enemy.value.name}'s attacks are weak against ${player.value.name}.`
    default:
      return `${enemy.value.name}'s attacks are neutral against ${player.value.name}.`
  }
})

// Oyuncu etkinliğine göre CSS sınıfı
const playerEffectivenessClass = computed(() => {
  return {
    Strong: 'strong',
    Weak: 'weak',
    Neutral: 'neutral',
  }[playerEffectiveness.value] || 'neutral'
})

// Düşman etkinliğine göre CSS sınıfı
const enemyEffectivenessClass = computed(() => {
  return {
    Strong: 'strong',
    Weak: 'weak',
    Neutral: 'neutral',
  }[enemyEffectiveness.value] || 'neutral'
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.type-effectiveness-view {
  min-height: 100vh;
  background-color: #121212;
  color: #E0E0E0;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 30px 20px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative; /* back-button için */
}

h1 {
  font-weight: 700;
  font-size: 30px;
  margin-bottom: 25px;
  color: #FFFFFF;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
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

.back-button:hover {
  background-color: #2563eb;
  box-shadow: 0 6px 12px rgba(37, 99, 235, 0.6);
}

.pokemon-selection {
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
.pokemon-card .info {
  text-align: center;
}

.pokemon-card .name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #e0e7ff;
  margin-bottom: 0.12rem;
}

.pokemon-card .type {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e0e7ffaa;
  text-transform: capitalize;
}

.comparison-result {
  background-color: #1e293b;
  box-shadow: 0 0 30px rgba(70, 137, 245, 0.9);
  border-radius: 1rem;
  padding: 2rem 2.5rem;
  max-width: 850px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  user-select: none;
}

.pokemon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  color: #e0e7ff;
}

.pokemon-info img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.9));
  margin-bottom: 0.5rem;
}

.pokemon-info .name {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.1rem;
}

.pokemon-info .type {
  font-weight: 600;
  font-size: 1rem;
  color: #e0e7ffac;
  text-transform: capitalize;
}

.versus {
  font-weight: 900;
  font-size: 2rem;
  color: #e0e7ff7a;
  letter-spacing: 0.15em;
  user-select: none;
  text-shadow: 0 0 12px #6366f1bb;
  align-self: center;
}

.matchup-text p {
  margin-top: 1rem;
  font-weight: 700;
  font-size: 1.15rem;
  user-select: text;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.strong {
  color: #22c55e;
  text-shadow: 0 0 10px #22c55eaa;
}

.weak {
  color: #ef4444;
  text-shadow: 0 0 10px #ef4444aa;
}

.neutral {
  color: #94a3b8;
  font-weight: 600;
  text-shadow: none;
}

/* Responsive tasarım ayarları */

@media (max-width: 960px) {
  .pokemon-selection {
    gap: 1rem;
    max-width: 100%;
    justify-content: center;
    padding-bottom: 15px;
  }
  .pokemon-card {
    width: 120px;
  }
  .pokemon-card img {
    width: 95px;
    height: 95px;
  }
  .pokemon-card .name {
    font-size: 1.1rem;
  }
  .pokemon-card .type {
    font-size: 0.85rem;
  }
  .comparison-result {
    background-color: #1e293b;
    box-shadow: 0 0 30px rgba(70, 137, 245, 0.9);
    border-radius: 1rem;
    padding: 1.6rem;
    max-width: 85%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    user-select: none;
  }
  .pokemon-info {
    width: 140px;
  }
  .pokemon-info img {
    width: 110px;
    height: 110px;
  }
  .versus {
    font-size: 1.8rem;
  }
  .matchup-text p {
    font-size: 1rem;
  }
}

@media (max-width: 520px) {
  .pokemon-selection {
    flex-wrap: wrap;
    gap: 14px;
    max-width: 100%;
    justify-content: center;
    padding-bottom: 10px;
  }
  .pokemon-card {
    width: 95px;
    padding: 14px 6px 16px;
  }
  .pokemon-card img {
    width: 75px;
    height: 75px;
  }
  .pokemon-card .name {
    font-size: 0.9rem;
  }
  .pokemon-card .type {
    font-size: 0.7rem;
  }
  .comparison-result {
    max-width: 95%;
    padding: 1rem 1.2rem;
    gap: 1.6rem;
  }
  .pokemon-info {
    width: 110px;
  }
  .pokemon-info img {
    width: 85px;
    height: 85px;
  }
  .pokemon-info .name {
    font-size: 1rem;
  }
  .pokemon-info .type {
    font-size: 0.85rem;
  }
  .versus {
    font-size: 1.4rem;
  }
  .matchup-text p {
    font-size: 0.9rem;
  }
}
</style>
