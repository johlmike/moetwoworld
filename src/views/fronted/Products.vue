<template>
  <div class="products">
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <ProductCategory
            v-bind:categoryList="categoryList"
            @changeCategory="handleCategoryChange"
          />
        </div>
        <div class="col-sm-9">
          <ProductsTable :products="filtedProducts" :cart="cart" class="row" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCategory from '@/components/fronted/ProductsCategory.vue';
import ProductsTable from '@/components/fronted/ProductsTable.vue';

export default {
  props: {
    products: Array,
    cart: Array,
    coupon: Object,
  },
  components: {
    ProductCategory,
    ProductsTable,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      categoryList: ['所有商品', '主食飼料', '點心零食', '營養保健品', '居家籠/便盆', '木屑/砂'],
      activeCategory: '所有商品',
    };
  },
  methods: {
    handleCategoryChange(activeCategory) {
      this.activeCategory = activeCategory;
    },
  },
  computed: {
    filtedProducts() {
      if (this.activeCategory === '所有商品') {
        return this.products;
      }
      return this.products.filter((product) => product.category === this.activeCategory);
    },
  },
};
</script>

<style lang="scss" scoped>
.products {
  margin-top: 2.5rem;
  @media screen and (max-width: 576px) {
    margin-top: 1.5rem;
  }
}
</style>
