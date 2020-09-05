<template>
  <div class="checkout">
    <div class="container">
      <div class="row">
        <div class="customer col-sm-7 py-4 order-2 order-sm-1">
          <h3>客戶資料</h3>
          <hr />
          <div class="row mb-4">
            <ValidationObserver v-slot="{ invalid }" class="w-100 px-3">
              <form>
                <ValidationProvider rules="required" v-slot="{ errors, classes }" mode="lazy">
                  <div class="form-group">
                    <label for="name">收件人姓名</label>
                    <input
                      type="text"
                      name="收件人姓名"
                      id="name"
                      v-model="userData.name"
                      :class="classes"
                      class="form-control"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="email|required" v-slot="{ errors, classes }" mode="lazy">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      name="Email"
                      id="email"
                      v-model="userData.email"
                      :class="classes"
                      class="form-control"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="min:8|required" v-slot="{ errors, classes }" mode="lazy">
                  <div class="form-group">
                    <label for="tel">電話</label>
                    <input
                      type="tel"
                      name="電話"
                      id="tel"
                      v-model="userData.tel"
                      :class="classes"
                      class="form-control"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ errors, classes }" mode="lazy">
                  <div class="form-group">
                    <label for="address">地址</label>
                    <input
                      type="text"
                      name="地址"
                      id="address"
                      v-model="userData.address"
                      :class="classes"
                      class="form-control"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <div class="form-group">
                  <label for="payment">付款方式</label>
                  <select class="form-control" id="payment" v-model="userData.payment">
                    <option value="WebATM">WebATM</option>
                    <option value="ATM">ATM</option>
                    <option value="Barcode">Barcode</option>
                    <option value="Credit">Credit</option>
                    <option value="ApplePay">ApplePay</option>
                    <option value="GooglePay">GooglePay</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="message">留言</label>
                  <textarea
                    class="form-control"
                    id="message"
                    rows="3"
                    v-model="userData.message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary btn-submit"
                  v-on:click.prevent="sendOrder"
                  :disabled="invalid || cart.length === 0"
                >
                  送出訂單
                </button>
              </form>
            </ValidationObserver>
          </div>
        </div>
        <div class="order col-sm-5 py-4 order-1 order-sm-2">
          <h3>訂單明細</h3>
          <hr />
          <div v-if="cart.length === 0" class="empty">
            購物車還空空的喔～快去逛逛吧！
          </div>
          <div class="row product mb-2" v-for="cartItem in cart" :key="cartItem.product.id">
            <div
              class="col-2 product-img"
              :style="{
                backgroundImage: 'url(' + cartItem.product.imageUrl[0] + ')',
              }"
            ></div>
            <div class="col-8 product-detail">
              <div class="product-title">{{ cartItem.product.title }}</div>
              <div class="product-price">
                ${{ cartItem.product.price }} / {{ cartItem.product.unit }}
              </div>
            </div>
            <div class="col-2 product-number">
              <div class="product-number">x {{ cartItem.quantity }}</div>
              <div class="product-total font-weight-bold">
                ${{ cartItem.product.price * cartItem.quantity }}
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col font-weight-bold text-right total" v-show="_.isEmpty(coupon)">
              總計：{{ sumPrice }} 元
            </div>
          </div>
          <div class="row">
            <div class="col text-right discount" v-show="!_.isEmpty(coupon)">
              {{ coupon.title }} >> 折扣：{{ sumPrice - discountedPrice }} 元
            </div>
          </div>
          <div class="row">
            <div class="col font-weight-bold text-right total" v-show="!_.isEmpty(coupon)">
              特價：{{ discountedPrice }} 元
            </div>
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
      userData: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: 'WebATM',
        message: '',
      },
    };
  },
  methods: {
    sendOrder() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/orders`;
      // 檢查是否使用優惠券
      this._.isEmpty(this.coupon)
        ? (this.userData.coupon = '')
        : (this.userData.coupon = this.coupon.code);
      this.axios
        .post(url, this.userData)
        .then((res) => {
          loader.hide();
          // 傳送訂單成功，呼叫 layout 清除購物車和優惠券資料
          this.$bus.$emit('orderSent');
          this.$router.push(`/finish/${res.data.data.id}`);
        })
        .catch(() => {
          loader.hide();
        });
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
};
</script>

<style lang="scss" scoped>
.checkout {
  margin-top: 2.5rem;
  @media screen and (max-width: 576px) {
    margin-top: 1.5rem;
  }
  color: $dark;
  .customer {
    .form-group {
      text-align: left;
      font-size: 1.3rem;
      color: $dark;
    }
    .btn-submit {
      width: 100%;
      margin-top: 1rem;
    }
  }
  .order {
    border: 1px solid $dark;
    border-radius: 0.5rem;
    height: fit-content;
    .empty {
      height: 50vh;
      line-height: 50vh;
      text-align: center;
    }
    .product {
      .product-img {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    .discount {
      color: gray;
    }
    .total {
      font-size: 1.5rem;
    }
  }
}
</style>
