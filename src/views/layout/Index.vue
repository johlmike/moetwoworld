<template>
  <div class="home">
    <Carousel :isTop="isTop"></Carousel>
    <div class="container">
      <Swiper title="小萌寵的最愛" :products="products" class="my-3"></Swiper>
      <Swiper title="小萌寵吃得飽" :products="products" class="my-3"></Swiper>
      <Swiper title="小萌寵住得好" :products="products" class="my-3"></Swiper>
      <Swiper title="小萌寵好健康" :products="products" class="my-3"></Swiper>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue';
import Swiper from '@/components/Swiper.vue';

export default {
  props: {
    products: Array,
    cart: Array,
  },
  components: {
    Carousel,
    Swiper,
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
