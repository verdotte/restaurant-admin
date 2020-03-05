import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import About from '../pages/About.vue'
import MyLayout from '../layout/MyLayout.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: MyLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/about',
        name: 'About',
        component: About
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !store.getters['user/isLoggin']) next('/login')
    else if (!requiresAuth && store.getters['user/isLoggin']) next()
    else next()
})

export default router
