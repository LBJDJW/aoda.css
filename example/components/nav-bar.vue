<template>
  <header fl-r fl-jcsb pa-16 bg-1>
    <h1 fl-1>🎨 aoda.css</h1>
    <div fl-0 ml-20 cu-p us-n @click="toogleTheme">
      {{ theme === 'dark' ? '🌞' : '🌙' }}
    </div>
    <svg-github fl-0 ml-20 cu-p us-n @click="clickGithub" />
  </header>
</template>

<script setup lang="ts">
import { useTheme } from '@example/use'
import SvgGithub from './svg-github.vue'

const { theme, toogleTheme } = useTheme()

function clickGithub() {
  window.open('https://github.com/aodazhang/aoda.css')
}
</script>
