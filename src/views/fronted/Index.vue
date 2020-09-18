<template>
  <div class="home">
    <Carousel :isTop="isTop"></Carousel>
    <div class="container">
      <Swiper title="小萌寵的最愛" :products="hotProducts" class="my-3"></Swiper>
      <Swiper
        title="小萌寵吃得飽"
        :products="filtedProducts('主食飼料', '點心零食')"
        class="my-3"
      ></Swiper>
      <Swiper
        title="小萌寵住得好"
        :products="filtedProducts('居家籠/便盆', '木屑/砂')"
        class="my-3"
      ></Swiper>
      <Swiper title="小萌寵好健康" :products="filtedProducts('營養保健品')" class="my-3"></Swiper>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/fronted/Carousel.vue';
import Swiper from '@/components/fronted/Swiper.vue';
// import { articleCollection } from '@/assets/firebase';

export default {
  props: {
    products: Array,
    cart: Array,
    coupon: Object,
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
    filtedProducts(...category) {
      return this.products.filter((product) => category.includes(product.category));
    },
  },
  computed: {
    hotProducts() {
      return this.products.filter((product) => product.options.hot === true);
    },
  },
  mounted() {
    // 監聽 scroll 事件，調整滑動提示和導覽列的顯示
    window.addEventListener('scroll', this.updateScroll);
  },
};
</script>

<style></style>
