<template>
  <div class="p-3 info-block">
    <div class="info-title">{{ title }}</div>
    <hr />
    <template v-for="articleItem in article">
      <div class="info-item" :key="articleItem.id">
        <div class="info-item-date">{{ formatDate(articleItem.data.created) }}</div>
        <router-link class="info-item-title" :to="`/${url}/${articleItem.id}`">
          {{ articleItem.data.title }}
        </router-link>
      </div>
    </template>
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
      url: '',
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
            res.forEach((academy) => {
              this.article.push({ id: academy.id, data: academy.data() });
            });
          });
      }
    },
    formatDate(timestamp) {
      const created = new Date(timestamp * 1000);
      let dateString = '';
      dateString += `${created.getFullYear()}年`;
      dateString += ` ${created.getMonth() + 1}月`;
      dateString += ` ${created.getDate()}日`;
      return dateString;
    },
  },
  created() {
    this.getData();
    switch (this.category) {
      case 'news':
        this.title = '最新消息';
        this.url = 'news-page';
        return;
      case 'academy':
        this.title = '愛兔學堂';
        this.url = 'academy-page';
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
  box-shadow: 0 0 4px 0px;
  .info-title {
    font-size: 1.75rem;
    text-align: center;
  }
  hr {
    border-color: $dark;
  }
  .info-item {
    display: flex;
    flex-direction: row;
    .info-item-date {
      min-width: 8.5rem;
    }
    .info-item-title {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
