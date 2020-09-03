<template>
  <div>
    下單完成
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
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      orderId: this.$route.params.id,
      orderData: {},
    };
  },
  methods: {
    getOrder(id) {
      const loader = this.$loading.show();
      const url = `${this.baseUrl}${this.uuid}/ec/orders/${id}`;
      this.axios
        .get(url)
        .then((res) => {
          loader.hide();
          this.orderData = this._.cloneDeep(res.data.data);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getOrder(this.orderId);
  },
};
</script>

<style></style>
