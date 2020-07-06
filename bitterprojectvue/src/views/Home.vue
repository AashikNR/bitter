<template>
  <div class="main">
    <div class="bg">
          <ul class="list-group" id="infinite-list">
            <li class="list-group-item" v-for="(item) in items" :key="item.tweetid">
              <tweets :tweets= item.tweetid></tweets>
            </li>
          </ul>
    </div>
 </div>
</template>

<script>
import tweets from '@/components/tweets.vue'
export default {
  components: {
    tweets
  },
  watch: {
    item_length: function () {
      this.likecount = 8
      return this.likecount
    }
  },
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
      likecount: [],
      status: ''
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
