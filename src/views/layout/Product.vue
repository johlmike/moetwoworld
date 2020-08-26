<template>
  <div>
    <div class="product container">
      <div class="row product-header">
        <div class="col-md-5 header-left"></div>
        <div class="col-md-7 header-right mt-4 mt-sm-0">
          <h2 class="mb-0">{{ product.title }}</h2>
          <div>
            <hr />
          </div>
          <div class="header-right-desc">
            <div class="text-left">
              <h5 class="mb-3">類型：{{ product.category }}</h5>
              <h5 class="mb-3">庫存：{{ product.options.stock }} {{ product.unit }}</h5>
              <h5 class="text-justify">簡介：{{ product.content }}</h5>
            </div>
            <div class="text-right desc-price mt-sm-0 mt-4">
              <span class="origin-price">原價： {{ product.origin_price }} 元</span>
              <span class="sale-price">售價： {{ product.price }} 元</span>
              <form class="form-inline justify-content-end mt-2">
                <button class="btn btn-link mr-auto" type="button" @click="$router.go(-1)">
                  返回列表
                </button>
                <input
                  type="number"
                  name="數量"
                  min="1"
                  :max="product.options.stock"
                  v-model.lazy.number="quantity"
                  @change="controlQuantity"
                  class="form-control mr-2 col-3 text-center"
                />
                <button class="btn btn-primary" @click.prevent="addCart">加入購物車</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row product-body col-sm-10 offset-sm-1">
        <div class="col" v-html="product.description"></div>
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
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      productId: this.$route.params.id,
      product: {
        imageUrl: [''],
        options: {
          stock: 0,
          hot: false,
        },
      },
      quantity: 1,
    };
  },
  methods: {
    getProduct() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/product/${this.productId}`;
      this.axios.get(url).then((res) => {
        loader.hide();
        this.product = res.data.data;
        // 轉換 options 回object
        this.product.options = JSON.parse(this.product.options);
        const background = `background-image: url('${this.product.imageUrl[0]}');`;
        document.querySelector('.header-left').style.cssText = background;
      });
    },
    controlQuantity() {
      // 檢查使用者是否自己輸入負數或超過庫存
      if (this.quantity > this.product.options.stock) {
        this.quantity = Number(this.product.options.stock);
      } else if (this.quantity < 1) {
        this.quantity = 1;
      }
    },
    addCart() {
      this.$bus.$emit('addCart', this.productId, this.quantity, () => {
        this.$router.push('/products');
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
.product {
  margin-top: 2.5rem;
  @media screen and (max-width: 576px) {
    margin-top: 1.5rem;
  }
  .product-header {
    color: $dark;
    .header-left {
      height: 25rem;
      background-position: center;
      background-repeat: no-repeat;
      background-size: auto 100%;
    }
    .header-right {
      display: flex;
      flex-direction: column;
      font-size: 1.2rem;
      line-height: 3rem;
      .header-right-desc {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: space-between;
        .desc-price {
          line-height: 2rem;
          .origin-price {
            margin-right: 1rem;
            font-size: 1rem;
            color: #aaaaaa;
            text-decoration: line-through;
          }
          .sale-price {
            font-weight: bold;
          }
        }
      }
    }
  }
  .product-body {
    white-space: pre-line;
  }
}
</style>
