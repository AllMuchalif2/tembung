<script setup lang="ts">
defineProps<{
  letterStatuses: Record<string, 'correct' | 'present' | 'absent'>
}>()

const emit = defineEmits<{
  keyPress: [key: string]
}>()

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
]

const getKeyClass = (key: string, status?: 'correct' | 'present' | 'absent'): string => {
  const base = 'font-bold rounded-md transition-all duration-200 active:scale-95 '

  if (key === 'Enter' || key === 'Backspace') {
    return base + 'px-3 sm:px-4 py-4 text-xs sm:text-sm bg-slate-600 hover:bg-slate-500'
  }

  const size = 'w-8 h-12 sm:w-10 sm:h-14 text-sm sm:text-base '

  if (status === 'correct') {
    return base + size + 'bg-emerald-600 hover:bg-emerald-500 text-white'
  }
  if (status === 'present') {
    return base + size + 'bg-amber-500 hover:bg-amber-400 text-white'
  }
  if (status === 'absent') {
    return base + size + 'bg-slate-800 hover:bg-slate-700 text-slate-400'
  }

  return base + size + 'bg-slate-600 hover:bg-slate-500'
}

const handleClick = (key: string) => {
  emit('keyPress', key)
}
</script>

<template>
  <div class="w-full max-w-lg">
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="flex justify-center gap-1.5 mb-1.5">
      <button
        v-for="key in row"
        :key="key"
        :class="getKeyClass(key, letterStatuses[key])"
        @click="handleClick(key)"
      >
        <template v-if="key === 'Backspace'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
            <line x1="18" y1="9" x2="12" y2="15"></line>
            <line x1="12" y1="9" x2="18" y2="15"></line>
          </svg>
        </template>
        <template v-else>
          {{ key }}
        </template>
      </button>
    </div>
  </div>
</template>
