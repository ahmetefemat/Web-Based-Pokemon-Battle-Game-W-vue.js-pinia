<template>
  <div class="battle-view">
    <h1>Battle</h1>
    <div class="battlefield">
      <!-- Oyuncunun Pokémon'u -->
      <div class="pokemon" id="player" :class="{ active: activePokemon === 'player' }">
        <img :src="`/images/${player.image}`" :alt="player.name" />
        <h3>{{ player.name }} ({{ player.type }})</h3>
        <div class="hp-bar">
          <div class="hp" :style="{ width: playerHP + '%' }"></div>
        </div>
      </div>

      <!-- Rakibin Pokémon'u -->
      <div class="pokemon" id="enemy" :class="{ active: activePokemon === 'enemy' }">
        <img :src="`/images/${enemy.image}`" :alt="enemy.name" />
        <h3>{{ enemy.name }} ({{ enemy.type }})</h3>
        <div class="hp-bar">
          <div class="hp" :style="{ width: enemyHP + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Saldırı butonları -->
    <div class="actions">
      <button @click="attack('normal')" :disabled="isTurn || gameOver">Normal Attack</button>
      <button @click="attack('special')" :disabled="specialCooldown > 0 || isTurn || gameOver">
        Special Attack <span v-if="specialCooldown > 0">({{ specialCooldown }})</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useBattleStore } from '../store/battle'
import { useRouter } from 'vue-router'

// Global store ve yönlendirme nesneleri
const store = useBattleStore()
const router = useRouter()

// Oyuncu ve rakip verileri
const player = computed(() => store.player)
const enemy = computed(() => store.enemy)

// HP, özel saldırı bekleme süreleri, sıralar ve oyun durumu
const playerHP = ref(100)
const enemyHP = ref(100)
const specialCooldown = ref(0)
const enemySpecialCooldown = ref(0)
const isTurn = ref(false)
const gameOver = ref(false)
const activePokemon = ref('player')

// Tür üstünlüklerini tanımlayan yapı
const typeEffectiveness = {
  fire: { strongAgainst: 'grass', weakAgainst: 'water' },
  water: { strongAgainst: 'fire', weakAgainst: 'grass' },
  grass: { strongAgainst: 'water', weakAgainst: 'fire' },
  electric: { strongAgainst: 'water', weakAgainst: null }
}

// Hasar hesaplama fonksiyonu
const calculateDamage = (attacker, defender, isSpecial = false) => {
  const base = isSpecial ? 30 : 15
  const effect = typeEffectiveness[attacker.type]
  let multiplier = 1
  if (effect?.strongAgainst === defender.type) multiplier = 2
  else if (effect?.weakAgainst === defender.type) multiplier = 0.5
  return Math.floor(base * multiplier)
}

// Oyuncunun saldırı işlemi
const attack = (type) => {
  if (gameOver.value) return

  const damage = calculateDamage(player.value, enemy.value, type === 'special')
  enemyHP.value = Math.max(enemyHP.value - damage, 0)

  if (type === 'special') specialCooldown.value = 3
  isTurn.value = true
  activePokemon.value = 'enemy'

  setTimeout(() => {
    if (enemyHP.value <= 0) return endGame('win')
    enemyAttack()
  }, 1000)
}

// Rakibin saldırı işlemi
const enemyAttack = () => {
  const type = enemySpecialCooldown.value === 0 ? 'special' : 'normal'
  const damage = calculateDamage(enemy.value, player.value, type === 'special')
  playerHP.value = Math.max(playerHP.value - damage, 0)

  if (type === 'special') enemySpecialCooldown.value = 3
  activePokemon.value = 'player'

  setTimeout(() => {
    if (playerHP.value <= 0) return endGame('lose')
    nextTurn()
  }, 1000)
}

// Bir sonraki turun hazırlanması
const nextTurn = () => {
  if (specialCooldown.value > 0) specialCooldown.value--
  if (enemySpecialCooldown.value > 0) enemySpecialCooldown.value--
  isTurn.value = false
}

// Oyun sonu işlemi
const endGame = (result) => {
  gameOver.value = true
  setTimeout(() => {
    store.setResult(result)
    router.push('/result')
  }, 1500)
}

// Sayfa yüklendiğinde oyunu başlat
onMounted(() => {
  playerHP.value = 100
  enemyHP.value = 100
  specialCooldown.value = 0
  enemySpecialCooldown.value = 0
  isTurn.value = false
  gameOver.value = false
})
</script>

<style scoped>
.pokemon {
  width: 40%;
  padding: 12px;
  border-radius: 12px;
  transition: box-shadow 0.3s ease;

}

.pokemon.active {
  box-shadow: 0 0 15px 5px #3b82f6; 
}

.battle-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #121212;
  color: #E0E0E0;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

.battlefield {
  display: flex;
  justify-content: center;
  gap: 60px;
  width: 100%;
  max-width: 900px;
  margin: 40px 0;
}

.pokemon {
  background-color: #1E1E1E;
  border-radius: 16px;
  padding: 24px;
  flex: 1 1 40%;
  text-align: center;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
  transition: box-shadow 0.3s ease;
}



.pokemon img {
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 8px #3B82F6);
}

.pokemon h3 {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 8px;
  color: #FFFFFF;
  text-transform: capitalize;
}

.hp-bar {
  width: 100%;
  height: 18px;
  background-color: #333;
  border-radius: 9px;
  overflow: hidden;
  margin-top: 12px;
}

.hp {
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #60A5FA);
  transition: width 0.5s ease;
  box-shadow: inset 0 -1px 4px rgba(0,0,0,0.3);
}

.actions {
  margin-top: 36px;
  display: flex;
  justify-content: center;
  gap: 24px;
  width: 100%;
  max-width: 500px;
}

.actions button {
  flex: 1;
  padding: 14px 0;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  background-color: #3B82F6;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(59, 130, 246, 0.4);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.actions button:disabled {
  background-color: #5B8DF9;
  cursor: not-allowed;
  box-shadow: none;
}

.actions button:hover:not(:disabled) {
  background-color: #2563EB;
  box-shadow: 0 8px 22px rgba(37, 99, 235, 0.7);
}
</style>