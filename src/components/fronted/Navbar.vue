<template>
  <header>
    <nav class="navbar navbar-expand-lg">
      <router-link to="/" class="mobile navbar-brand">
        <img src="@/assets/logo.svg" alt="萌兔窩" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <font-awesome-icon :icon="['fas', 'bars']" class="nav-icon" />
      </button>

      <div class="collapse navbar-collapse nav-area" id="navbarSupportedContent">
        <div class="left nav-block">
          <router-link to="/" v-slot="{ isActive, href }" exact>
            <a
              :href="href"
              :class="{ 'is-active': isActive }"
              class="nav-link mb-sm-0 mb-2"
              @click="hideNavbar"
            >
              <font-awesome-icon :icon="['fas', 'home']" class="nav-icon" />
              <span>回首頁</span>
              <span class="sr-only" v-if="isActive">(current)</span>
            </a>
          </router-link>
          <router-link to="/products" v-slot="{ isActive, href }">
            <a
              :href="href"
              :class="{ 'is-active': isActive }"
              class="nav-link mb-sm-0 mb-2"
              @click="hideNavbar"
            >
              <font-awesome-icon :icon="['fas', 'newspaper']" class="nav-icon" />
              <span>商品列表</span>
              <span class="sr-only" v-if="isActive">(current)</span>
            </a>
          </router-link>
          <router-link to="/news" v-slot="{ isActive, href }">
            <a
              :href="href"
              :class="{ 'is-active': isActive }"
              class="nav-link mb-sm-0 mb-2"
              @click="hideNavbar"
            >
              <font-awesome-icon :icon="['fas', 'bullhorn']" class="nav-icon" />
              <span>最新消息</span>
              <span class="sr-only" v-if="isActive">(current)</span>
            </a>
          </router-link>
        </div>
        <router-link to="/" class="desktop navbar-brand">
          <img src="@/assets/logo.svg" alt="萌兔窩" />
        </router-link>
        <div class="right nav-block">
          <router-link to="/academy" v-slot="{ isActive, href }">
            <a
              :href="href"
              :class="{ 'is-active': isActive }"
              class="nav-link mb-sm-0 mb-2"
              @click="hideNavbar"
            >
              <font-awesome-icon :icon="['fas', 'school']" class="nav-icon" />
              <span>愛兔學堂</span>
              <span class="sr-only" v-if="isActive">(current)</span>
            </a>
          </router-link>
          <router-link to="/about" v-slot="{ isActive, href }">
            <a
              :href="href"
              :class="{ 'is-active': isActive }"
              class="nav-link mb-sm-0 mb-2"
              @click="hideNavbar"
            >
              <font-awesome-icon :icon="['fas', 'carrot']" class="nav-icon" />
              <span>關於兔窩</span>
              <span class="sr-only" v-if="isActive">(current)</span>
            </a>
          </router-link>
          <router-link to="/cart" v-slot="{ isActive, href }">
            <a
              :href="href"
              :class="{ 'is-active': isActive }"
              class="nav-link cart mb-sm-0 mb-2"
              @click="hideNavbar"
            >
              <font-awesome-icon :icon="['fas', 'shopping-cart']" class="nav-icon" />
              <span>購物車</span>
              <span class="badge badge-pill badge-primary">{{ cart.length }}</span>
              <span class="sr-only" v-if="isActive">(current)</span>
            </a>
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
/* global $ */

export default {
  props: {
    cart: Array,
  },
  methods: {
    hideNavbar() {
      $('#navbarSupportedContent').collapse('hide');
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: $bright;
  opacity: 0.9;
  border-bottom: 1px solid $dark;
  box-shadow: 0 0 3px 0 $dark;
  color: $dark;
  width: 100%;
  min-height: 4rem;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0 1rem;
  .navbar-toggler {
    border: 2px solid $dark;
    color: $dark;
  }
  .navbar-brand {
    width: 6rem;
    margin: 0;
    &.mobile {
      @media screen and (min-width: 576px) {
        display: none;
      }
    }
    &.desktop {
      @media screen and (max-width: 576px) {
        display: none;
      }
    }
  }
  .nav-area {
    @media screen and (min-width: 576px) {
      display: flex;
      justify-content: space-around;
      .nav-block {
        display: flex;
        &.left {
          justify-content: flex-start;
        }
        &.right {
          justify-content: flex-end;
        }
      }
    }
    .nav-link {
      color: $dark;
      font-size: 1rem;
      border-radius: 0.5rem;
      margin-right: 0.5rem;
      .nav-icon {
        margin-right: 0.5rem;
      }
      &.is-active {
        background-color: $dark;
        color: $bright;
      }
      &:hover {
        background-color: $dark;
        text-decoration: none;
        color: $bright;
        .nav-icon {
          color: $bright;
        }
      }
    }
    .cart {
      display: flex;
      flex-direction: row;
      align-items: center;
      .badge {
        margin-left: 5px;
      }
      &:hover {
        .badge {
          background-color: white;
          color: $dark;
        }
      }
      &.is-active {
        .badge {
          background-color: white;
          color: $dark;
        }
      }
    }
  }
}
</style>
