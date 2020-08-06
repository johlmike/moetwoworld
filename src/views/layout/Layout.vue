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
    addCart(id, quantity) {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/shopping`;
      const data = {
        product: id,
        quantity,
      };
      this.axios
        .post(url, data)
        .then((res) => {
          loader.hide();
          // 更新本地端之購物車內容
          this.cart.unshift(this._.cloneDeep(res.data.data));
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    updateCart(id, quantity) {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/shopping`;
      const cartProduct = this.cart.find((cartItem) => cartItem.product.id === id);
      const data = {
        product: id,
        quantity,
      };
      this.axios
        .patch(url, data)
        .then(() => {
          loader.hide();
          // 更新本地端購物車之商品數量
          cartProduct.quantity = data.quantity;
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    deleteCart(id) {
      console.log('刪除購物車');
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/shopping/${id}`;
      this.axios
        .delete(url)
        .then(() => {
          loader.hide();
          // 更新本地端購物車
          this.cart = this.cart.filter( cartItem => cartItem.product.id != id );
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
    // 監聽購物車事件
    this.$bus.$on('addCart', this.addCart);
    this.$bus.$on('updateCart', this.updateCart);
    this.$bus.$on('deleteCart', this.deleteCart);
  },
};
</script>

<style lang="scss" scoped>
.layout {
  background-color: $bright;
  min-height: 100vh;
}
</style>
