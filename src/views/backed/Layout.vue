<template>
  <div>
    <BNavbar></BNavbar>
    <router-view :tokenReady="tokenReady"></router-view>
    <div class="modal" tabindex="-1" role="dialog" id="error-modal" data-backdrop="static">
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">驗證失敗</h5>
          </div>
          <div class="modal-body">
            <p>
              請重新登入
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
import BNavbar from '@/components/backed/BNavbar.vue';

export default {
  components: {
    BNavbar,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASEURL,
      uuid: process.env.VUE_APP_UUID,
      token: '',
      tokenReady: false,
    };
  },
  methods: {
    authFailed() {
      $('#error-modal').modal('hide');
      document.cookie = 'moerabbitworld-token=;';
      this.$router.push('/admin-login');
    },
    getCookie(name) {
      const cookieArr = document.cookie.split(';');
      for (let i = 0; i < cookieArr.length; i += 1) {
        const cookiePair = cookieArr[i].split('=');
        if (name === cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
        }
      }
      // Return null if not found
      return null;
    },
  },
  mounted() {
    let token = '';
    // DOM建立時，檢查是否已有Token
    if (document.cookie) {
      token = this.getCookie('moerabbitworld-token');
    }
    // 有Token的話，檢查Token是否正確
    if (token) {
      const loader = this.$loading.show();
      // 準備request用url
      const url = `${this.baseUrl}auth/check`;
      // 準備request用data
      const tokenData = {
        api_token: token,
      };
      this.axios
        .post(url, tokenData)
        .then(() => {
          loader.hide();
          this.token = token;
          this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
          this.tokenReady = true;
        })
        .catch(() => {
          loader.hide();
          $('#error-modal').modal('show');
          setTimeout(this.authFailed, 2000);
        });
    } else {
      // 沒Token表示沒驗證過，跳轉至管理員登入頁面
      $('#error-modal').modal('show');
      setTimeout(this.authFailed, 2000);
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  min-height: 100vh;
}
</style>
