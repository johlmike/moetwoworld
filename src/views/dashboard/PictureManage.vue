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
            <th>圖片</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(picture, index) in pictures" :key="'pic_' + index">
            <td class="align-middle">{{ paged * (page - 1) + index + 1 }}</td>
            <td scope="row" class="align-middle">
              <img :src="picture.path" :alt="picture.id" />
            </td>
            <td class="align-middle">
              <button type="button" class="btn btn-outline-warning">
                <font-awesome-icon :icon="['fas', 'trash-alt']" class="nav-icon" />
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CheckModal
      ref="checkModal"
      msg="確認刪除此張圖片嗎？"
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
      pictures: [],
    };
  },
  methods: {
    getPictures() {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/admin/storage`;
      const data = {
        page: this.page,
        paged: this.paged,
      };
      // Ajax
      this.axios
        .get(url, data)
        .then((res) => {
          loader.hide();
          this.pictures = res.data.data;
          this.totalPage = res.data.meta.pagination.total_pages;
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    changePage(page) {
      this.orders = [];
      this.page = page;
      this.getPictures();
    },
  },
  created() {
    if (this.tokenReady) {
      this.getPictures();
    }
  },
  watch: {
    tokenReady(status) {
      if (status) {
        this.getPictures();
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
