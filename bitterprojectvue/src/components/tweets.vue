<template>
 <div id='tweet'>
    <head>
        <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
        <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" />
        <script type="application/javascript" defer src="//unpkg.com/vue@latest/dist/vue.min.js"></script>
        <script type="application/javascript" defer src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>
        <script type="application/javascript" defer src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.js"></script>
    </head>
    <div>
    <b-jumbotron  text-variant="dark">
        <template v-slot:lead>
        <h4 style="text-align:left;">
        <b-avatar class="mr-9" src="https://placekitten.com/300/300"></b-avatar>
        <b-icon icon="at" variant="primary"></b-icon>
        {{Tweetdata[0].username}}
        </h4>
        </template>
        <p>
          {{Tweetdata[0].content}}
        </p>
            <div style="text-align:left;">
            <b-button variant="light" @click="like(Tweetdata[0].tweetid)"><b-icon icon="heart"></b-icon></b-button> |
            <b-button variant="light" v-if="this.Userid != Tweetdata[0].userid" @click="follow(Tweetdata[0].userid)">Follow</b-button> |
            <b-button variant="light" @click="liked(Tweetdata[0].tweetid)" v-b-modal.modal-1><b-icon icon="heart-half"></b-icon></b-button>
            <b> {{Tweetlike}}</b>
                    <b-list-group-item class="d-flex align-items-center bg" v-for="item in likedpeople.data" :key="item.tweetid">
                    <b-avatar class="mr-9" src="https://placekitten.com/300/300"></b-avatar>
                    <span class="mr-auto">{{item.username}}</span>
                    </b-list-group-item>
            </div>
    </b-jumbotron>
  </div>
 </div>
</template>

<script>
export default {
  props: ['tweets'],
  created  () {
    this.load(this.Token, this.tweets)
  },
  data () {
    return {
      Tweetdata: [],
      Token: this.$store.state.user.token,
      Userid: this.$store.state.user.userid,
      Tweetlike: [],
      status: '',
      DataList: [],
      likedpeople: [],
      likedstatus: false
    }
  },
  watch: {
    firstName: function (val) {
    }
  },
  methods: {
    async load (token, tweets) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ tweetid: tweets })
      }
      await fetch('http://127.0.0.1:3000/singletweet', requestOptions)
        .then(response => response.json())
        .then(data => (this.Tweetdata = data.data))
      await fetch('http://127.0.0.1:3000/likecounts', requestOptions)
        .then(response => response.json())
        .then(data => (this.Tweetlike = data.data[0].count))
    },
    async like (id) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.Token
        },
        body: JSON.stringify({ userid: this.Userid, tweetid: id })
      }
      await fetch('http://127.0.0.1:3000/newlike', requestOptions)
        .then(response => response.json())
        .then(data => (this.DataList = data))
        .then(data => (this.status = data.data.affectedRows))
      if (this.status === 0) {
        alert('already liked')
      } else {
        this.Tweetlike = this.Tweetlike + 1
      }
    },
    async liked (id) {
      this.likedstatus = !this.likedstatus
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.Token
        },
        body: JSON.stringify({ tweetid: id })
      }
      await fetch('http://127.0.0.1:3000/liked', requestOptions)
        .then(response => response.json())
        .then(data => (this.likedpeople = data))
      if (this.likedstatus === false) {
        this.likedpeople = ''
      }
    },
    async follow (id) {
      if (this.Userid === id) {
        alert('You cant follow yourself')
      } else {
        if (this.Token) {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.Token
            },
            body: JSON.stringify({ userid: this.Userid, followid: id })
          }
          await fetch('http://127.0.0.1:3000/newfollow', requestOptions)
            .then(response => response.json())
            .then(data => (this.Followersdata = data))
            .then(data => (this.status = data.data1.affectedRows))
          if (this.status === 0) {
            alert('already Following')
          } else {
            alert('You started following')
          }
        } else {
          alert('Please login to continue')
          this.$router.push('/')
        }
      }
    }
  }
}
</script>

<style scoped>
.jumbotron
{
    width: 50%;
    margin: auto;
    width: 50%;
    padding: 10px;
 }
</style>
