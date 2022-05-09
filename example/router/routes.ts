import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {},
    component: () =>
      import(/* webpackChunkName: "home" */ '@example/views/home.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {},
    component: () =>
      import(/* webpackChunkName: "detail" */ '@example/views/detail.vue')
  },
  {
    // 重定向路由：https://router.vuejs.org/zh/guide/migration/#%E5%88%A0%E9%99%A4%E4%BA%86-%EF%BC%88%E6%98%9F%E6%A0%87%E6%88%96%E9%80%9A%E9%85%8D%E7%AC%A6%EF%BC%89%E8%B7%AF%E7%94%B1
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export default routes
