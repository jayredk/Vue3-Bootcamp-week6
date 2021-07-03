import { createRouter, createWebHashHistory } from 'vue-router';
// import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children: [
      {
        path: '/product-list',
        name: 'product-list',
        component: () => import(/* webpackChunkName: "Products" */ '../views/ProductList.vue'),
      },
      {
        path: '/product-list/:id',
        component: () => import(/* webpackChunkName: "Products" */ '../views/Product.vue'),
      },
      {
        path: '/cart',
        component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
