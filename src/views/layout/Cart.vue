<template>
  <div class="cart mb-3">
    <div class="container">
      <div class="cart-table">
        <div class="cart-table-head row">
          <div class="col-sm-5 col-5">商品名稱</div>
          <div class="col-sm-2 col-3">數量</div>
          <div class="col-sm-2 col-3">單價</div>
          <div class="col-sm-2 d-sm-block d-none">小計</div>
          <div class="col-sm-1 col-1"></div>
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
            <div class="col-sm-5 col-5 body-item-title">{{ cartItem.product.title }}</div>
            <div class="col-sm-2 col-3 body-item-quantity">
              <input
                type="number"
                name="數量"
                min="1"
                v-model.lazy.number="cartItem.quantity"
                @change="updateCart(index)"
                class="form-control mr-2"
              />
              {{ cartItem.product.unit }}
            </div>
            <div class="col-sm-2 col-3 body-item-price">${{ cartItem.product.price }}</div>
            <div class="col-sm-2 col-2 body-item-total d-sm-flex d-none">
              ${{ cartItem.product.price * cartItem.quantity }}
            </div>
            <div class="col-sm-1 col-1 body-item-delete">
              <font-awesome-icon
                :icon="['fas', 'trash-alt']"
                class="icon-delete"
                @click="deleteCart(index)"
              />
            </div>
          </div>
        </div>
        <div class="cart-table-footer row">
          <div class="input-group col-sm-5 mb-sm-0 mb-2 h-100">
            <div class="input-group-prepend">
              <span class="input-group-text" id="coupon">優惠券</span>
            </div>
            <input
              v-model.lazy="couponCode"
              type="text"
              id="input-coupon"
              class="form-control text-center"
              aria-label="coupon"
              aria-describedby="coupon"
              style="height: auto;"
              @change="checkCoupon"
            />
          </div>
          <div class="col-sm-4 coupon">
            <div v-show="!_.isEmpty(coupon)">
              {{ coupon.title }} - {{ coupon.code }}
              <font-awesome-icon
                class="ml-2 btn-delete-coupon"
                :icon="['fas', 'times-circle']"
                @click="deleteCoupon()"
              />
            </div>
          </div>
          <div class="col-sm-2 sum" v-show="_.isEmpty(coupon)">總計： {{ sumPrice }} 元</div>
          <div class="col-sm-2 sum" v-show="!_.isEmpty(coupon)">
            <span class="discountNum">
              折扣： {{ Math.floor(sumPrice - discountedPrice) }} 元
            </span>
            <br />
            特價： {{ discountedPrice }} 元
          </div>
          <div class="col-sm-1 text-center">
            <router-link to="/checkout">
              <button
                type="button"
                class="btn btn-primary btn-checkout"
                :disabled="cart.length === 0"
              >
                結帳
              </button>
            </router-link>
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
    coupon: Object,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      localCart: [],
      couponCode: '',
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
    checkCoupon() {
      if (this.couponCode) {
        const loader = this.$loading.show();
        const url = `${this.baseUrl}${this.uuid}/ec/coupon/search`;
        this.axios
          .post(url, { code: this.couponCode })
          .then((res) => {
            loader.hide();
            this.couponCode = '';
            const nowTimestamp = new Date().getTime();
            const deadlineTimestamp = res.data.data.deadline.timestamp * 1000;
            // 有此優惠券，檢查是否已過期
            if (nowTimestamp > deadlineTimestamp) {
              this.$swal({
                text: '優惠券已過期',
                icon: 'error',
              });
            } else {
              this.$swal({
                text: '優惠券加入成功',
                icon: 'success',
              });
              this.$bus.$emit('setCoupon', res.data.data);
            }
          })
          .catch((err) => {
            loader.hide();
            this.couponCode = '';
            if (err.response.data.message === '該 COUPON 序號並不存在。') {
              this.$swal({
                text: '優惠券輸入錯誤',
                icon: 'error',
              });
            } else {
              console.log(err.response);
            }
          });
      }
    },
    deleteCoupon() {
      this.$bus.$emit('setCoupon', {});
    },
  },
  computed: {
    discountedPrice() {
      return Math.ceil((this.sumPrice * this.coupon.percent) / 100);
    },
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
  margin-top: 2.5rem;
  @media screen and (max-width: 576px) {
    margin-top: 1.5rem;
  }
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
    .coupon {
      text-align: center;
      line-height: 2.5rem;
      font-weight: 100;
      .btn-delete-coupon {
        cursor: pointer;
      }
    }
    .sum {
      font-size: 1.2rem;
      text-align: center;
      line-height: 2.5rem;
      .discountNum {
        color: gray;
        font-size: 1rem;
        font-weight: 100;
      }
    }
    .btn-checkout {
      width: 100%;
    }
  }
}
</style>
