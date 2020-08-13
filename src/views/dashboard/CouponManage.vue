<template>
  <div class="coupon-manage container">
    <div class="row mt-3">
      <div class="mr-auto">
        <Pagination
          :current-page="page"
          :total-page="totalPage"
          @change-page="changePage"
        ></Pagination>
      </div>
      <button type="button" class="btn btn-primary btn-add" @click="toggleModal()">
        <font-awesome-icon :icon="['fas', 'plus-square']" class="nav-icon" />
        新增優惠券
      </button>
    </div>
    <div class="row mt-3">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>編號</th>
            <th>優惠券號碼</th>
            <th>優惠券名稱</th>
            <th>折數</th>
            <th>有效期限</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coupon, index) in coupons" :key="'coupon_' + index">
            <td scope="row" class="align-middle">{{ paged * (page - 1) + index + 1 }}</td>
            <td class="align-middle">{{ coupon.code }}</td>
            <td class="align-middle">{{ coupon.title }}</td>
            <td class="align-middle">
              {{ coupon.percent > 9 ? `${coupon.percent} 折` : `0${coupon.percent} 折` }}
            </td>
            <td class="align-middle">{{ coupon.deadline.datetime }}</td>
            <td class="align-middle">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :id="'enabled_' + index"
                  :checked="coupon.enabled"
                  @input="toggleEnabled($event, index)"
                />
                <label class="custom-control-label" :for="'enabled_' + index"></label>
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
    </div>
    <div class="modal coupon-modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <ValidationObserver v-slot="{ invalid }">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ addingCoupon ? '新增優惠券' : `編輯優惠券 - ${coupons[editingIndex].code}` }}
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
    </div>
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
/* global $ */
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
      coupons: [],
      editingIndex: 0,
      editingCoupon: {
        code: '',
        title: '',
        percent: 100,
        enabled: true,
      },
      editingDate: '',
      editingTime: '',
      addingCoupon: true, // 分辨 Modal 狀態是「新增」還是「編輯」
      checkMsg: '',
    };
  },
  methods: {
    getCoupons() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/admin/ec/coupons`;
      const data = {
        page: this.page,
        paged: this.paged,
      };
      // Ajax
      this.axios
        .get(url, data)
        .then((res) => {
          loader.hide();
          this.coupons = res.data.data;
          this.totalPage = res.data.meta.pagination.total_pages;
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    addCoupon() {
      $('.coupon-modal').modal('hide');
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/admin/ec/coupon`;
      const data = {
        title: this.editingCoupon.title,
        code: this.editingCoupon.code,
        percent: this.editingCoupon.percent,
        enabled: this.editingCoupon.enabled,
        deadline_at: this.editingDate.concat(' ', this.editingTime),
      };
      // Ajax
      this.axios
        .post(url, data)
        .then((res) => {
          loader.hide();
          this.coupons.unshift(res.data.data);
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    updateCoupon(id, index) {
      $('.coupon-modal').modal('hide');
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/admin/ec/coupon/${id}`;
      let data = {
        title: this.editingCoupon.title,
        code: this.editingCoupon.code,
        percent: this.editingCoupon.percent,
        enabled: this.editingCoupon.enabled,
        deadline_at: this.editingDate.concat(' ', this.editingTime),
      };
      // Ajax
      this.axios
        .patch(url, data)
        .then((res) => {
          loader.hide();
          // 為了使vue畫面自動更新，故使用forEach針對物件內每個key去更新資料
          Object.keys(this.coupons[index]).forEach((key) => {
            this.coupons[index][key] = this._.cloneDeep(res.data.data[key]);
          });
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    deleteCoupon(index) {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/admin/ec/coupon/${this.coupons[index].id}`;
      // Ajax
      this.axios
        .delete(url)
        .then(() => {
          loader.hide();
          this.coupons.splice(index, 1);
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    toggleEnabled(evt, index) {
      // 修改休會勸之啟用狀態
      this.coupons[index].enabled = evt.target.checked;
      // 複製優惠券資料至編輯中暫存區
      this.editingIndex = index;
      this.editingCoupon = this._.cloneDeep(this.coupons[index]);
      // update
      this.updateCoupon(this.coupons[index].id, index);
    },
    toggleModal(index) {
      if (index === undefined) {
        // 設定為新增優惠券狀態
        this.addingCoupon = true;
        // 各資料初始化
        this.editingCoupon = {
          code: '',
          title: '',
          percent: 100,
          enabled: true,
        };
        this.editingDate = '';
        this.editingTime = '';
        $('.coupon-modal').modal('show');
      } else {
        // 設定為編輯優惠券狀態
        this.addingCoupon = false;
        // 儲存編輯中 index
        this.editingIndex = index;
        // 複製一份資料至編輯中
        this.editingCoupon = this._.cloneDeep(this.coupons[index]);
        [this.editingDate, this.editingTime] = this.editingCoupon.deadline.datetime.split(' ');
        $('.coupon-modal').modal('show');
      }
    },
    triggerDelete(index) {
      this.checkMsg = `確認刪除「${this.coupons[index].title}」嗎？`;
      this.$refs.checkModal.openModal(this.deleteCoupon.bind(this, index));
    },
    changePage(page) {
      this.coupons = [];
      this.page = page;
      this.getCoupons();
    },
  },
  created() {
    if (this.tokenReady) {
      this.getCoupons();
    }
  },
  watch: {
    tokenReady(status) {
      if (status) {
        this.getCoupons();
      }
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
