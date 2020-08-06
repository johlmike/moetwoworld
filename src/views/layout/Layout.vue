<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
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
      page: 1,
      cart: [],
    };
  },
  methods: {
    getProducts() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/products?page=${this.page}&paged=9`;
      this.axios
        .get(url)
        .then((res) => {
          loader.hide();
          this.products = [...res.data.data];
        })
        .catch((res) => {
          console.log(res.data);
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

<style></style>
