<template>
  <div class="list-card" ov-h fl-c fl-ais mt-10 ml-10 br-10 cu-p>
    <section fl-1 pa-10 bg-6>{{ item }}</section>
    <section fl-0 pa-10 bg-1>
      <div br-1 bg-6></div>
      <div mt-8 br-1 bg-6></div>
    </section>
  </div>
</template>

<script setup lang="ts">
defineProps<{ item: string }>()
</script>

<style lang="scss" scoped>
.list-card {
  width: 170px;
  height: 170px;

  div {
    height: 12px;
  }

  div:nth-child(2) {
    width: 75%;
  }
}
</style>
