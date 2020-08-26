<template>
  <div class="layout">
    <Navbar></Navbar>
    <router-view :products="products" :cart="cart" class="view"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: { Navbar, Footer },
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
          } else {
            // 所有商品讀取完畢，轉換 options 字串為物件
            this.products.forEach((product) => {
              product.options = JSON.parse(product.options);
            });
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
    addCart(id, quantity, cb) {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/shopping`;
      const data = {
        product: id,
        quantity,
      };
      if (this.cart.find((cartItem) => cartItem.product.id === id)) {
        loader.hide();
        const originQuantity = this.cart.find((cartItem) => cartItem.product.id === id).quantity;
        const updatingProduct = this.products.find((product) => product.id === id);
        let addQuantity = originQuantity + quantity;
        // 使用者新增之數量會超過庫存，更新 quantity 為庫存上限
        if (addQuantity > updatingProduct.options.stock) {
          addQuantity = updatingProduct.options.stock;
        }
        // 檢查到重複，改用update
        this.updateCart(id, addQuantity, cb);
      } else {
        this.axios
          .post(url, data)
          .then((res) => {
            loader.hide();
            // 更新本地端之購物車內容
            this.cart.unshift(this._.cloneDeep(res.data.data));
            this.$swal({
              text: '成功加入購物車',
              icon: 'success',
            });
            if (cb) {
              cb();
            }
          })
          .catch((err) => {
            loader.hide();
            console.log(err.response);
          });
      }
    },
    updateCart(id, quantity, cb) {
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
          this.$swal({
            text: '成功更新購物車',
            icon: 'success',
          });
          if (cb) {
            cb();
          }
        })
        .catch((err) => {
          loader.hide();
          if (err.response.data.errors[0] === 'quantity 並沒有任何更改。') {
            this.$swal({
              text: '已達到庫存上限',
              icon: 'warning',
            });
          }
          console.log(err.response);
        });
    },
    deleteCart(id) {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/shopping/${id}`;
      this.axios
        .delete(url)
        .then(() => {
          loader.hide();
          // 更新本地端購物車
          this.cart = this.cart.filter((cartItem) => cartItem.product.id != id);
          this.$swal({
            text: '刪除成功',
            icon: 'success',
          });
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    deleteAllCart() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/shopping/all/product`;
      this.axios
        .delete(url)
        .then(() => {
          loader.hide();
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
    this.$bus.$on('getCart', this.getCart);
    this.$bus.$on('addCart', this.addCart);
    this.$bus.$on('updateCart', this.updateCart);
    this.$bus.$on('deleteCart', this.deleteCart);
    this.$bus.$on('deleteAllCart', this.deleteAllCart);
  },
};
</script>

<style lang="scss" scoped>
.layout {
  background-color: $bright;
  min-height: 100vh;
  .view {
    // 減掉 navbar 高度、 footer 高度、 footer padding(1rem) + 中間內容的 margin(2.5rem) + border 2px
    min-height: calc(100vh - 63px - 120px - 3.5rem - 2px);
    @media screen and (max-width: 576px) {
      // 減掉 navbar 高度、 footer 高度、 footer padding(1rem) + 中間內容的 margin(1.5rem) + border 2px
      min-height: calc(100vh - 63px - 280px - 2.5rem - 2px);
    }
  }
}
</style>
