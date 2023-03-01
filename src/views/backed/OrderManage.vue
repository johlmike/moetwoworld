<template>
  <div class="order-manage container">
    <div class="row mt-3">
      <div class="mr-auto">
        <Pagination
          :current-page="page"
          :total-page="totalPage"
          @change-page="changePage"
        ></Pagination>
      </div>
    </div>
    <div class="row mt-3">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>編號</th>
            <th>下單時間</th>
            <th>購買品項</th>
            <th>付款方式</th>
            <th>應付金額</th>
            <th>是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="'order_' + index">
            <td scope="row" class="align-middle">{{ paged * (page - 1) + index + 1 }}</td>
            <td class="align-middle">{{ order.created.datetime }}</td>
            <td class="align-middle">
              <ul class="list-group list-group-flush">
                <li
                  v-for="(product, key) in order.products"
                  :key="'product_' + key"
                  class="list-group-item"
                >
                  {{ product.product.title }} {{ product.quantity }} {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="align-middle">{{ order.payment }}</td>
            <td class="align-middle">{{ order.amount }}</td>
            <td class="align-middle">{{ order.paid ? '已付款' : '未付款' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  props: {
    token: String,
    tokenReady: Boolean,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      page: 1,
      paged: 15,
      totalPage: 1,
      orders: [],
      editingIndex: 0,
      editingOrder: {},
      checkMsg: '',
    };
  },
  methods: {
    getOrders() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/admin/ec/orders?page=${this.page}&paged=${this.paged}`;
      // Ajax
      this.axios
        .get(url)
        .then((res) => {
          loader.hide();
          this.orders = res.data.data;
          this.totalPage = res.data.meta.pagination.total_pages;
        })
        .catch(() => {
          loader.hide();
        });
    },
    changePage(page) {
      this.orders = [];
      this.page = page;
      this.getOrders();
    },
  },
  created() {
    if (this.tokenReady) {
      this.getOrders();
    }
  },
  watch: {
    tokenReady(status) {
      if (status) {
        this.getOrders();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
table,
td {
  border-color: $dark;
}
thead {
  text-align: center;
  background-color: $dark;
  color: white;
}
tbody {
  text-align: center;
}
</style>
