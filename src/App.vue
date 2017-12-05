<template>
  <div id="app">
    <header class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <router-link to="/" class="navbar-brand">PKERM</router-link>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li>
              <router-link to="/">Rules</router-link>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less" scoped>
.navbar {
  border-bottom: 2px solid #614788;

  a {
    color: #563d7c;
  }
}
</style>
