<template>
  <router-view v-slot="{ Component, route }">
    <transition mode="out-in">
      <keep-alive :exclude="excludeViews">
        <component :is="Component" :key="route.name" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
// 禁用keep-alive特性的页面
const excludeViews = ['HomePage']
</script>

<style lang="scss" scoped>
.v-enter-from,
.v-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
</style>
