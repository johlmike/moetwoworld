<template>
  <div class="products-manage container">
    <DProductsTable :products="products"></DProductsTable>
  </div>
</template>

<script>
import DProductsTable from '@/components/DProductsTable.vue';

export default {
  components: {
    DProductsTable,
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

<style></style>
