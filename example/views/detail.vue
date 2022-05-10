<template>
  <div class="g-page" po-a z-1 fl-c fl-ais>
    <section class="image" fl-0 pa-10 bg-6 cu-p @click="router.go(-1)">
      {{ item }}
    </section>
    <section class="content" fl-1 pa-20 bg-1>
      <div br-1 bg-6></div>
      <div mt-10 br-1 bg-6></div>
      <div mt-10 br-1 bg-6></div>
      <div mt-10 br-1 bg-6></div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DetailPage'
}
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTheme } from '@example/use'

defineProps<{ item: string }>()

const router = useRouter()
useTheme()
</script>

<style lang="scss" scoped>
@import '~@scss/mixins/index.scss';

.image {
  height: 40vh;
}

.content {
  $animationId: detail-move;
  $duration: 0.35s;
  $timingFunction: cubic-bezier(0.35, 0, 0.2, 1.32);

  div {
    height: 15px;
    transform-origin: center;
    transform: translateY(200px);
    opacity: 0;
  }

  div:nth-child(1) {
    width: 60%;
    @include animation($animationId, $duration, $timingFunction, 0.1s);
  }

  div:nth-child(2),
  div:nth-child(3),
  div:nth-child(4) {
    @include animation($animationId, $duration, $timingFunction, 0.2s);
  }

  div:nth-child(4) {
    width: 45%;
  }
}

@keyframes detail-move {
  from {
    transform: translateY(200px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
