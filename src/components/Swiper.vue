<template>
  <div class="slide-container">
    <h3>{{ title }}</h3>
    <hr />
    <swiper class="slide" :options="swiperOption">
      <template v-for="product in products">
        <swiper-slide :key="product.id">
          <div class="card mb-5">
            <router-link :to="`/product/${product.id}`" tag="div">
              <div
                class="card-top"
                :style="{
                  backgroundImage: 'url(' + product.imageUrl[0] + ')',
                }"
              >
                <div class="cover">
                  前往選購
                </div>
              </div>
            </router-link>
            <div class="d-flex flex-column justify-content-start card-body">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">{{ product.content }}</p>
              <div class="card-price">
                <div class="origin-price">{{ `NT\$ ${product.origin_price}` }}</div>
                <div class="price">{{ `NT\$ ${product.price}` }}</div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </template>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
// Swiper 6 和某些外掛衝突，降級回 @5.4.5
// https://github.com/surmon-china/vue-awesome-swiper/issues/680
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'slide',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    title: String,
    products: Array,
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 1500,
        },
        speed: 3000,
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },
  methods: {
    checkMobile() {
      if (this.isMobileDevice()) {
        this.swiperOption.slidesPerView = 1;
      } else {
        this.swiperOption.slidesPerView = 4;
      }
    },
    isMobileDevice() {
      const mobileDevice = [
        'Android',
        'webOS',
        'iPhone',
        // 'iPad',
        'iPod',
        'BlackBerry',
        'Windows Phone',
      ];
      let isMobileDevice = mobileDevice.some((e) => navigator.userAgent.match(e));
      return isMobileDevice;
    },
  },
  created() {
    this.checkMobile();
  },
};
</script>

<style lang="scss" scoped>
.slide-container {
  color: $dark;
  h3 {
    color: $dark;
  }
  .slide {
    .swiper-slide {
      .card {
        border: 0;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        .card-top {
          height: 200px;
          overflow: hidden;
          cursor: pointer;
          background-position: center;
          background-repeat: no-repeat;
          background-size: auto 100%;
          .cover {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            font-size: 2rem;
            color: white;
            text-align: center;
          }
          &:hover {
            background-size: auto 120%;
            transition-duration: 500ms;
            .cover {
              opacity: 1;
              transition-duration: 500ms;
            }
          }
        }
        .card-body {
          .card-text {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            height: 3rem;
            text-overflow: ellipsis;
            text-align: left;
          }
          .card-price {
            text-align: right;
            .origin-price {
              font-size: 0.8rem;
              color: #bbbbbb;
              text-decoration: line-through;
            }
            .price {
              font-size: 1.25rem;
              font-weight: bold;
              color: $dark;
            }
          }
        }
      }
    }
  }
}
</style>
