<template>
  <div id="app">
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand v-b-modal.modal-tall>Bitter</b-navbar-brand>
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
   <div>
  <b-modal id="modal-tall" title="Who we are">
    <p class="my-1" >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu leo ut ex volutpat gravida.
      Quisque est est, maximus non placerat sed, lacinia sit amet dui. Phasellus ultrices ultricies
      metus et fermentum. Nunc non velit congue, feugiat neque eget, rutrum ex. Etiam mattis nec sem
      pharetra vehicula. Donec elementum faucibus augue eu ornare. Cras tempor id odio a condimentum.
      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
    </p>
  </b-modal>
</div>
  <router-view/>
  </div>
</template>

<script>

export default {
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
