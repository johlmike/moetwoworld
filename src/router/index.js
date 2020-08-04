import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/layout/Index.vue'),
      },
      {
        path: '/products',
        name: '商品列表',
        component: () => import('../views/layout/Products.vue'),
      },
    ],
  },
  // 巢狀路由
  // {
  //   path: '/login',
  //   component: () => import('../views/dashboard/Login.vue'),
  // },
  {
    path: '/admin',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/ManageProducts.vue'),
      },
      // {
      //   path: 'orders',
      //   component: () => import('../views/dashboard/Orders.vue'),
      // },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
