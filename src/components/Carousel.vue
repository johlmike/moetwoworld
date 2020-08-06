<template>
  <div class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../assets/carousel-1.jpg" class="d-block w-100" alt="#" />
      </div>
      <div class="carousel-item">
        <img src="../assets/carousel-2.jpg" class="d-block w-100" alt="#" />
      </div>
      <div class="carousel-item">
        <img src="../assets/carousel-3.jpg" class="d-block w-100" alt="#" />
      </div>
    </div>
    <div class="mouse" :class="{hide: !isTop}">
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="icon-cart" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isTop: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  // 電腦版滿版圖片
  @media screen and (min-width: 576px) {
    margin-top: -4rem;
  }
  .carousel-inner {
    max-height: 100vh;
  }
}

.hide {
  display: none;
}

.mouse {
  // 手機版隱藏捲動提示
  @media screen and (max-width: 576px) {
    display: none;
  }
  color: $bright;
  font-size: 3.5rem;
  text-align: center;
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  -webkit-animation: mouse 0.8s infinite;
}
@-webkit-keyframes mouse {
  0% {
    bottom: 30px;
    font-size: 3.5rem;
  }
  50% {
    bottom: 0px;
    font-size: 2rem;
  }
  100% {
    bottom: 30px;
    font-size: 3.5rem;
  }
}
</style>
