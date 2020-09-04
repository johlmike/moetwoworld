<template>
  <div
    class="modal fade bd-example-modal-xl"
    tabindex="-1"
    role="dialog"
    aria-labelledby="productModal"
    aria-hidden="true"
    id="productModal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-4">
                <!-- 一次最多上傳五張圖片 -->
                <template v-for="index in 5">
                  <div class="form-group" :key="editingProduct.id + '_' + index">
                    <label :for="'imageUrl' + '_' + index">圖片網址</label>
                    <input
                      type="text"
                      :id="'imageUrl' + '_' + index"
                      class="form-control"
                      v-model.lazy="editingProduct.imageUrl[index - 1]"
                      @change="editingProduct.imageUrl = filterImageUrl"
                    />
                  </div>
                  <img
                    v-show="editingProduct.imageUrl[index - 1]"
                    :src="editingProduct.imageUrl[index - 1]"
                    :alt="editingProduct.title + '_' + index"
                    class="img-fluid mb-2"
                    :key="'img_' + editingProduct.id + '_' + index"
                  />
                </template>
                <div class="input-group" v-show="!(editingProduct.imageUrl.length >= 5)">
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="input-img"
                      aria-describedby="upload-img"
                    />
                    <label class="custom-file-label" for="input-img"></label>
                  </div>
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      id="upload-img"
                      @click="uploadImg"
                    >
                      開始上傳
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">商品名稱</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    class="form-control"
                    v-model="editingProduct.title"
                  />
                </div>
                <div class="form-row">
                  <div class="col">
                    <div class="form-group">
                      <label for="category">商品分類</label>
                      <input
                        type="text"
                        name="category"
                        id="category"
                        class="form-control"
                        v-model="editingProduct.category"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="stock">庫存</label>
                      <input
                        type="number"
                        name="stock"
                        id="stock"
                        class="form-control"
                        v-model.number="editingProduct.options.stock"
                        min="0"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="unit">單位</label>
                      <input
                        type="text"
                        name="unit"
                        id="unit"
                        class="form-control"
                        v-model="editingProduct.unit"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col">
                    <div class="form-group">
                      <label for="origin_price">原價</label>
                      <input
                        type="number"
                        name="origin_price"
                        id="origin_price"
                        class="form-control"
                        v-model.number="editingProduct.origin_price"
                        min="0"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-group">
                      <label for="price">售價</label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        class="form-control"
                        v-model.number="editingProduct.price"
                        min="0"
                      />
                    </div>
                  </div>
                  <div class="col"></div>
                </div>
                <div class="form-row">
                  <div class="col">
                    <label for="content">商品簡述</label>
                    <textarea
                      class="form-control"
                      id="content"
                      rows="3"
                      v-model="editingProduct.content"
                    ></textarea>
                  </div>
                </div>
                <div class="form-row mt-3">
                  <div class="col">
                    <label for="description">商品說明</label>
                    <vue-editor
                      v-model="editingProduct.description"
                      :customModules="customModulesForEditor"
                      :editorOptions="editorSettings"
                    />
                  </div>
                </div>
                <div class="form-row mt-3">
                  <div class="col">
                    <div class="custom-control custom-switch">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="enabled"
                        v-model="editingProduct.enabled"
                      />
                      <label class="custom-control-label" for="enabled">是否上架？</label>
                    </div>
                  </div>
                  <div class="col">
                    <div class="custom-control custom-switch">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="hot"
                        v-model="editingProduct.options.hot"
                      />
                      <label class="custom-control-label" for="hot">是否為熱門商品？</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="save('edit')" v-show="!isCreating">
            儲存修改
          </button>
          <button type="button" class="btn btn-primary" @click="save('new')" v-show="isCreating">
            新增商品
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import ImageResize from 'quill-image-resize-module';

export default {
  props: {
    product: Object,
    isCreating: Boolean,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      customModulesForEditor: [{ alias: 'imageResize', module: ImageResize }],
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
      editingProduct: {},
      errorMsg: '',
    };
  },
  methods: {
    save(mode) {
      if (this.checkForm()) {
        this.$emit('save', mode, this.editingProduct);
      } else {
        this.$emit('alert', this.errorMsg);
      }
    },
    checkForm() {
      let ready = true;
      let errorMsg = '';
      // 商品圖片 至少上傳一張
      if (!this.editingProduct.imageUrl[0]) {
        ready = false;
        errorMsg += "<span style='font-weight: bold;'>商品圖片</span> 至少需上傳一張<br>";
      }
      // 商品名稱 為必填項目
      if (!this.editingProduct.title) {
        ready = false;
        errorMsg += "<span style='font-weight: bold;'>商品名稱</span> 為必填項目<br>";
      }
      // 商品分類 為必填項目
      if (!this.editingProduct.category) {
        ready = false;
        errorMsg += "<span style='font-weight: bold;'>商品分類</span> 為必填項目<br>";
      }
      // 商品簡述 為必填項目
      if (!this.editingProduct.content) {
        ready = false;
        errorMsg += "<span style='font-weight: bold;'>商品簡述</span> 為必填項目<br>";
      }
      // 商品說明 為必填項目
      if (!this.editingProduct.description) {
        ready = false;
        errorMsg += "<span style='font-weight: bold;'>商品說明</span> 為必填項目";
      }
      this.errorMsg = errorMsg;
      return ready;
    },
    openEditingModal() {
      $('#productModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: true,
      });
    },
    closeEditingModal() {
      $('#productModal').modal('hide');
    },
    uploadImg() {
      const inputImg = document.querySelector('#input-img');
      const uploadFile = inputImg.files[0];
      if (uploadFile) {
        const loader = this.$loading.show();
        const url = `${this.baseUrl}${this.uuid}/admin/storage`;
        const formData = new FormData();
        formData.append('file', uploadFile);
        // Ajax
        this.axios
          .post(url, formData, {
            headers: {
              'Content-Type': 'mutipart/form-data',
            },
          })
          .then((res) => {
            loader.hide();
            inputImg.value = '';
            $('.custom-file-label').html('');
            this.editingProduct.imageUrl.unshift(res.data.data.path);
          })
          .catch((err) => {
            loader.hide();
            console.log(err.response);
          });
      }
    },
  },
  created() {
    this.editingProduct = this._.cloneDeep(this.product);
  },
  mounted() {
    // 讓 bootstrap 的 input file 會顯示選取的檔案之名稱
    $('input[type="file"]').change(function(e) {
      const fileName = e.target.files[0].name;
      $('.custom-file-label').html(fileName);
    });
  },
  watch: {
    product() {
      this.editingProduct = this._.cloneDeep(this.product);
    },
  },
  computed: {
    filterImageUrl() {
      // 清理陣列內的空值
      return this.editingProduct.imageUrl.filter((url) => url);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-file-input ~ .custom-file-label::after {
  content: '選擇圖片';
}
</style>
