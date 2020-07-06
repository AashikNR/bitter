<template>
 <div id='mytweet'>
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
        </h4>
        </template>
        <p>
          {{Tweetdata[0].content}}
        </p>
            <div style="text-align:left;">
            <b variant="light"><b-icon icon="heart"></b-icon></b>
            <b> {{Tweetlike[0].count}}</b> </div>
        </b-jumbotron>
  </div>
 </div>
</template>

<script>
export default {
  props: ['singletweet'],
  created  () {
    this.load(this.Token, this.singletweet)
  },
  data () {
    return {
      Tweetdata: [],
      Token: this.$store.state.user.token,
      Userid: this.$store.state.user.userid,
      Tweetlike: [],
      status: '',
      DataList: [],
      likedpeople: []
    }
  },
  methods: {
    async load (token, id) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({ tweetid: id })
      }
      await fetch('http://127.0.0.1:3000/mysingletweet', requestOptions)
        .then(response => response.json())
        .then(data => (this.Tweetdata = data.data))
      await fetch('http://127.0.0.1:3000/likecounts', requestOptions)
        .then(response => response.json())
        .then(data => (this.Tweetlike = data.data))
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
