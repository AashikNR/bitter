<template>
  <div id="app">
    <div id="nav">
      <div v-if="this.$store.state.user.token">
        <router-link to="/addnewblog">Add new tweet</router-link> |
        <router-link to="/home">Home</router-link> |
        <router-link to="/profile">Profile</router-link> |
        <router-link to="/user">Find Other's</router-link>
      </div>
      <div v-else>
        <router-link to="/">Login</router-link> |
        <router-link to="/signup">Signup</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
// Imports

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
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
