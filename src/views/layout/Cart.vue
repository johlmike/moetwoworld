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
          <div v-if="localCart.length === 0" class="empty">
            購物車還空空的喔～快去逛逛吧！
          </div>
          <div
            v-for="(cartItem, index) in localCart"
            :key="'cart_' + index"
            class="body-item row py-3"
          >
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
    products: Array,
    cart: Array,
  },
  data() {
    return {
      localCart: [],
    };
  },
  methods: {
    updateCart(index) {
      if (this.localCart[index].quantity > 0) {
        // 如果使用者輸入正確的數量(大於 1)，更新購物車
        // 檢查是否超過庫存
        const updatingProduct = this.products.find(
          (product) => product.id === this.localCart[index].product.id
        );
        if (this.localCart[index].quantity > updatingProduct.options.stock) {
          this.localCart[index].quantity = updatingProduct.options.stock;
        }
        this.$bus.$emit(
          'updateCart',
          this.localCart[index].product.id,
          this.localCart[index].quantity
        );
      } else {
        // 如輸入 0 或 負數，預設使用者是要將數量減少至 1
        this.localCart[index].quantity = 1;
        this.$bus.$emit('updateCart', this.localCart[index].product.id, 1);
      }
    },
    deleteCart(index) {
      this.$bus.$emit('deleteCart', this.localCart[index].product.id);
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
  watch: {
    cart() {
      this.localCart = this._.cloneDeep(this.cart);
    },
  },
  created() {
    this.localCart = this._.cloneDeep(this.cart);
  },
};
</script>

<style lang="scss" scoped>
.cart {
  background-color: $bright;
}
.container {
  margin-top: 2.5rem;
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
      text-align: center;
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
