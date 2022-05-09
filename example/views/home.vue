<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <p>令牌：{{ user.token }}</p>
    <p>姓名：{{ user.name }}</p>
    <p>page_1</p>
    <img
      src="http://5b0988e595225.cdn.sohucs.com/images/20190423/5105ccb94a1a4b3cb97ad6a94221b6c5.jpeg"
    />
    <p>构建时间：{{ buildTime }}</p>
    <button @click="onClickDetail">跳转详情页</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage'
}
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '../store'

const router = useRouter()
const user = userStore()

onMounted(() => {
  user.login()
})

const title = ref('首页')
const onClickDetail = () => router.push({ name: 'detail' })
// eslint-disable-next-line
const buildTime = PROJECT_BUILDTIME
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;

  img {
    display: block;
    width: 200px;
    height: 200px;
  }
}
</style>
