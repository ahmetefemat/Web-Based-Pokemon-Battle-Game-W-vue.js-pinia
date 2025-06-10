<template>
  <div class="result-view">
    <!-- Sonuca göre başlık gösterilir -->
    <h1>{{ store.result === 'win' ? 'You Win!' : 'You Lose!' }}</h1>
    
    <!-- Yeniden oynama veya yeni Pokémon seçme -->
    <div class="buttons">
      <button @click="playAgain">Play Again</button>
      <button @click="chooseNew">Choose New Pokémon</button>
    </div>
  </div>
</template>

<script setup>
import { useBattleStore } from '../store/battle'
import { useRouter } from 'vue-router'

const store = useBattleStore()
const router = useRouter()

// Aynı Pokémon'la tekrar savaşa başlar
const playAgain = () => {
  router.push('/battle')
}

// Yeni Pokémon seçme ekranına yönlendirir
const chooseNew = () => {
  router.push('/')
}
</script>

<style scoped>
.result-view {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #121212;
  color: #E0E0E0;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}

/* Sonuç başlığı */
h1 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 36px;
  text-transform: uppercase;
  color: var(--result-color);
  max-width: 100%;
  word-break: break-word;
}

/* Kazanma durumunda başlık rengi */
h1.win {
  --result-color: #3B82F6;
  color: #3B82F6;
}

/* Kaybetme durumunda başlık rengi */
h1.lose {
  --result-color: #EF4444;
  color: #EF4444;
}

/* Butonlar kapsayıcısı */
.buttons {
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  max-width: 420px;
  padding: 0 10px;
  box-sizing: border-box;
}

/* Ortak buton stili */
.buttons button {
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

/* Hover efekti */
.buttons button:hover {
  background-color: #2563EB;
  box-shadow: 0 8px 22px rgba(37, 99, 235, 0.7);
}
</style>
