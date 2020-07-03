<template>
  <div id="app">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Bitter</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav id ="nav">
        <b-nav-item v-if="this.$store.state.user.token">
          <router-link to="/addnewblog">Add tweet</router-link> |
          <router-link to="/home">Home</router-link> |
          <router-link to="/profile">Profile</router-link> |
          <router-link to="/user">Find Other's</router-link>
        </b-nav-item>
        <b-nav-item v-else>
          <router-link to="/">Login</router-link> |
          <router-link to="/signup">Signup</router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    <router-view/>
  </div>
</template>

<script>

export default {
  props: ['login'],
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}
</style>
