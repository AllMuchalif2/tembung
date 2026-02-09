<script setup lang="ts">
defineProps<{
  gameState: 'playing' | 'won' | 'lost'
  solution: string
}>()

const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 scale-90 -translate-y-4"
    enter-to-class="opacity-100 scale-100 translate-y-0"
  >
    <div
      v-if="gameState !== 'playing'"
      class="mb-6 px-6 py-4 rounded-xl text-center shadow-2xl"
      :class="
        gameState === 'won'
          ? 'bg-gradient-to-r from-emerald-600 to-emerald-500'
          : 'bg-gradient-to-r from-red-600 to-red-500'
      "
    >
      <div class="text-2xl font-bold mb-1">
        {{ gameState === 'won' ? '🎉 Wadhuh, Apik Tenan!' : '💀 Waduh, Ora Bener!' }}
      </div>
      <div class="text-white/90">
        {{ gameState === 'won' ? 'Sampeyan kasil nebak tembunge!' : `Jawabane yaiku: ${solution}` }}
      </div>
      <button
        @click="emit('reset')"
        class="mt-3 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
      >
        Dolanan Maneh (Mode Latihan)
      </button>
    </div>
  </Transition>
</template>
