<template>
  <div class="products-manage container">
    <div class="row mt-3">
      <div class="mr-auto">
        <Pagination
          :current-page="page"
          :total-page="totalPage"
          @change-page="changePage"
        ></Pagination>
      </div>
      <button type="button" class="btn btn-primary btn-add" @click="toggleModal('new')">
        <font-awesome-icon :icon="['fas', 'plus-square']" class="nav-icon" />
        新增商品
      </button>
    </div>
    <DProductsTable
      class="mt-3"
      :products="products"
      :page="page"
      @update-product="updateProduct"
      @toggle-enabled="toggleEnabled"
      @toggle-hot="toggleHot"
      @toggle-modal="toggleModal"
      @delete-product="deleteProduct"
    ></DProductsTable>
    <EditingModal
      ref="editingModal"
      :product="editingProduct"
      :is-creating="isCreating"
      @save="saveProduct"
      @alert="handleFormAlert"
    ></EditingModal>
    <AlertModal ref="alertModal"></AlertModal>
  </div>
</template>

<script>
import DProductsTable from '@/components/DProductsTable.vue';
import Pagination from '@/components/Pagination.vue';
import EditingModal from '@/components/EditingModal.vue';
import AlertModal from '@/components/AlertModal.vue';

export default {
  components: {
    DProductsTable,
    Pagination,
    EditingModal,
    AlertModal,
  },
  props: {
    token: String,
    tokenReady: Boolean,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      products: [],
      productTemplate: {
        title: '',
        category: '',
        content: '',
        description: '',
        imageUrl: [],
        enabled: true,
        origin_price: 0,
        price: 0,
        unit: '',
        options: {
          hot: true,
          stock: 0,
        },
      },
      editingProduct: {
        title: '',
        category: '',
        content: '',
        description: '',
        imageUrl: [],
        enabled: true,
        origin_price: 0,
        price: 0,
        unit: '',
        options: {
          hot: true,
          stock: 0,
        },
      },
      editingIndex: 0,
      editingId: '',
      totalPage: 1,
      page: 1,
      isCreating: true,
    };
  },
  methods: {
    getAllProducts() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/admin/ec/products?page=${this.page}`;
      // Ajax
      this.axios
        .get(url)
        .then((res) => {
          loader.hide();
          this.totalPage = res.data.meta.pagination.total_pages;
          this.products = res.data.data; // 將商品列表放入元件的data
          // 將options之String轉換為Object
          this.products.forEach((product, index) => {
            if (product.options) {
              // 如果該商品有options的話
              this.products[index].options = JSON.parse(product.options);
            }
          });
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    createProduct() {
      const loader = this.$loading.show();
      // 準備Ajax使用之url和data
      const url = `${this.baseUrl}${this.uuid}/admin/ec/product`;
      const data = this._.cloneDeep(this.editingProduct);
      // 將options轉換成字串(為符合後端要求)
      data.options = JSON.stringify(data.options);
      // Ajax
      this.axios
        .post(url, data)
        .then(() => {
          loader.hide();
          this.editingProduct = this._.cloneDeep(this.productTemplate); // 將editingProduct清空
          this.page = 1; // 自動跳轉到page 1
          this.getAllProducts(); // 重新讀取商品列表
          this.$refs.editingModal.closeEditingModal();
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    getProduct(index, id, cb) {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/admin/ec/product/${id}`;
      this.axios
        .get(url)
        .then((res) => {
          loader.hide();
          this.products[index].description = res.data.data.description;
          cb();
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    updateProduct(index) {
      const loader = this.$loading.show();
      // 如果有傳入index，表示使用者直接從列表更新商品狀態(上架、熱門)
      if (index || index === 0) {
        this.editingIndex = index; // 儲存使用者欲編輯商品之表格編號
        this.editingId = this.products[index].id; // 儲存使用者欲編輯商品之id
        this.editingProduct = this._.cloneDeep(this.products[index]); // 將要編輯的商品內容放入editProduct
      }
      // 為了使vue畫面自動更新，故使用forEach針對物件內每個key去更新資料
      Object.keys(this.products[this.editingIndex]).forEach((key) => {
        this.products[this.editingIndex][key] = this._.cloneDeep(this.editingProduct[key]);
      });
      // 準備Ajax使用之url和data
      const url = `${this.baseUrl}${this.uuid}/admin/ec/product/${this.editingId}`;
      const data = this._.cloneDeep(
        this.products.find((product) => {
          // 使用editingId查找欲更新的商品並clone一份
          return product.id === this.editingId;
        })
      );
      // 將options轉換成字串(為符合後端要求)
      data.options = JSON.stringify(data.options);
      // Ajax
      this.axios
        .patch(url, data)
        .then(() => {
          loader.hide();
          this.$refs.editingModal.closeEditingModal();
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    deleteProduct(index) {
      const loader = this.$loading.show();
      const id = this.products[index].id;
      const url = `${this.baseUrl}${this.uuid}/admin/ec/product/${id}`;
      this.axios
        .delete(url)
        .then(() => {
          loader.hide();
          this.getAllProducts(); // 刷新頁面
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    toggleModal(index) {
      if (index === 'new') {
        this.isCreating = true; // 設定modal為新增狀態
        this.editingProduct = this._.cloneDeep(this.productTemplate); // 給予一個空的資料物件
        this.$refs.editingModal.openEditingModal();
      } else {
        this.isCreating = false; // 設定modal為編輯狀態
        this.editingIndex = index; // 儲存編輯中商品之表格編號
        this.editingId = this.products[index].id; // 儲存編輯中商品之id
        this.getProduct(this.editingIndex, this.editingId, () => {
          this.editingProduct = this._.cloneDeep(this.products[index]); // 將要編輯的商品內容放入editProduct
          this.$refs.editingModal.openEditingModal();
        });
      }
    },
    toggleEnabled(index, enabled) {
      // 更新本地端商品資料
      this.products[index].enabled = enabled;
      // 更新資料庫商品資料
      this.updateProduct(index);
    },
    toggleHot(index, hot) {
      // 更新本地端商品資料
      this.products[index].options.hot = hot;
      // 更新資料庫商品資料
      this.updateProduct(index);
    },
    handleFormAlert(msg) {
      this.$refs.alertModal.openAlertModal(msg);
    },
    saveProduct(mode, editedProduct) {
      // 取回使用者編輯完畢之商品資訊
      this.editingProduct = this._.cloneDeep(editedProduct);
      // 如回傳 new 表示為建立商品、回傳 edit 表示為更新商品
      if (mode === 'new') {
        this.createProduct();
      } else if (mode === 'edit') {
        this.updateProduct();
      }
    },
    changePage(page) {
      this.products = [];
      this.page = page;
      this.getAllProducts();
    },
  },
  created() {
    if (this.tokenReady) {
      this.getAllProducts();
    }
  },
  watch: {
    tokenReady(status) {
      if (status) {
        this.getAllProducts();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-add {
  background-color: $dark;
  color: white;
  border-color: $dark;
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
</style>
