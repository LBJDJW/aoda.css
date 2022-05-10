<template>
  <transition
    :css="false"
    @before-enter="beforeEnterAndLeave"
    @enter="enter"
    @after-enter="afterEnterAndLeave"
    @before-leave="beforeEnterAndLeave"
    @leave="leave"
    @after-leave="afterEnterAndLeave"
  >
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'

const route = useRoute()

const transitionConfig = reactive<{
  type: 'filpEnter' | 'filpLeave'
  duration: number
  top: number
  left: number
  width: number
}>({ type: null, duration: 0.35, top: 0, left: 0, width: 0 })
watch(
  () => route.meta,
  (newVal, oldVal) => {
    if (oldVal.transitionType == 'filp1' && newVal.transitionType === 'filp2') {
      transitionConfig.type = 'filpEnter'
      transitionConfig.top = Number(route.params.top) || 0
      transitionConfig.left = Number(route.params.left) || 0
      transitionConfig.width = Number(route.params.width) || 0
    } else if (
      oldVal.transitionType === 'filp2' &&
      newVal.transitionType == 'filp1'
    ) {
      transitionConfig.type = 'filpLeave'
    } else {
      transitionConfig.type = null
    }
  }
)

function calcRect(el: HTMLElement) {
  const domRect = el.getBoundingClientRect()
  const x = transitionConfig.left - domRect.left || 1
  const y = transitionConfig.top - domRect.top || 1
  const scale = transitionConfig.width / domRect.width || 0.5
  return [x, y, scale]
}

function beforeEnterAndLeave(el: HTMLElement) {
  el.style.cssText = 'overflow: hidden; transform-origin: top left;'
}
function afterEnterAndLeave(el: HTMLElement) {
  el.style.cssText = ''
}
function enter(el: HTMLElement, done: () => void) {
  if (transitionConfig.type !== 'filpEnter') {
    done()
    return
  }
  const [x, y, scale] = calcRect(el)
  gsap.fromTo(
    el,
    {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      borderRadius: '20px'
    },
    {
      transform: 'translate(0, 0) scale(1)',
      borderRadius: '0',
      duration: transitionConfig.duration,
      ease: 'power3.inOut',
      onComplete: done
    }
  )
}
function leave(el: HTMLElement, done: () => void) {
  if (transitionConfig.type !== 'filpLeave') {
    transitionConfig.type === 'filpEnter'
      ? setTimeout(done, transitionConfig.duration * 1000)
      : done()
    return
  }
  const [x, y, scale] = calcRect(el)
  gsap.fromTo(
    el,
    {
      transform: 'translate(0, 0) scale(1)',
      opacity: '1',
      borderRadius: '0'
    },
    {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      opacity: '0',
      borderRadius: '20px',
      duration: transitionConfig.duration,
      ease: 'power3.inOut',
      onComplete: done
    }
  )
}
</script>
