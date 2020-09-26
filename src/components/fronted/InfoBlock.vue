<template>
  <div class="p-3 info-block">
    <div class="info-title">{{ title }}</div>
    <hr />
  </div>
</template>

<script>
import { newsCollection, academyCollection } from '@/assets/firebase';

export default {
  props: {
    category: String,
  },
  data() {
    return {
      title: '',
      article: [],
    };
  },
  methods: {
    getData() {
      const loader = this.$loading.show();
      // Ajax
      if (this.category === 'news') {
        newsCollection
          .orderBy('created', 'desc')
          .limit(5)
          .get()
          .then((res) => {
            loader.hide();
            res.forEach((news) => {
              this.article.push({ id: news.id, data: news.data() });
            });
          });
      } else {
        academyCollection
          .orderBy('created', 'desc')
          .limit(5)
          .get()
          .then((res) => {
            loader.hide();
            res.forEach((article) => {
              this.article.push({ id: article.id, data: article.data() });
            });
          });
      }
    },
  },
  created() {
    this.getData();
    switch (this.category) {
      case 'news':
        this.title = '最新消息';
        return;
      case 'academy':
        this.title = '愛兔學堂';
        return;
      default:
        this.title = 'error';
    }
  },
};
</script>

<style lang="scss" scoped>
.info-block {
  background-color: white;
  border-radius: 0.25rem;
  color: $dark;
  .info-title {
    font-size: 1.75rem;
    text-align: center;
  }
  hr {
    border-color: $dark;
  }
}
</style>
