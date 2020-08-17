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
            <th class="col-index">編號</th>
            <th class="col-img">圖片</th>
            <th class="col-del">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(picture, index) in pictures" :key="'pic_' + index">
            <td scope="row" class="align-middle col-index">{{ paged * (page - 1) + index + 1 }}</td>
            <td class="align-middle col-img">
              <img :src="picture.path" :alt="picture.id" class="img-picture" />
            </td>
            <td class="align-middle col-del">
              <button
                type="button"
                class="btn btn-outline-warning"
                @click="triggerDelete(picture.id, index)"
              >
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
      const url = `${this.baseUrl}${this.uuid}/admin/storage?page=${this.page}&paged=${this.paged}`;
      // Ajax
      this.axios
        .get(url)
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
    deletePicture(id, index) {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/admin/storage/${id}`;
      // Ajax
      this.axios
        .delete(url)
        .then(() => {
          loader.hide();
          this.pictures.splice(index, 1);
        })
        .catch((err) => {
          loader.hide();
          console.log(err.response);
        });
    },
    triggerDelete(id, index) {
      this.$refs.checkModal.openModal(this.deletePicture.bind(this, id, index));
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
.col-index {
  width: 8.33%;
}
.col-img {
  width: 75%;
}
.img-picture {
  max-width: 50%;
  max-height: 30vh;
}
</style>
