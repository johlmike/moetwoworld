<template>
  <div class="home">
    <Carousel :isTop="isTop"></Carousel>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue';

export default {
  props: {
    products: Array,
    cart: Array,
  },
  components: {
    Carousel,
  },
  data() {
    return {
      isTop: true,
    };
  },
  methods: {
    updateScroll() {
      if (window.scrollY) {
        // 已滑動
        this.isTop = false;
      } else {
        this.isTop = true; // 最上方
      }
    },
  },
  mounted() {
    // 監聽 scroll 事件，調整滑動提示和導覽列的顯示
    window.addEventListener('scroll', this.updateScroll);
  },
};
</script>

<style></style>
