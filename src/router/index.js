import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/fronted/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/fronted/Index.vue'),
      },
      {
        path: '/products',
        name: '商品列表',
        component: () => import('../views/fronted/Products.vue'),
      },
      {
        path: '/product/:id',
        name: '商品頁',
        component: () => import('../views/fronted/Product.vue'),
      },
      {
        path: '/about',
        name: '關於兔窩',
        component: () => import('../views/fronted/About.vue'),
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../views/fronted/Cart.vue'),
      },
      {
        path: '/checkout',
        name: '結帳',
        component: () => import('../views/fronted/Checkout.vue'),
      },
      {
        path: '/finish/:id',
        name: '結帳完成',
        component: () => import('../views/fronted/Finish.vue'),
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
    component: () => import('../views/backed/Layout.vue'),
    children: [
      {
        path: '',
        alias: 'products-manage',
        name: '商品管理',
        component: () => import('../views/backed/ProductsManage.vue'),
      },
      {
        path: 'coupon-manage',
        name: '優惠券管理',
        component: () => import('../views/backed/CouponManage.vue'),
      },
      {
        path: 'order-manage',
        name: '訂單管理',
        component: () => import('../views/backed/OrderManage.vue'),
      },
      {
        path: 'picture-manage',
        name: '圖片管理',
        component: () => import('../views/backed/PictureManage.vue'),
      },
      {
        path: 'news-manage',
        name: '新聞管理',
        component: () => import('../views/backed/NewsManage.vue'),
      },
      {
        path: 'academy-manage',
        name: '愛兔文章管理',
        component: () => import('../views/backed/AcademyManage.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

export default router;
