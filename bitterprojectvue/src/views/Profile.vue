<template>
<div>
  <b-card
    :title = "Data.data[0].username"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 100rem;"
    class="mb-2"
  >
    <b-card-text>
      <h4> Tweets </h4>
      <li class="my-4" v-for="item in Data.data" :key="item.tweetid">
          {{item.content}}
      </li>
    </b-card-text>
      <b-button @click="followppl(Data.data[0].userid)"  variant="primary" v-b-modal.modal-1>Following</b-button> |
      <b-button @click="follower(Data.data[0].userid)"  variant="primary" v-b-modal.modal-1>Followers</b-button>
  </b-card>
      <div>
      <b-modal id="modal-1" >
        <li class="my-4" v-for="item in Followersdata.data" :key="item.userid">
            <b-button @click="profile(item.userid)" v-b-modal.modal-1>{{item.username}}</b-button>
        </li>
     </b-modal>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      Data: [],
      Token: this.$store.state.user.token,
      Userid: this.$store.state.user.userid,
      Followersdata: []
    }
  },
  created  () {
    if (this.Token) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.Token
        },
        body: JSON.stringify({ userid: this.Userid })
      }
      fetch('http://127.0.0.1:3000/profile', requestOptions)
        .then(response => response.json())
        .then(data => (this.Data = data))
    } else {
      alert('Please login to continue')
      this.$router.push('/')
    }
  },
  methods: {
    profile (id) {
      alert(id)
    },
    followppl (id) {
      if (this.Token) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.Token
          },
          body: JSON.stringify({ userid: this.Userid })
        }
        this.Followersdata = ''
        fetch('http://127.0.0.1:3000/following', requestOptions)
          .then(response => response.json())
          .then(data => (this.Followersdata = data))
      } else {
        alert('Please login to continue')
        this.$router.push('/')
      }
    },
    follower (id) {
      if (this.Token) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.Token
          },
          body: JSON.stringify({ userid: this.Userid })
        }
        this.Followersdata = ''
        fetch('http://127.0.0.1:3000/followers', requestOptions)
          .then(response => response.json())
          .then(data => (this.Followersdata = data))
      } else {
        alert('Please login to continue')
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss">

</style>
