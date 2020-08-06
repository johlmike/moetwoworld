<template>
  <div class="layout">
    <Navbar></Navbar>
    <router-view :products="products" :cart="cart"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: { Navbar },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      products: [],
      totalPage: 1,
      cart: [],
    };
  },
  methods: {
    getProducts(page = 1) {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/products?page=${page}`;
      this.axios
        .get(url)
        .then((res) => {
          loader.hide();
          const currentPage = res.data.meta.pagination.current_page;
          this.totalPages = res.data.meta.pagination.total_pages;
          this.products = [...this.products, ...res.data.data];
          // 如果商品列表超過一頁且尚未讀取完畢，再執行一次 getProducts
          if (currentPage < this.totalPages) {
            this.getProducts(page + 1);
          }
        })
        .catch((res) => {
          console.log(res.response);
        });
    },
    getCart() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/shopping`;
      this.axios
        .get(url)
        .then((res) => {
          loader.hide();
          this.cart = [...res.data.data];
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
  },
  created() {
    // 由 layout 控制商品列表和購物車，減少 Ajax 讀取次數
    this.getProducts();
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
.layout {
  background-color: $bright;
  min-height: 100vh;
}
</style>
