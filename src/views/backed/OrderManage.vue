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
    <!-- <div class="modal coupon-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <ValidationObserver v-slot="{ invalid }">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ `編輯優惠券 - ${coupons[editingIndex].code}` }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <form>
                  <div class="row">
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                      mode="lazy"
                      class="col"
                    >
                      <div class="form-group">
                        <label for="name">優惠券號碼</label>
                        <input
                          type="text"
                          name="優惠券號碼"
                          id="code"
                          v-model="editingCoupon.code"
                          :class="classes"
                          class="form-control"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="row">
                    <ValidationProvider
                      rules="required"
                      v-slot="{ errors, classes }"
                      mode="lazy"
                      class="col"
                    >
                      <div class="form-group">
                        <label for="name">優惠券名稱</label>
                        <input
                          type="text"
                          name="優惠券名稱"
                          id="title"
                          v-model="editingCoupon.title"
                          :class="classes"
                          class="form-control"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="row">
                    <ValidationProvider
                      rules="required|min_value:0|max_value:100"
                      v-slot="{ errors, classes }"
                      mode="lazy"
                      class="col"
                    >
                      <div class="form-group">
                        <label for="name">優惠券折數</label>
                        <input
                          type="number"
                          name="優惠券折數"
                          id="percent"
                          v-model.number="editingCoupon.percent"
                          placeholder="「8折」即輸入「80」，原價則為「100」，以此類推"
                          :class="classes"
                          class="form-control"
                        />
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="row">
                    <div class="col">
                      <ValidationProvider rules="required" v-slot="{ errors, classes }" mode="lazy">
                        <div class="form-group">
                          <label for="name">有效日期</label>
                          <input
                            type="date"
                            name="有效日期"
                            id="deadline_date"
                            v-model="editingDate"
                            :class="classes"
                            class="form-control"
                          />
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col">
                      <ValidationProvider rules="required" v-slot="{ errors, classes }" mode="lazy">
                        <div class="form-group">
                          <label for="name">有效時間</label>
                          <input
                            type="time"
                            name="有效時間"
                            id="deadline_time"
                            v-model="editingTime"
                            :class="classes"
                            class="form-control"
                            step="1"
                          />
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="custom-control custom-switch">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="enabled"
                          v-model="editingCoupon.enabled"
                        />
                        <label class="custom-control-label" for="enabled">是否啟用？</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
              <button
                type="button"
                class="btn btn-primary"
                :disabled="invalid"
                v-if="addingCoupon"
                @click="addCoupon"
              >
                新增
              </button>
              <button
                type="button"
                class="btn btn-primary"
                :disabled="invalid"
                v-if="!addingCoupon"
                @click="updateCoupon(editingCoupon.id, editingIndex)"
              >
                儲存
              </button>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div> -->
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
import Pagination from '@/components/Pagination.vue';
import CheckModal from '@/components/CheckModal.vue';

export default {
  components: {
    Pagination,
    CheckModal,
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
