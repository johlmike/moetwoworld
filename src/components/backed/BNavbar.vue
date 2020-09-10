<template>
  <div>
    <div class="header container-fluid">
      <nav class="navbar navbar-expand-lg py-0">
        <div class="container-fluid d-flex justify-content-round">
          <div class="nav-block d-flex flex-row">
            <router-link to="/admin" v-slot="{ isActive, href }" exact>
              <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
                <font-awesome-icon :icon="['fas', 'newspaper']" class="nav-icon" />
                <span>商品管理</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link>
            <router-link to="/admin/coupon-manage" v-slot="{ isActive, href }">
              <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
                <font-awesome-icon :icon="['fas', 'ticket-alt']" class="nav-icon" />
                <span>優惠券管理</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link>
            <router-link to="/admin/order-manage" v-slot="{ isActive, href }">
              <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
                <font-awesome-icon :icon="['fas', 'clipboard-list']" class="nav-icon" />
                <span>訂單管理</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link>
            <router-link to="/admin/picture-manage" v-slot="{ isActive, href }">
              <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
                <font-awesome-icon :icon="['fas', 'images']" class="nav-icon" />
                <span>圖片管理</span>
                <span class="sr-only" v-if="isActive">(current)</span>
              </a>
            </router-link>
          </div>
          <div class="nav-block d-flex flex-row">
            <a href="#" class="nav-link" @click.prevent="logout">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="nav-icon" />
              <span>登出</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      document.cookie = 'moerabbitworld-token=;';
      this.$router.push('/admin-login');
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: $bright;
  nav {
    height: 3.5rem;
  }
  .nav-block {
    .nav-link {
      color: $dark;
      font-size: 1rem;
      border-radius: 0.5rem;
      margin-right: 0.5rem;
      cursor: pointer;
      .nav-icon {
        color: $dark;
        font-size: 1rem;
        margin-bottom: -5px;
        margin: 0 0.5rem 0 0;
      }
      &:hover {
        background-color: $dark;
        text-decoration: none;
        color: white;
        .nav-icon {
          color: white;
        }
      }
    }
    .is-active {
      background-color: $dark;
      color: white;
      .nav-icon {
        color: white;
      }
    }
    .nav-logo {
      font-weight: bold;
      font-size: 2rem;
      letter-spacing: 0.5rem;
      margin-right: -0.5rem;
      &:hover {
        background-color: $dark;
        color: $bright;
      }
    }
  }
}
</style>
