<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-sm-4 mb-3">
          預留 LOGO 位置
        </div>
        <div class="col-sm-4">
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
        <div class="col-sm-4">
          <p><font-awesome-icon :icon="['fas', 'user']" class="nav-icon" />Johlmike</p>
          <p>無商業用途，僅供學習使用</p>
          <p>圖文來源：<a href="http://www.bunny-nature.com.tw/">德國邦尼</a></p>
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
}
</style>
