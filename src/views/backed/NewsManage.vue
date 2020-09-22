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
      <button type="button" class="btn btn-primary btn-add" @click="toggleModal('new')">
        <font-awesome-icon :icon="['fas', 'plus-square']" class="nav-icon" />
        新增新聞
      </button>
    </div>
    <div class="row mt-3">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th class="col-index">編號</th>
            <th class="col-img">新聞標題</th>
            <th class="col-del">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(newsItem, index) in filtedNews" :key="'news_' + index">
            <td scope="row" class="align-middle col-index">{{ paged * (page - 1) + index + 1 }}</td>
            <td class="align-middle col-img">
              {{ newsItem.data.title }}
            </td>
            <td class="align-middle col-del">
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-primary" @click="toggleModal(index)">
                  <font-awesome-icon :icon="['fas', 'edit']" class="nav-icon" />
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-warning"
                  @click="triggerDelete(newsItem.id)"
                >
                  <font-awesome-icon :icon="['fas', 'trash-alt']" class="nav-icon" />
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="modal fade bd-example-modal-xl"
      tabindex="-1"
      role="dialog"
      aria-labelledby="newsModal"
      aria-hidden="true"
      id="newsModal"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="title">新聞標題</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      class="form-control"
                      v-model="editingNews.title"
                    />
                  </div>
                  <div class="form-row mt-3">
                    <div class="col">
                      <label for="content">新聞內容</label>
                      <vue-editor
                        v-model="editingNews.content"
                        :customModules="customModulesForEditor"
                        :editorOptions="editorSettings"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateNews(editingId)"
              v-show="!isCreating"
            >
              儲存修改
            </button>
            <button type="button" class="btn btn-primary" @click="addNew" v-show="isCreating">
              新增新聞
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue';
import { newsCollection } from '@/assets/firebase';
import ImageResize from 'quill-image-resize-module';

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
      page: 1,
      paged: 15,
      totalPage: 1,
      news: [],
      customModulesForEditor: [{ alias: 'imageResize', module: ImageResize }],
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
      editingId: '',
      editingNews: {},
      isCreating: true,
    };
  },
  methods: {
    getNews() {
      const loader = this.$loading.show();
      // Ajax
      newsCollection.get().then((res) => {
        loader.hide();
        res.forEach((news) => {
          this.news.push({ id: news.id, data: news.data() });
        });
        this.totalPage = Math.ceil(this.news.length / this.paged);
      });
    },
    addNew() {
      const loader = this.$loading.show();
      // Ajax
      newsCollection.add(this.editingNews).then(() => {
        loader.hide();
        $('#newsModal').modal('hide');
        this.news = [];
        this.getNews();
      });
    },
    updateNews(id) {
      const loader = this.$loading.show();
      // Ajax
      newsCollection
        .doc(id)
        .update(this.editingNews)
        .then(() => {
          loader.hide();
          $('#newsModal').modal('hide');
          this.news = [];
          this.getNews();
        });
    },
    deleteNews(id) {
      const loader = this.$loading.show();
      // Ajax
      newsCollection
        .doc(id)
        .delete()
        .then(() => {
          loader.hide();
          this.news = [];
          this.getNews();
        });
    },
    triggerDelete(id) {
      this.$swal({
        icon: 'warning',
        text: '確認刪除此篇新聞嗎？',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          return this.deleteNews(id);
        }
        return false;
      });
    },
    toggleModal(index) {
      if (index === 'new') {
        this.isCreating = true; // 設定modal為新增狀態
        this.editingNews = { title: '', content: '' }; // 給予一個空的資料物件
        $('#newsModal').modal('show');
      } else {
        this.isCreating = false; // 設定modal為編輯狀態
        this.editingId = this.news[index].id;
        this.editingNews = this._.cloneDeep(this.news[index].data); // 將要編輯的商品內容放入editProduct
        $('#newsModal').modal('show');
      }
    },
    changePage(page) {
      this.page = page;
    },
  },
  created() {
    if (this.tokenReady) {
      this.getNews();
    }
  },
  watch: {
    tokenReady(status) {
      if (status) {
        this.getNews();
      }
    },
  },
  computed: {
    filtedNews() {
      const startIndex = (this.page - 1) * this.paged;
      const endIndex = this.page * this.paged;
      return this.news.slice(startIndex, endIndex);
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
