<template>
  <nav aria-label="Page navigation">
    <ul class="pagination mb-0">
      <li class="page-item" @click.prevent="previousPage">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        :class="{ 'page-item': true, active: page === currentPage }"
        v-for="page in totalPage"
        :key="'page_' + page"
        @click.prevent="changePage(page)"
      >
        <a class="page-link" href="#">{{ page }}</a>
      </li>
      <li class="page-item" @click.prevent="nextPage">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    totalPage: Number,
    currentPage: Number,
  },
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
    },
    previousPage() {
      if (this.currentPage != 1) {
        this.$emit('change-page', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage !== this.totalPage) {
        this.$emit('change-page', this.currentPage + 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-item {
  .page-link {
    color: $dark;
    &:focus {
      box-shadow: none;
    }
  }
  &.active {
    .page-link {
      color: white;
      background-color: $dark;
      border-color: $dark;
    }
  }
  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
}
</style>
