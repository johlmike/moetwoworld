<template>
  <div class="products-category mb-4">
    <ul class="list-group">
      <li
        v-for="(category, index) in categoryList"
        :key="'cat_' + index"
        class="list-group-item m-0 p-0"
        :class="{
          active: index === 0,
        }"
        @click="handleClick(category)"
      >
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array,
      default() {
        return ['所有商品'];
      },
    },
  },
  methods: {
    handleClick(activeCategory) {
      const listItems = document.querySelectorAll('.list-group-item');
      listItems.forEach((item) => {
        if (item.innerText === activeCategory) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      this.$emit('changeCategory', activeCategory);
    },
  },
};
</script>

<style lang="scss" scoped>
.products-category {
  position: -webkit-sticky;
  position: sticky;
  top: 6.5rem;
  .list-group-item {
    height: 3rem;
    line-height: 3rem;
    border-top-width: 1px;
    border-bottom-width: 0px;
    &:last-child {
      border-bottom-width: 1px;
    }
    &:hover {
      font-size: 1.1rem;
    }
    cursor: pointer;
    color: $dark;
    border-color: $dark;
    text-align: center;
    transition-duration: 500ms;
    &.active {
      color: $bright;
      background-color: $dark;
    }
  }
}
</style>
