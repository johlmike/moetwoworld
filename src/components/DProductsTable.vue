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
          <td scope="row" class="align-middle">{{ 25 * (page - 1) + index + 1 }}</td>
          <td class="align-middle">{{ product.category }}</td>
          <td class="align-middle">{{ product.title }}</td>
          <td class="align-middle">{{ product.origin_price }}</td>
          <td class="align-middle">{{ product.price }}</td>
          <td class="align-middle">{{ product.options.stock }}</td>
          <td class="align-middle">{{ product.unit }}</td>
          <td class="align-middle">
            <!-- <vs-switch v-model="product.enabled" @input="updateProduct($event, index)"></vs-switch> -->
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
                <i class="fas fa-edit"></i> 編輯
              </button>
              <button type="button" class="btn btn-outline-danger" @click="deleteProduct(index)">
                <i class="far fa-trash-alt"></i> 刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
    page: Number,
  },
  data() {
    return {
      styles: {},
    };
  },
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
