import { ref } from 'vue'

export function useTheme() {
  const cache = localStorage.getItem('theme')

  const theme = ref(['default', 'dark'].includes(cache) ? cache : 'default')
  sync()

  function toogleTheme() {
    theme.value = theme.value === 'default' ? 'dark' : 'default'
    sync()
  }

  function sync() {
    localStorage.setItem('theme', theme.value)
    document.documentElement.dataset.theme = theme.value
  }

  return { theme, toogleTheme }
}
