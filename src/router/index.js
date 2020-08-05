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
      {
        path: '/about',
        name: '關於我們',
        component: () => import('../views/layout/About.vue'),
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../views/layout/Cart.vue'),
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
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
