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
