<template>
  <div class="carousel slide carousel-fade" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img :src="`${publicPath}img/carousel-1.jpg`" class="d-block w-100" alt="#" />
      </div>
      <div class="carousel-item">
        <img :src="`${publicPath}img/carousel-2.jpg`" class="d-block w-100" alt="#" />
      </div>
      <div class="carousel-item">
        <img :src="`${publicPath}img/carousel-3.jpg`" class="d-block w-100" alt="#" />
      </div>
    </div>
    <div class="mouse" :class="{ hide: !isTop }">
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="icon-cart" />
    </div>
    <div class="cover">
      <div class="text">
        <h1 class="first">萌兔窩</h1>
        <h2 class="second">細心呵護您的小萌寵</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isTop: Boolean,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
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
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      display: flex;
      color: white;
      height: 50%;
      width: 0%;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      white-space: nowrap;
      animation: fade 3.5s;
      animation-delay: 500ms;
      animation-fill-mode: forwards;
      // 手機版改變寬度和高度
      @media screen and (max-width: 576px) {
        height: 90%;
        animation: fadeMobile 3.5s;
        animation-delay: 500ms;
        animation-fill-mode: forwards;
      }
      .first {
        font-size: 5rem;
        // 手機版改字體大小
        @media screen and (max-width: 576px) {
          font-size: 2.5rem;
        }
      }
      .second {
        font-size: 5rem;
        align-self: flex-end;
        // 手機版改字體大小
        @media screen and (max-width: 576px) {
          font-size: 2.5rem;
        }
      }
    }
  }
}

@keyframes fade {
  0% {
    width: 0;
  }
  100% {
    width: 60%;
  }
}
@keyframes fadeMobile {
  0% {
    width: 0;
  }
  100% {
    width: 95%;
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
  z-index: 4;
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
