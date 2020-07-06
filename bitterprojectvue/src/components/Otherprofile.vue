<template>
  <div class="transitionsfade">
      <div class="float-parent">
            <b-list-group style="max-width: 500px;">
              <h4 style="color:white">Profile</h4>
              <b-list-group-item class="d-flex align-items-center bg">
                <b-avatar class="mr-9" src="https://placekitten.com/300/300"></b-avatar>
                <span class="mr-auto" style="text-transform: uppercase;"> {{Data.data[0].username}} </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex align-items-center bg">
                <b-avatar class="mr-9" text="ag"></b-avatar>
                <span class="mr-auto"> Age : 23</span>
              </b-list-group-item>
              <b-list-group-item class="d-flex align-items-center bg">
                <b-avatar class="mr-9" icon="people-fill"></b-avatar>
                <span class="mr-auto">Address : Cecilia Chapman 711-2880 Nulla </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex align-items-center bg">
                <b-avatar class="mr-9" icon="people-fill"></b-avatar>
                <span class="mr-auto">DOB : 01/01/2000 </span>
              </b-list-group-item>
              <b-list-group-item class="d-flex align-items-center bg">
                <b-avatar class="mr-9" icon="people-fill"></b-avatar>
                <span class="mr-auto">Joined on : 01/01/2020  </span>
              </b-list-group-item>
            </b-list-group>
      </div>
      <div class="float-child">
            <b-list-group style="max-width: 300px;">
            <h4 style="color:white">Following</h4>
            <b-list-group-item class="d-flex align-items-center bg" v-for="item in Followersdata.data" :key="item.userid">
              <b-avatar class="mr-3"></b-avatar>
              <span class="mr-auto">{{item.username}}</span>
            </b-list-group-item>
          </b-list-group>
      </div>
      <div class="float-child">
       <b-list-group style="max-width: 300px;">
            <h4 style="color:white">Followers</h4>
            <b-list-group-item class="d-flex align-items-center bg" v-for="item in Followersdatas.data" :key="item.userid">
              <b-avatar class="mr-3"></b-avatar>
              <span class="mr-auto">{{item.username}}</span>
            </b-list-group-item>
          </b-list-group>
      </div>
      <div>
            <h4 style="color:white">{{Data.data[0].username}}'s Tweets</h4>
            <b-list-group-item v-for="(item) in Data.data1" :key="item.tweetid">
              <singletweet :singletweet= item.tweetid></singletweet>
            </b-list-group-item>
      </div>
    </div>
</template>

<script>
import singletweet from '@/components/mytweets.vue'
export default {
  components: {
    singletweet
  },
  data () {
    return {
      Data: [],
      Token: this.$store.state.user.token,
      Userid: this.$route.params.id,
      Followersdata: [],
      Followersdatas: []
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
      fetch('http://127.0.0.1:3000/following', requestOptions)
        .then(response => response.json())
        .then(data => (this.Followersdata = data))
      fetch('http://127.0.0.1:3000/followers', requestOptions)
        .then(response => response.json())
        .then(data => (this.Followersdatas = data))
    } else {
      alert('Please login to continue')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.float-child {
    width: 30%;
    float: left;
    padding: 50px;
}
.float-parent {
    width: 40%;
    float: left;
    padding: 50px;
}
.float-tweet {
    width: 100%;
    float: left;
    padding: 50px;
}
.my-4 {
  color: rgb(255, 255, 255);
}
.bg {
  background: radial-gradient(ellipse at center, #ffffff 0%, #e5e5e5 100%)
}
.transitionsfade {
    animation: fadeInAnimation ease 3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}
@keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
     }
}
</style>
