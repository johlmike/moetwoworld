<template>
  <div class="news-page mb-3">
    <div class="container py-3">
      <div class="row">
        <h1 class="mx-auto">{{ news.data.title }}</h1>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="news-body" v-html="news.data.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { newsCollection } from '@/assets/firebase';

export default {
  props: {
    products: Array,
    cart: Array,
    coupon: Object,
  },
  data() {
    return {
      newsId: this.$route.params.id,
      news: {
        id: '',
        data: {},
      },
    };
  },
  methods: {
    getData() {
      const loader = this.$loading.show();
      // Ajax
      newsCollection
        .doc(this.newsId)
        .get()
        .then((res) => {
          loader.hide();
          this.news.id = res.id;
          this.news.data = res.data();
        });
    },
    formatDate(timestamp) {
      const created = new Date(timestamp * 1000);
      let dateString = '';
      dateString += `${created.getFullYear()}/`;
      dateString += `${created.getMonth()}/`;
      dateString += `${created.getDate()}`;
      return dateString;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.news-page {
  margin-top: 2.5rem;
  color: $dark;
  font-size: 1.5rem;
  @media screen and (max-width: 576px) {
    margin-top: 1.5rem;
  }
  hr {
    border-color: $dark;
  }
  .container {
    background-color: white;
    border-radius: .75rem;
    .news-body {
      white-space: pre-line;
      /deep/ img {
        max-width: 100%;
      }
    }
  }
}
</style>
