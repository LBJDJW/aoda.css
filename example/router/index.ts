import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { transitionType: 'filp1', positionId: 'homeList' },
      component: () =>
        import(/* webpackChunkName: "home" */ '@example/views/home.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      meta: { transitionType: 'filp2' },
      component: () =>
        import(/* webpackChunkName: "detail" */ '@example/views/detail.vue'),
      props: route => ({
        item: route.query.item
      })
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0, left: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (typeof from.meta.positionId === 'string') {
    const dom = document.getElementById(from.meta.positionId)
    dom && localStorage.setItem(from.meta.positionId, `${dom.scrollTop}`)
  }
  if (typeof to.meta.positionId === 'string') {
    const positionY = Number(localStorage.getItem(to.meta.positionId))
    setTimeout(() => {
      const dom = document.getElementById(to.meta.positionId as string)
      dom && dom.scrollTo(0, isNaN(positionY) ? 0 : positionY)
    }, 0)
  }
  next()
})

export default router
