<template>
  <div>
    <DNavbar></DNavbar>
    <router-view></router-view>
  </div>
</template>

<script>
import DNavbar from '@/components/DNavbar.vue';

export default {
  components: {
    DNavbar,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
    };
  },
};
</script>

<style></style>
