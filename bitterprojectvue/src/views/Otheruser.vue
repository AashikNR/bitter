<template>
<div id="app">
  <div class="container">
    <div class="row pen-title">
      <div class="col">
        <h3 class="title">{{title}}</h3>
      </div>
      <div class="col col-auto align-self-center text-right">
        <div class="input-group">
          <input class="form-control" type="text" v-model='username'>
          <div class="input-group-append">
            <button class="btn btn-primary" v-on:click="getPeoplesearch">Go</button> |
            <button class="btn btn-primary" v-on:click="getPeople">Reset</button>
          </div>
        </div>
      </div>
    </div>

    <transition-group name="fade" tag="div" class="row">
      <div v-for="(person, key) in people" :key="key" class="col-md-6 col-lg-4">
        <div class="person">
          <div class="person__header">
            <img src="https://picsum.photos/600/300/?image=25" v-bind:alt="person" class="rounded img-thumbnail">
            <div class="person__name">{{person.username}}</div>
          </div>
          <div class="person__email">
            <a v-bind:href="'mailto:'">example@example.com</a>
          </div>
          <div class="person__address">
            <address>
              5323 <br>
              Marktoberdorf  <br>
              Berlin,Germany
            </address>
          </div>
          <div class="person__map">
            <iframe width="100%" height="170" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" v-bind:src="'https://maps.google.com/maps?q=-46.8222,-119.1670&z=7&amp;output=embed'">
            </iframe>
          </div>
        </div>
      </div>
    </transition-group>

  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Find The one whom your are looking for',
      people: [],
      //   quantity: all,
      endpoint: 'http://127.0.0.1:3000/user',
      endpointsearch: 'http://127.0.0.1:3000/usersearch',
      username: '',
      Token: this.$store.state.user.token
    }
  },
  created: function () {
    this.getPeople()
  },
  methods: {
    getPeople: function () {
      const requestOptions = {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.Token
        }
      }
      fetch(this.endpoint, requestOptions)
        .then(response => response.json())
        .then(rsp => (this.people = rsp.data))
    },
    getPeoplesearch: function () {
      const requestOptions = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.Token
        },
        body: JSON.stringify({ username: this.username })
      }
      fetch(this.endpointsearch, requestOptions)
        .then(response => response.json())
        .then(rsp => (this.people = rsp.data))
    }
  }
}
</script>

<style lang="scss" scope>
body {
  background: radial-gradient(ellipse at center, #b5bdc8 0%, #828c95 36%, #28343b 100% );
  min-height:600px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.pen-title {
  margin: 36px 0;
  color: #fff;
  padding-bottom: 36px;
  border-bottom: 1px solid #999;

  .title{
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
  }
}

.person {
  background: radial-gradient(ellipse at center, #ffffff 0%, #e5e5e5 100%);
  border: 1px solid #666;
  border-radius: 4px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);

  &__header {
    font-size: 24px;
    text-transform: capitalize;
    margin: 15px 0 30px;
  }

  &__map {
    background: white;
    border: 2px solid #88b5de;
    border-radius: 5px;
    padding: 5px 5px 0;
    margin: 0 15px 15px;
  }
}

</style>
