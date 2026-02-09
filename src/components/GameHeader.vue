<script setup lang="ts">
import type { GameStats } from '@/composables/useGame'

defineProps<{
  stats: GameStats
}>()
</script>

<template>
  <header
    class="w-full max-w-lg flex items-center justify-between mb-6 pb-4 border-b border-slate-700"
  >
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg"
      >
        ꦠ
      </div>
      <h1
        class="text-3xl font-bold tracking-wider bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
      >
        TEMBUNG
      </h1>
    </div>

    <!-- Stats -->
    <div class="flex gap-4 text-sm">
      <div class="text-center">
        <div class="text-emerald-400 font-bold text-lg">{{ stats.win }}</div>
        <div class="text-slate-400">Menang</div>
      </div>
      <div class="text-center">
        <div class="text-amber-400 font-bold text-lg">{{ stats.streak }}</div>
        <div class="text-slate-400">Runtut</div>
      </div>
    </div>
  </header>
</template>
