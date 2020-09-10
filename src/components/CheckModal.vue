<template>
  <div class="modal checkModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">再次確認</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>{{ msg }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" :class="`btn-${secondColor}`" data-dismiss="modal">
            {{ cancelText }}
          </button>
          <button
            type="button"
            class="btn"
            :class="`btn-${mainColor}`"
            @click="onClick"
            data-dismiss="modal"
          >
            {{ agreeText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  props: {
    msg: { type: String, default: '確認訊息' },
    agreeText: { type: String, default: '確認' },
    cancelText: { type: String, default: '取消' },
    mainColor: { type: String, default: 'primary' },
    secondColor: { type: String, default: 'secondary' },
  },
  methods: {
    onClick() {
      this.cb();
    },
    cb() {
      return false;
    },
    openModal(cb) {
      $('.checkModal').modal('show');
      this.cb = cb;
    },
  },
};
</script>

<style></style>
