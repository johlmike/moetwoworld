<template>
  <div class="academy mb-3">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 py-3 academy-list">
          <div v-for="(academyItem, index) in academy" :key="'academy_' + index">
            <div>{{ formatDate(academyItem.data.created) }}</div>
            <router-link class="d-flex flex-row" :to="`/academy-page/${academyItem.id}`">
              <div class="academy-title">{{ academyItem.data.title }}</div>
            </router-link>
            <hr v-if="index + 1 !== academy.length" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { academyCollection } from '@/assets/firebase';

export default {
  props: {
    products: Array,
    cart: Array,
    coupon: Object,
  },
  data() {
    return {
      academy: [],
    };
  },
  methods: {
    getData() {
      const loader = this.$loading.show();
      // Ajax
      academyCollection
        .orderBy('created', 'desc')
        .get()
        .then((res) => {
          loader.hide();
          res.forEach((academy) => {
            this.academy.push({ id: academy.id, data: academy.data() });
          });
        });
    },
    formatDate(timestamp) {
      const created = new Date(timestamp * 1000);
      let dateString = '';
      dateString += `${created.getFullYear()}/`;
      dateString += `${created.getMonth() + 1}/`;
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
.academy {
  margin-top: 2.5rem;
  color: $dark;
  font-size: 1.5rem;
  @media screen and (max-width: 576px) {
    margin-top: 1.5rem;
  }
  hr {
    border-color: $dark;
  }
  .academy-list {
    background-color: white;
    border-radius: 0.75rem;
    .academy-title {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
