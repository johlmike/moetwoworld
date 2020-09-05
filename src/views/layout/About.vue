<template>
  <div class="about">
    <div class="container">
      <div class="row about-body" :style="{ backgroundImage: `url(${publicPath}img/about.jpg)` }">
        <div class="col-sm-5 offset-sm-7 p-5 about-content">
          <h2>— 誕生 —</h2>
          <p>
            2020 年 9 月，萌兔窩正式誕生，開始了鼠兔產品的銷售業務，由一位兩隻兔寶的兔爸獨力經營。
          </p>
          <h2>— 理念 —</h2>
          <p>
            為了讓廣大兔寶們都能擁有最無微不至的呵護，在家中兔寶的見證下，只推薦品質優良、價格實惠的愛兔產品，讓爸媽買得安心、兔寶吃得開心。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
    cart: Array,
    coupon: Object,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<style lang="scss" scoped>
.about {
  .about-body {
    min-height: calc(100vh - 64px - 137px);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    @media screen and (max-width: 576px) {
      background-size: auto 100%;
    }
    .about-content {
      background: rgba($color: $bright, $alpha: 0.6);
      font-size: 1.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
