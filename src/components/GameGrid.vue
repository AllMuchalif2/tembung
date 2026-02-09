<script setup lang="ts">
defineProps<{
  guesses: string[]
  shakeRow: number
  revealRow: number
  getLetterClass: (row: number, col: number) => string
  getFlipDelay: (col: number) => string
}>()
</script>

<template>
  <div class="grid gap-1.5 mb-6">
    <div
      v-for="(_, rowIndex) in 6"
      :key="rowIndex"
      class="grid grid-cols-5 gap-1.5"
      :class="{ 'animate-shake': shakeRow === rowIndex }"
    >
      <div
        v-for="(__, colIndex) in 5"
        :key="colIndex"
        class="w-14 h-14 sm:w-16 sm:h-16 border-2 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold uppercase transition-all duration-200"
        :class="[getLetterClass(rowIndex, colIndex), revealRow === rowIndex ? 'animate-flip' : '']"
        :style="revealRow === rowIndex ? { animationDelay: getFlipDelay(colIndex) } : {}"
      >
        {{ guesses[rowIndex][colIndex] || '' }}
      </div>
    </div>
  </div>
</template>
