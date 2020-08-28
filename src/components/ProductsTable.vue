<template>
  <div class="products-table">
    <div v-for="(product, index) in products" :key="'product' + index" class="col-sm-4 mb-4">
      <div class="card">
        <router-link :to="`/product/${product.id}`" tag="div">
          <div
            class="card-top"
            :style="{
              backgroundImage: 'url(' + product.imageUrl[0] + ')',
            }"
          >
            <div class="cover">
              查看更多
            </div>
          </div>
        </router-link>
        <div class="d-flex flex-column justify-content-start card-body">
          <h5 class="card-title ellipsis">{{ product.title }}</h5>
          <p class="card-text ellipsis">{{ product.content }}</p>
          <div class="card-price">
            <div class="origin-price">{{ `NT\$ ${product.origin_price}` }}</div>
            <div class="price">{{ `NT\$ ${product.price}` }}</div>
          </div>
          <a
            href="#"
            class="btn btn-primary btn-add-cart"
            @click.prevent="openAddCartModal(product)"
          >
            <font-awesome-icon :icon="['fas', 'cart-plus']" class="icon-cart" />
          </a>
        </div>
      </div>
    </div>
    <div
      class="modal fade addCartModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addCartModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ addingProduct.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body no_selection">
            <div
              class="modal-img"
              :style="{
                backgroundImage: 'url(' + addingProduct.imageUrl[0] + ')',
              }"
            ></div>
            <div class="d-flex justify-content-center align-items-start">
              <font-awesome-icon
                :icon="['fas', 'minus-square']"
                class="icon-quantity"
                @click="
                  () => {
                    if (addingQuantity > 1) addingQuantity--;
                  }
                "
              />
              <ValidationProvider rules="min_value:1|required" v-slot="{ errors, classes }">
                <input
                  class="input-quantity"
                  :class="classes"
                  name="數量"
                  type="number"
                  v-model.number="addingQuantity"
                  min="1"
                />
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </ValidationProvider>
              <font-awesome-icon
                :icon="['fas', 'plus-square']"
                class="icon-quantity"
                @click="addingQuantity++"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addCart"
              :disabled="addingQuantity < 1"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  props: {
    products: Array,
    cart: Array,
  },
  data() {
    return {
      addingProduct: {
        imageUrl: [''],
      },
      addingQuantity: 0,
    };
  },
  methods: {
    openAddCartModal(product) {
      this.addingProduct = product;
      this.addingQuantity = 1;
      $('.addCartModal').modal('show');
    },
    addCart() {
      if (this.addingQuantity) {
        const addingId = this.addingProduct.id;
        this.$bus.$emit('addCart', addingId, this.addingQuantity);
        $('.addCartModal').modal('hide');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group-item {
  font-weight: bold;
}
.card {
  color: $dark;
  border: 0;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  .card-top {
    height: 200px;
    overflow: hidden;
    cursor: pointer;
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 100%;
    .cover {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      font-size: 2rem;
      color: white;
      text-align: center;
    }
    &:hover {
      background-size: auto 120%;
      transition-duration: 500ms;
      .cover {
        opacity: 1;
        transition-duration: 500ms;
      }
    }
  }
  .card-body {
    .card-text {
      text-align: left;
    }
    .card-price {
      text-align: left;
      .origin-price {
        font-size: 0.8rem;
        color: #bbbbbb;
        text-decoration: line-through;
      }
      .price {
        font-size: 1.25rem;
        font-weight: bold;
        color: $dark;
      }
    }
  }
  .btn-add-cart {
    border-radius: 50%;
    border: 0;
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: $dark;
  }
  .icon-cart {
    position: relative;
    left: -2px;
    bottom: -1px;
  }
}
.modal-body {
  .modal-img {
    height: 400px;
    margin-bottom: 1rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }
}
.icon-quantity {
  font-size: 2rem;
  cursor: pointer;
}
.input-quantity {
  text-align: center;
  width: 4rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
.ellipsis {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; //最大行數
  height: 3rem; //固定高度
  text-overflow: ellipsis;
}
// 隱藏 input type=number 的箭頭
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
// 禁用雙擊選取文字
.no_selection {
  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
  -ms-user-select: none; /* IE10+ */
}
</style>
