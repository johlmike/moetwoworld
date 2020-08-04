<template>
  <div>
    後台路由控制
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
    };
  },
};
</script>

<style></style>
