import { createRouter, createWebHistory } from 'vue-router'


// console.log(loggedIn);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:notFound',
      name: 'notfound',
      component: () => import('../views/not_logged/404Error.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/not_logged/Login.vue')
    },
    {
      path: '/register',
      name: 'registeruser',
      component: () => import('../views/not_logged/Register.vue')
    },
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: () => import('../views/logged/Home.vue')
    },
    {
      path: '/search',
      name: 'search',
      meta: { requiresAuth: true },
      component: () => import('../views/logged/Search.vue')
    },
    {
      path: '/create-post',
      name: 'createpost',
      meta: { requiresAuth: true },
      component: () => import('../views/logged/CreatePost.vue')
    },
    {
      path: '/posts/:id',
      name: 'post-detail-page',
      meta: { requiresAuth: true },
      component : () => import('../views/logged/PDP.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  let loggedIn = false;
  const cookieToken = (document.cookie.match(/^(?:.*;)?\s*token\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1];
  cookieToken ? loggedIn = true : loggedIn = false;
  if (to.meta.requiresAuth && !loggedIn) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})

export default router
