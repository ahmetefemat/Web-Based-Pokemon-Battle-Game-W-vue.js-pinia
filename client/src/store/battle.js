import { defineStore } from 'pinia'

export const useBattleStore = defineStore('battle', {
  state: () => ({
    player: null,
    enemy: null,
    result: null
  }),
  actions: {
    setPlayers(player, enemy) {
      this.player = player
      this.enemy = enemy
    },
    setResult(result) {
      this.result = result
    }
  }
})
