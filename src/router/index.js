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
  {
    path: '/admin-login',
    component: () => import('../views/AdminLogin.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products-manage',
        alias: '',
        name: '商品管理',
        component: () => import('../views/dashboard/ProductsManage.vue'),
      },
      {
        path: 'coupon-manage',
        name: '優惠券管理',
        component: () => import('../views/dashboard/CouponManage.vue'),
      },
      {
        path: 'order-manage',
        name: '訂單管理',
        component: () => import('../views/dashboard/OrderManage.vue'),
      },
      {
        path: 'picture-manage',
        name: '圖片管理',
        component: () => import('../views/dashboard/PictureManage.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
