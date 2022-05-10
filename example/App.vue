<template>
  <router-view v-slot="{ Component, route }">
    <animation-filp>
      <keep-alive :exclude="exclude">
        <component :is="Component" :key="route.name" />
      </keep-alive>
    </animation-filp>
  </router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AnimationFilp from './components/animation-filp.vue'

// 禁用keep-alive特性的页面
const exclude = ref(['DetailPage'])
</script>
