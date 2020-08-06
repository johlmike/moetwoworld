<template>
  <div class="cart">
    <div class="container">
      <div class="cart-table pb-5">
        <div class="cart-table-head row">
          <div class="col-5">商品名稱</div>
          <div class="col-2">數量</div>
          <div class="col-2">單價</div>
          <div class="col-2">小計</div>
        </div>
        <div class="cart-table-body">
          <div v-if="cart.length === 0" class="empty">
            購物車還空空的喔～快去逛逛吧！
          </div>
          <div v-for="(cartItem, index) in cart" :key="'cart_' + index" class="body-item row py-3">
            <div class="col-5 body-item-title">{{ cartItem.product.title }}</div>
            <div class="col-2 body-item-quantity">
              <input
                type="number"
                name="數量"
                min="1"
                v-model.lazy="cartItem.quantity"
                @change="updateCart(index)"
                class="form-control mr-2"
              />
              {{ cartItem.product.unit }}
            </div>
            <div class="col-2 body-item-price">NT$ {{ cartItem.product.price }}</div>
            <div class="col-2 body-item-total">
              NT$ {{ cartItem.product.price * cartItem.quantity }}
            </div>
            <div class="col-1 body-item-delete">
              <font-awesome-icon
                :icon="['fas', 'trash-alt']"
                class="icon-delete"
                @click="deleteCart(index)"
              />
            </div>
          </div>
        </div>
        <div class="cart-table-footer row">
          <div class="offset-9 col-2 sum">共 NT$ {{ sumPrice }} 元</div>
          <div class="col-1 text-center">
            <button type="button" class="btn btn-primary btn-checkout">結帳</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: Array,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
    };
  },
  methods: {
    updateCart(index) {
      if (this.cart[index].quantity > 0) {
        // 如果使用者輸入正確的數量(大於 1)，更新購物車
        const loader = this.$loading.show();
        const url = `${this.baseUrl}${this.uuid}/ec/shopping`;
        const data = {
          product: this.cart[index].product.id,
          quantity: this.cart[index].quantity,
        };
        this.axios
          .patch(url, data)
          .then(() => {
            loader.hide();
          })
          .catch((err) => {
            loader.hide();
            console.log(err.response);
          });
      } else {
        // 如輸入 0 或 負數，預設使用者是要將數量減少至 1
        this.cart[index].quantity = 1;
        this.updateCart(index);
      }
    },
    deleteCart(index) {
      const loader = this.$loading.show();
      const productId = this.cart[index].product.id;
      const url = `${this.baseUrl}${this.uuid}/ec/shopping/${productId}`;
      this.axios
        .delete(url)
        .then(() => {
          loader.hide();
          // 更新本地端購物車
          this.cart.splice(index, 1);
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
  },
  computed: {
    sumPrice() {
      let sum = 0;
      this.cart.forEach((cartItem) => {
        const cartItemSum = cartItem.product.price * cartItem.quantity;
        sum += cartItemSum;
      });
      return sum;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  background-color: $bright;
}
.container {
  padding-top: 2.5rem;
}
.cart-table {
  color: $dark;
  font-weight: bold;
  .cart-table-head {
    border-bottom: 1px solid $dark;
    padding-bottom: 1rem;
    text-align: center;
  }
  .cart-table-body {
    .empty {
      height: 50vh;
      line-height: 50vh;
    }
    .body-item {
      .body-item-title,
      .body-item-quantity,
      .body-item-price,
      .body-item-total,
      .body-item-delete {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .body-item-quantity {
        input {
          width: 4rem;
          color: $dark;
          font-weight: bold;
          text-align: center;
        }
      }
      .body-item-delete {
        justify-content: center;
        .icon-delete {
          color: red;
          cursor: pointer;
        }
      }
    }
  }
  .cart-table-footer {
    border-top: 1px solid $dark;
    padding-top: 1rem;
    .sum {
      text-align: center;
      line-height: 2.5rem;
    }
    .btn-checkout {
      background-color: $dark;
      color: $bright;
      border: 0;
      height: 2.5rem;
    }
  }
}
</style>
