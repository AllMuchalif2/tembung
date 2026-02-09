<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useGame } from './composables/useGame'
import GameHeader from './components/GameHeader.vue'
import GameGrid from './components/GameGrid.vue'
import GameMessage from './components/GameMessage.vue'
import Keyboard from './components/Keyboard.vue'

// Use game composable
const {
  solution,
  guesses,
  gameState,
  shakeRow,
  revealRow,
  stats,
  letterStatuses,
  handleInput,
  resetGame,
  getLetterClass,
  getFlipDelay,
  initGame,
  cleanup,
} = useGame()

// Lifecycle
onMounted(() => {
  initGame()
})

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center px-4 py-6"
  >
    <!-- Header -->
    <GameHeader :stats="stats" />

    <!-- Game Grid -->
    <GameGrid
      :guesses="guesses"
      :shake-row="shakeRow"
      :reveal-row="revealRow"
      :get-letter-class="getLetterClass"
      :get-flip-delay="getFlipDelay"
    />

    <!-- Game Status Message -->
    <GameMessage :game-state="gameState" :solution="solution" @reset="resetGame" />

    <!-- Virtual Keyboard -->
    <Keyboard :letter-statuses="letterStatuses" @key-press="handleInput" />

    <!-- Footer -->
    <footer class="mt-auto pt-6 text-center text-slate-500 text-sm">
      <p>Dolanan Tembak Tembung Basa Jawa</p>
    </footer>
  </div>
</template>

<style>
@import './assets/main.css';

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-4px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(4px);
  }
}

@keyframes flip {
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-flip {
  animation: flip 0.6s ease-in-out forwards;
}
</style>
