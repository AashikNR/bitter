<template>
  <div>
    <h4>Welcome back
    <b-button @click="logout">Log-out</b-button></h4>
    <b-container class="bv-example-row">
          <ul class="list-group" id="infinite-list">
            <li class="list-group-item" v-for="(item,index) in items" :key="item.tweetid">
              {{index}} - {{item.content}} - <b-button @click="like(item.tweetid)">Like</b-button>
              <b-button @click="liked(item.tweetid)" v-b-modal.modal-1>Check who else liked</b-button>
              <b-button @click="follow(item.userid)">Follow this user</b-button>
            </li>
          </ul>
    </b-container>
    <div>
      <b-modal id="modal-1" title="Liked profiles">
        <p class="my-4" v-for="item in likedpeople.data" :key="item.tweetid">
          <b-button @click="profile(item.userid)" v-b-modal.modal-1>{{item.username}}</b-button></p>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  created  () {
    if (this.Token) {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.Token
        }
      }
      fetch('http://127.0.0.1:3000/home', requestOptions)
        .then(response => response.json())
        .then(data => (this.Data = data))
    } else {
      alert('Please login to continue')
      this.$router.push('/')
    }
  },
  data () {
    return {
      Token: this.$store.state.user.token,
      Userid: this.$store.state.user.userid,
      Data: [],
      Datalist: [],
      loading: false,
      items: [],
      iterations: 0,
      likedpeople: []
    }
  },
  mounted () {
    const listElm = document.querySelector('#infinite-list')
    listElm.addEventListener('scroll', e => {
      if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.loadMore()
      }
    })
    this.loadMore()
  },
  methods: {
    follow (id) {
      // alert(this.Userid)
      // alert(id)
      if (this.Token) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.Token
          },
          body: JSON.stringify({ userid: this.Userid, followid: id })
        }
        fetch('http://127.0.0.1:3000/newfollow', requestOptions)
          .then(response => response.json())
          .then(data => (this.Followersdata = data))
      } else {
        alert('Please login to continue')
        this.$router.push('/')
      }
    },
    profile (id) {
      alert(id)
    },
    liked (id) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.Token
        },
        body: JSON.stringify({ tweetid: id })
      }
      fetch('http://127.0.0.1:3000/liked', requestOptions)
        .then(response => response.json())
        .then(data => (this.likedpeople = data))
    },
    loadMore () {
      this.loading = true
      setTimeout(e => {
        for (var i = this.iterations; i < this.iterations + 10; i++) {
          if (this.Data.data[i]) {
            this.items.push(this.Data.data[i])
          }
        }
        this.iterations = this.iterations + 10
        this.loading = false
      }, 200)
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
      alert('You are about log-out')
      this.$router.push('/')
      this.$router.go(0)
    },
    like (id) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.Token
        },
        body: JSON.stringify({ userid: this.Userid, tweetid: id })
      }
      fetch('http://127.0.0.1:3000/newlike', requestOptions)
        .then(response => response.json())
        .then(data => (this.DataList = data))
    }
  }
}
</script>

<style lang="scss">

.list-group {
  overflow: auto;
  height: 75vh;
  border: 2px solid #dce4ec;
  border-radius: 5px;
}
.list-group-item {
  margin-top: 5px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 2px solid #dce4ec;
}

</style>
