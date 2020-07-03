<template>
  <div class="main">
    <div class="bg">
          <ul class="list-group" id="infinite-list">
            <li class="list-group-item" v-for="(item,index) in items" :key="item.tweetid">
              {{index+1}} - {{item.content}}
              <br>
              <b-button variant="info" @click="like(item.tweetid)">Like {{likecount}}</b-button> |
              <b-button  variant="info" @click="liked(item.tweetid)" v-b-modal.modal-1>Check who else liked</b-button> |
              <b-button variant="info" @click="follow(item.userid)">Follow this user</b-button>
            </li>
          </ul>
    </div>
    <div>
      <b-modal id="modal-1" title="Those who liked">
          <b-list-group>
            <h4 style="color:white">Followers</h4>
            <b-list-group-item class="d-flex align-items-center bg" v-for="item in likedpeople.data" :key="item.tweetid">
              <b-avatar class="mr-3"></b-avatar>
              <span class="mr-auto">{{item.username}}</span>
            </b-list-group-item>
          </b-list-group>
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
      likedpeople: [],
      likecount: 10,
      likee: false
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
  height: 88vh;
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
.bg {
  background: radial-gradient(ellipse at center, #ffffff 0%, #e5e5e5 100%);
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.transition {
  animation: 1s ease-out 0s 1 slideInFromLeft;
  padding: 30px;
}
.main {
  animation: fadein 2s;
}
@keyframes fadein {
  from { opacity: 0}
  to   { opacity: 1}
}
</style>
