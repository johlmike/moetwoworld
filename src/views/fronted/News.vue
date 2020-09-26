<template>
  <div class="news mb-3">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 py-3 news-list">
          <div v-for="(newsItem, index) in news" :key="'news_' + index">
            <div>{{ formatDate(newsItem.data.created) }}</div>
            <router-link class="d-flex flex-row" :to="`/news-page/${newsItem.id}`">
              <div class="news-title">{{ newsItem.data.title }}</div>
            </router-link>
            <hr v-if="index + 1 !== news.length" />
          </div>
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
      news: [],
    };
  },
  methods: {
    getData() {
      const loader = this.$loading.show();
      // Ajax
      newsCollection
        .orderBy('created', 'desc')
        .get()
        .then((res) => {
          loader.hide();
          res.forEach((news) => {
            this.news.push({ id: news.id, data: news.data() });
          });
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
.news {
  margin-top: 2.5rem;
  color: $dark;
  font-size: 1.5rem;
  @media screen and (max-width: 576px) {
    margin-top: 1.5rem;
  }
  hr {
    border-color: $dark;
  }
  .news-list {
    background-color: white;
    border-radius: 0.75rem;
    .news-title {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
