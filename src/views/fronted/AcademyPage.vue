<template>
  <div class="academy-page mb-3">
    <div class="container py-3">
      <div class="row">
        <h1 class="mx-auto">{{ academy.data.title }}</h1>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="academy-body" v-html="academy.data.content"></div>
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
      academyId: this.$route.params.id,
      academy: {
        id: '',
        data: {},
      },
    };
  },
  methods: {
    getData() {
      const loader = this.$loading.show();
      // Ajax
      academyCollection
        .doc(this.academyId)
        .get()
        .then((res) => {
          loader.hide();
          this.academy.id = res.id;
          this.academy.data = res.data();
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
.academy-page {
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
    .academy-body {
      white-space: pre-line;
      /deep/ img {
        max-width: 100%;
      }
    }
  }
}
</style>
