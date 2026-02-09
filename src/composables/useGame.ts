import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { getDailyWord, getRandomWord } from './useWords'

export interface GameStats {
  win: number
  lose: number
  streak: number
}

export interface UseGameReturn {
  // State
  solution: Ref<string>
  guesses: Ref<string[]>
  currentRow: Ref<number>
  gameState: Ref<'playing' | 'won' | 'lost'>
  shakeRow: Ref<number>
  revealRow: Ref<number>
  isRevealing: Ref<boolean>
  stats: Ref<GameStats>

  // Computed
  letterStatuses: ComputedRef<Record<string, 'correct' | 'present' | 'absent'>>

  // Methods
  handleInput: (key: string) => void
  resetGame: () => void
  getLetterClass: (row: number, col: number) => string
  getFlipDelay: (col: number) => string
  initGame: () => void
  cleanup: () => void
}

export function useGame(): UseGameReturn {
  // Game state
  const solution = ref('')
  const guesses = ref<string[]>(Array(6).fill(''))
  const currentRow = ref(0)
  const gameState = ref<'playing' | 'won' | 'lost'>('playing')
  const shakeRow = ref(-1)
  const revealRow = ref(-1)
  const isRevealing = ref(false)

  // Stats
  const stats = ref<GameStats>({ win: 0, lose: 0, streak: 0 })

  // Computed: letter status for keyboard coloring
  const letterStatuses = computed(() => {
    const statuses: Record<string, 'correct' | 'present' | 'absent'> = {}

    for (let i = 0; i < currentRow.value; i++) {
      const guess = guesses.value[i]
      if (!guess) continue

      for (let j = 0; j < guess.length; j++) {
        const char = guess[j]
        if (!char) continue

        if (solution.value[j] === char) {
          statuses[char] = 'correct'
        } else if (solution.value.includes(char) && statuses[char] !== 'correct') {
          statuses[char] = 'present'
        } else if (!statuses[char]) {
          statuses[char] = 'absent'
        }
      }
    }

    return statuses
  })

  // Keyboard handler
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return
    handleInput(e.key)
  }

  // Initialize game
  const initGame = () => {
    solution.value = getDailyWord()

    // Load stats from localStorage
    const saved = localStorage.getItem('tembung-stats')
    if (saved) {
      stats.value = JSON.parse(saved)
    }

    // Load today's progress
    const now = new Date()
    const todayKey = `tembung-${now.toDateString()}`
    const todayProgress = localStorage.getItem(todayKey)
    if (todayProgress) {
      const data = JSON.parse(todayProgress)
      guesses.value = data.guesses
      currentRow.value = data.currentRow
      gameState.value = data.gameState
    }

    // Add keyboard listener
    window.addEventListener('keydown', handleKeydown)
  }

  // Cleanup
  const cleanup = () => {
    window.removeEventListener('keydown', handleKeydown)
  }

  // Handle input
  const handleInput = (key: string) => {
    if (gameState.value !== 'playing') return
    if (isRevealing.value) return

    const current = guesses.value[currentRow.value] ?? ''

    if (key === 'Enter') {
      if (current.length === 5) {
        submitGuess()
      } else {
        triggerShake()
      }
    } else if (key === 'Backspace') {
      guesses.value[currentRow.value] = current.slice(0, -1)
    } else if (current.length < 5 && /^[A-Z]$/i.test(key)) {
      guesses.value[currentRow.value] = current + key.toUpperCase()
    }
  }

  // Trigger shake animation
  const triggerShake = () => {
    shakeRow.value = currentRow.value
    setTimeout(() => {
      shakeRow.value = -1
    }, 500)
  }

  // Submit guess
  const submitGuess = () => {
    const guess = guesses.value[currentRow.value]

    isRevealing.value = true
    revealRow.value = currentRow.value

    setTimeout(() => {
      if (guess === solution.value) {
        gameState.value = 'won'
        saveStats(true)
      } else if (currentRow.value === 5) {
        gameState.value = 'lost'
        saveStats(false)
      } else {
        currentRow.value++
      }
      revealRow.value = -1
      isRevealing.value = false
      saveProgress()
    }, 1500)
  }

  // Save stats
  const saveStats = (isWin: boolean) => {
    if (isWin) {
      stats.value.win++
      stats.value.streak++
    } else {
      stats.value.lose++
      stats.value.streak = 0
    }
    localStorage.setItem('tembung-stats', JSON.stringify(stats.value))
  }

  // Save progress
  const saveProgress = () => {
    const now = new Date()
    const todayKey = `tembung-${now.toDateString()}`
    localStorage.setItem(
      todayKey,
      JSON.stringify({
        guesses: guesses.value,
        currentRow: currentRow.value,
        gameState: gameState.value,
      }),
    )
  }

  // Get letter class for styling
  const getLetterClass = (row: number, col: number): string => {
    const rowGuess = guesses.value[row] ?? ''

    if (row > currentRow.value || (row === currentRow.value && gameState.value === 'playing')) {
      return rowGuess[col] ? 'border-slate-500 scale-105' : 'border-slate-700'
    }

    const guess = guesses.value[row] ?? ''
    const char = guess[col]
    if (!char) return 'border-slate-700'

    if (solution.value[col] === char) {
      return 'bg-emerald-600 border-emerald-600 text-white'
    }

    // Count letter occurrences
    let letterCountInSolution = 0
    for (const c of solution.value) {
      if (c === char) letterCountInSolution++
    }

    let usedCount = 0
    for (let i = 0; i < 5; i++) {
      if (guess[i] === char && solution.value[i] === char) {
        usedCount++
      }
    }

    for (let i = 0; i < col; i++) {
      if (guess[i] === char && solution.value[i] !== char && solution.value.includes(char)) {
        usedCount++
      }
    }

    if (solution.value.includes(char) && usedCount < letterCountInSolution) {
      return 'bg-amber-500 border-amber-500 text-white'
    }

    return 'bg-slate-700 border-slate-700 text-white'
  }

  // Get flip delay
  const getFlipDelay = (col: number): string => {
    return `${col * 0.3}s`
  }

  // Reset game (practice mode)
  const resetGame = () => {
    guesses.value = Array(6).fill('')
    currentRow.value = 0
    gameState.value = 'playing'
    solution.value = getRandomWord()

    const now = new Date()
    const todayKey = `tembung-${now.toDateString()}`
    localStorage.removeItem(todayKey)
  }

  return {
    solution,
    guesses,
    currentRow,
    gameState,
    shakeRow,
    revealRow,
    isRevealing,
    stats,
    letterStatuses,
    handleInput,
    resetGame,
    getLetterClass,
    getFlipDelay,
    initGame,
    cleanup,
  }
}
