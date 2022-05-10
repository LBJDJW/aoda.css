<template>
  <div class="g-page" po-a z-0 fl-c fl-ais>
    <NavBar fl-0 />
    <ul id="homeList" fl-1 fl-r fl-fww fl-acfs ov-y pb-100 bg-5>
      <list-card
        v-for="(item, index) of list"
        :key="index"
        :item="item"
        @click="onClickDetail(($event.currentTarget as HTMLElement).getBoundingClientRect(), item)"
      />
    </ul>
    <footer pv-10 fs-12 fw-b ta-c bg-1>
      v{{ version }}&nbsp;&nbsp;|&nbsp;&nbsp;{{ buildTime }}
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage'
}
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { commonStore } from '@example/store'
import NavBar from '@example/components/nav-bar.vue'
import ListCard from '@example/components/list-card.vue'

const router = useRouter()
const common = commonStore()
const { version, buildTime, list } = storeToRefs(common)

common.init()

function onClickDetail(rect: DOMRect, item: string) {
  router.push({
    name: 'detail',
    query: { item },
    params: { top: rect.top, left: rect.left, width: rect.width }
  })
}
</script>
