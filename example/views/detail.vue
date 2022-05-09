<template>
  <div class="detail">
    <h1>{{ title }}</h1>
    <p>page_2</p>
    <button @click="onClickBack">返回</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DetailPage'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('详情页')
const onClickBack = () => router.go(-1)
</script>

<style lang="scss" scoped>
.detail {
  width: 100vw;
  height: 100vh;

  h1 {
    font-size: 100px;
  }
}
</style>
