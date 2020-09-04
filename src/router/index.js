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
        path: '/product/:id',
        name: '商品頁',
        component: () => import('../views/layout/Product.vue'),
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
      {
        path: '/checkout',
        name: '結帳',
        component: () => import('../views/layout/Checkout.vue'),
      },
      {
        path: '/finish/:id',
        name: '結帳完成',
        component: () => import('../views/layout/Finish.vue'),
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
        path: '',
        alias: 'products-manage',
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
