import { createRouter, createWebHistory } from 'vue-router'

import SelectView from '../views/SelectView.vue'
import BattleView from '../views/BattleView.vue'
import ResultView from '../views/ResultView.vue'
import TypeEffectivenessView from '../views/TypeEffectivenessView.vue'  // yeni ekleme

const routes = [
  { path: '/', component: SelectView },
  { path: '/battle', component: BattleView },
  { path: '/result', component: ResultView },
  { path: '/type-effectiveness', component: TypeEffectivenessView }  // yeni rota
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

