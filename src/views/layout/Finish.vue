<template>
  <div class="finish mb-3">
    <div class="container">
      <div class="row mb-3">
        <div class="col text-center">
          <svg
            id="successAnimation"
            class="animated"
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 70 70"
          >
            <path
              id="successAnimationResult"
              fill="#D8D8D8"
              d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"
            />
            <circle
              id="successAnimationCircle"
              cx="35"
              cy="35"
              r="24"
              stroke="#979797"
              stroke-width="2"
              stroke-linecap="round"
              fill="transparent"
            />
            <polyline
              id="successAnimationCheck"
              stroke="#979797"
              stroke-width="2"
              points="23 34 34 43 47 27"
              fill="transparent"
            />
          </svg>
        </div>
      </div>
      <div class="row">
        <div class="offset-sm-3 col-sm-6 text-center">
          <h1>訂單完成</h1>
          <hr />
        </div>
      </div>
      <div class="row">
        <div class="offset-sm-3 col-sm-6 text-center">
          <div v-for="product in orderData.products" :key="product.product.id" class="row mb-1">
            <div class="col">{{ product.product.title }} x {{ product.quantity }}</div>
          </div>
          <div class="row mt-3">
            <table class="table table-borderless">
              <tbody>
                <tr>
                  <th scope="row" class="text-right">收件人姓名：</th>
                  <td class="text-left">{{ orderData.user.name }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-right">Email：</th>
                  <td class="text-left">{{ orderData.user.email }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-right">電話：</th>
                  <td class="text-left">{{ orderData.user.tel }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-right">地址：</th>
                  <td class="text-left">{{ orderData.user.address }}</td>
                </tr>
                <tr>
                  <th scope="row" class="text-right">付款方式：</th>
                  <td class="text-left">{{ orderData.payment }}</td>
                </tr>
                <tr v-if="orderData.message">
                  <th scope="row" class="text-right">留言：</th>
                  <td class="text-left message">{{ orderData.message }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
        </div>
      </div>
      <div class="row">
        <div class="offset-sm-3 col-sm-6 text-center">
          <div class="row">
            <div class="col-6 text-left">
              <router-link to="/">
                <button type="button" class="btn btn-link">&#60; 返回首頁</button>
              </router-link>
            </div>
            <div class="col-6 text-right">
              <router-link to="/products">
                <button type="button" class="btn btn-primary">繼續購物 ></button>
              </router-link>
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
      orderId: this.$route.params.id,
      orderData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        payment: '',
        message: '',
      },
    };
  },
  methods: {
    getOrder(id) {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/orders/${id}`;
      this.axios
        .get(url)
        .then((res) => {
          loader.hide();
          this.orderData = this._.cloneDeep(res.data.data);
        })
        .catch((err) => {
          loader.hide();
          if (err.response.data.message === 'exceptions.frontend.orders.not_found') {
            this.$router.push('/');
          }
          console.log(err.response);
        });
    },
  },
  created() {
    this.getOrder(this.orderId);
  },
};
</script>

<style lang="scss" scoped>
$circle-length: 151px;
$check-length: 36px;

.finish {
  color: $dark;
  margin-top: 2.5rem;
  @media screen and (max-width: 576px) {
    margin-top: 1.5rem;
  }
  .table {
    color: $dark;
    .message {
      white-space: pre;
    }
  }
  .btn-link {
    color: gray;
  }
  // 成功動畫
  @keyframes scaleAnimation {
    0% {
      opacity: 0;
      transform: scale(1.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes drawCircle {
    0% {
      stroke-dashoffset: $circle-length;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes drawCheck {
    0% {
      stroke-dashoffset: $check-length;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  #successAnimationCircle {
    stroke-dasharray: $circle-length $circle-length;
    stroke: $dark;
  }

  #successAnimationCheck {
    stroke-dasharray: $check-length $check-length;
    stroke: $dark;
  }

  #successAnimationResult {
    fill: $dark;
    opacity: 0;
  }

  #successAnimation.animated {
    animation: 1s ease-out 0s 1 both scaleAnimation;

    #successAnimationCircle {
      animation: 1s cubic-bezier(0.77, 0, 0.175, 1) 0s 1 both drawCircle,
        0.3s linear 0.9s 1 both fadeOut;
    }

    #successAnimationCheck {
      animation: 1s cubic-bezier(0.77, 0, 0.175, 1) 0s 1 both drawCheck,
        0.3s linear 0.9s 1 both fadeOut;
    }

    #successAnimationResult {
      animation: 0.3s linear 0.9s both fadeIn;
    }
  }
}
</style>
