<template>
  <div class="container">
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
        新增愛兔文章
      </button>
    </div>
    <div class="row mt-3">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th class="col-index">編號</th>
            <th class="col-img">愛兔文章標題</th>
            <th class="col-del">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(academyItem, index) in filtedAcademy" :key="'academy_' + index">
            <td scope="row" class="align-middle col-index">{{ paged * (page - 1) + index + 1 }}</td>
            <td class="align-middle col-img">
              {{ academyItem.data.title }}
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
                  @click="triggerDelete(academyItem.id)"
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
      aria-labelledby="academyModal"
      aria-hidden="true"
      id="academyModal"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="title">愛兔文章標題</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      class="form-control"
                      v-model="editingAcademy.title"
                    />
                  </div>
                  <div class="form-row mt-3">
                    <div class="col">
                      <label for="content">愛兔文章內容</label>
                      <vue-editor
                        v-model="editingAcademy.content"
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
              @click="updateAcademy(editingId)"
              v-show="!isCreating"
            >
              儲存修改
            </button>
            <button type="button" class="btn btn-primary" @click="addAcademy" v-show="isCreating">
              新增文章
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
import { academyCollection } from '@/assets/firebase';
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
      academy: [],
      customModulesForEditor: [{ alias: 'imageResize', module: ImageResize }],
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
      editingId: '',
      editingAcademy: {},
      isCreating: true,
    };
  },
  methods: {
    getAcademy() {
      const loader = this.$loading.show();
      // Ajax
      academyCollection
        .orderBy('created', 'desc')
        .get()
        .then((res) => {
          loader.hide();
          res.forEach((academy) => {
            this.academy.push({ id: academy.id, data: academy.data() });
          });
          this.totalPage = Math.ceil(this.academy.length / this.paged);
        });
    },
    addAcademy() {
      const loader = this.$loading.show();
      // 建立時間戳記
      this.editingAcademy.created = Math.floor(Date.now() / 1000);
      this.editingAcademy.updated = Math.floor(Date.now() / 1000);
      // Ajax
      academyCollection.add(this.editingAcademy).then(() => {
        loader.hide();
        $('#academyModal').modal('hide');
        this.academy = [];
        this.getAcademy();
      });
    },
    updateAcademy(id) {
      const loader = this.$loading.show();
      // 更新時間戳記
      this.editingAcademy.updated = Math.floor(Date.now() / 1000);
      // Ajax
      academyCollection
        .doc(id)
        .update(this.editingAcademy)
        .then(() => {
          loader.hide();
          $('#academyModal').modal('hide');
          this.academy = [];
          this.getAcademy();
        });
    },
    deleteAcademy(id) {
      const loader = this.$loading.show();
      // Ajax
      academyCollection
        .doc(id)
        .delete()
        .then(() => {
          loader.hide();
          this.academy = [];
          this.getAcademy();
        });
    },
    triggerDelete(id) {
      this.$swal({
        icon: 'warning',
        text: '確認刪除此篇愛兔文章嗎？',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          return this.deleteAcademy(id);
        }
        return false;
      });
    },
    toggleModal(index) {
      if (index === 'new') {
        this.isCreating = true; // 設定modal為新增狀態
        this.editingAcademy = { title: '', content: '' }; // 給予一個空的資料物件
        $('#academyModal').modal('show');
      } else {
        this.isCreating = false; // 設定modal為編輯狀態
        this.editingId = this.academy[index].id;
        this.editingAcademy = this._.cloneDeep(this.academy[index].data); // 將要編輯的商品內容放入editProduct
        $('#academyModal').modal('show');
      }
    },
    changePage(page) {
      this.page = page;
    },
  },
  created() {
    if (this.tokenReady) {
      this.getAcademy();
    }
  },
  watch: {
    tokenReady(status) {
      if (status) {
        this.getAcademy();
      }
    },
  },
  computed: {
    filtedAcademy() {
      const startIndex = (this.page - 1) * this.paged;
      const endIndex = this.page * this.paged;
      return this.academy.slice(startIndex, endIndex);
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
