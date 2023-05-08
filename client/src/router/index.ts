import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/auth',
    component: () => import('../layouts/AuthLayout.vue'),
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
        name: "Catalog",
        path: '',
        component: () => import('../views/car-catalog.vue'),
      },
      {
        name: "UsersWishes",
        path: '/lists',
        component: () => import('../views/users-wishlists.vue'),
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/404-page.vue'),
  },
  ],

})

export default router
