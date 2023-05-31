import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import { useNotification } from '../composables/useNotification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue')
      // children: [
      //   {
      //     name: "SignIn",
      //     path: 'sign-in',
      //     component: () => import('../views/Auth/sign-in.vue'),
      //   },
      //   {
      //     name: "SignUp",
      //     path: 'sign-up',
      //     component: () => import('../views/Auth/sign-up.vue'),
      //   },
      // ]
    },
    {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          name: 'Catalog',
          path: '',
          component: () => import('../views/car-catalog.vue')
        },
        {
          name: 'UsersWishes',
          path: '/lists',
          component: () => import('../views/users-wishlists.vue'),
          meta: {
            needAuth: true
          }
        },
        {
          name: 'SharedList',
          path: '/shared-list/:shareKey',
          component: () => import('../views/shared-wishlist.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/404-page.vue')
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  if (to.meta.needAuth) {
    const { user } = useUserStore()
    const { error } = useNotification()

    if (user !== null) {
      next()
    } else {
      error('Sign in to account!')
      next({ name: 'Catalog' })
    }
  }

  next()
})
