<template>
  <div class="row">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>編號</th>
          <th>分類</th>
          <th>商品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>庫存</th>
          <th>單位</th>
          <th>上架</th>
          <th>熱門</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="'product_' + index">
          <td scope="row" class="align-middle">{{ paged * (page - 1) + index + 1 }}</td>
          <td class="align-middle">{{ product.category }}</td>
          <td class="align-middle">{{ product.title }}</td>
          <td class="align-middle">{{ product.origin_price }}</td>
          <td class="align-middle">{{ product.price }}</td>
          <td class="align-middle">{{ product.options.stock }}</td>
          <td class="align-middle">{{ product.unit }}</td>
          <td class="align-middle">
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                :id="'enabled_' + index"
                :checked="product.enabled"
                @input="toggleEnabled($event, index)"
              />
              <label class="custom-control-label" :for="'enabled_' + index"></label>
            </div>
          </td>
          <td class="align-middle">
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                :id="'hot_' + index"
                :checked="product.options.hot"
                @input="toggleHot($event, index)"
              />
              <label class="custom-control-label" :for="'hot_' + index"></label>
            </div>
          </td>
          <td class="align-middle">
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-outline-primary" @click="toggleModal(index)">
                <font-awesome-icon :icon="['fas', 'edit']" class="nav-icon" />
                編輯
              </button>
              <button type="button" class="btn btn-outline-warning" @click="triggerDelete(index)">
                <font-awesome-icon :icon="['fas', 'trash-alt']" class="nav-icon" />
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CheckModal
      ref="checkModal"
      :msg="checkMsg"
      agreeText="確定刪除"
      cancelText="取消"
      mainColor="warning"
    ></CheckModal>
  </div>
</template>

<script>
import CheckModal from '@/components/CheckModal.vue';

export default {
  props: {
    products: Array,
    page: Number,
    paged: Number,
  },
  data() {
    return {
      checkMsg: '',
    };
  },
  components: { CheckModal },
  methods: {
    updateProduct(evt, index) {
      this.$emit('update-product', evt, index);
    },
    toggleModal(index) {
      this.$emit('toggle-modal', index);
    },
    toggleHot(evt, index) {
      this.$emit('toggle-hot', index, evt.target.checked);
    },
    toggleEnabled(evt, index) {
      this.$emit('toggle-enabled', index, evt.target.checked);
    },
    deleteProduct(index) {
      this.$emit('delete-product', index);
    },
    triggerDelete(index) {
      this.checkMsg = `確認刪除「${this.products[index].title}」嗎？`;
      this.$refs.checkModal.openModal(this.deleteProduct.bind(this, index));
    },
  },
};
</script>

<style lang="scss" scoped>
thead {
  text-align: center;
  background-color: $dark;
  color: white;
}
tbody {
  text-align: center;
}
</style>
