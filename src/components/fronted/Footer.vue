<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="logo col-sm-4 mb-3 order-md-2">
          <img src="@/assets/萌兔窩@LOGO.svg" alt="萌兔窩" />
        </div>
        <div class="col-sm-4 order-md-1">
          <p><font-awesome-icon :icon="['fas', 'phone']" class="nav-icon" />02-2222-2222</p>
          <p>
            <font-awesome-icon :icon="['fas', 'envelope']" class="nav-icon" />
            <a href="mailto:johlmike@gmail.com">Johlmike@gmail.com</a>
          </p>
          <p>
            <font-awesome-icon :icon="['fas', 'map']" class="nav-icon" />臺北市萌兔區小鼠路 22 號 2
            樓
          </p>
        </div>
        <div class="author col-sm-4 order-md-3 text-md-right">
          <p>
            <font-awesome-icon :icon="['fas', 'user']" class="nav-icon" />Johlmike
            <a
              href="https://github.com/johlmike/moetwoworld"
              target="_blank"
              rel="noopener noreferrer"
              class="author-website"
            >
              <font-awesome-icon :icon="['fab', 'github']" class="nav-icon" />
            </a>
            <a
              href="https://github.com/johlmike/moetwoworld"
              target="_blank"
              rel="noopener noreferrer"
              class="author-website"
            >
              <font-awesome-icon :icon="['fab', 'facebook']" class="nav-icon" />
            </a>
            <a
              href="https://blog.johlmike.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="author-website"
            >
              <font-awesome-icon :icon="['fab', 'wordpress-simple']" class="nav-icon" />
            </a>
          </p>
          <p>無商業用途，僅供學習使用</p>
          <p>
            商品來源：
            <a href="http://www.bunny-nature.com.tw/" target="_blank" rel="noreferrer noopener"
              >邦尼</a
            >
            、
            <a
              href="https://www.gex-fp.co.jp/chinese/index.html"
              target="_blank"
              rel="noreferrer noopener"
              >GEX</a
            >
            、 Marukan
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  color: $dark;
  padding-top: 1rem;
  background-color: $bright;
  border-top: 1px solid $dark;
  box-shadow: 0 0 3px 0 $dark;
  .nav-icon {
    margin-right: 0.5rem;
  }
  .logo {
    img {
      max-height: 100px;
    }
  }
  .author {
    .author-website {
      .nav-icon {
        margin: 0 0.5rem;
      }
    }
  }
}
</style>
