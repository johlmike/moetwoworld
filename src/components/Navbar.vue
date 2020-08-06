<template>
  <nav class="navbar navbar-expand-lg">
    <a class="mobile navbar-brand" href="#">
      <img src="@/assets/logo.svg" alt="萌兔窩" />
    </a>
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
          <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
            <font-awesome-icon :icon="['fas', 'home']" class="nav-icon" />
            <span>回首頁</span>
            <span class="sr-only" v-if="isActive">(current)</span>
          </a>
        </router-link>
        <router-link to="/products" v-slot="{ isActive, href }">
          <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
            <font-awesome-icon :icon="['fas', 'newspaper']" class="nav-icon" />
            <span>商品列表</span>
            <span class="sr-only" v-if="isActive">(current)</span>
          </a>
        </router-link>
      </div>
      <div class="desktop navbar-brand">
        <img src="@/assets/logo.svg" alt="萌兔窩" />
      </div>
      <div class="right nav-block">
        <router-link to="/about" v-slot="{ isActive, href }">
          <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
            <font-awesome-icon :icon="['fas', 'carrot']" class="nav-icon" />
            <span>關於我們</span>
            <span class="sr-only" v-if="isActive">(current)</span>
          </a>
        </router-link>
        <router-link to="/cart" v-slot="{ isActive, href }">
          <a :href="href" :class="{ 'is-active': isActive }" class="nav-link">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" class="nav-icon" />
            <span>購物車</span>
            <span class="sr-only" v-if="isActive">(current)</span>
          </a>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: $bright;
  border-bottom: 1px solid $dark;
  box-shadow: 0 0 3px 0;
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
  }
}
</style>
