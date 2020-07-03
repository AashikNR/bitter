<template>
    <div id="add-blog">
        <h2>Add a New Tweet</h2>
        <form>
            <label>Tweet Content:</label>
            <textarea v-model.trim="blog.content" required></textarea> <br>
            <b-button type="submit" @click="submitForm" variant="primary">Submit</b-button>
        </form>
        <div id="preview">
            <h3>Preview Tweet</h3>
            <p style="white-space: pre">{{ blog.content }}</p>
        </div>
    </div>
</template>

<script>

export default {
  created  () {
    if (!this.Token) {
      alert('Login First')
      this.$router.push('/')
    }
  },
  data () {
    return {
      DataList: [],
      Token: this.$store.state.user.token,
      Userid: this.$store.state.user.userid,
      blog: {
        content: '',
        userid: ''
      }
    }
  },
  methods: {
    submitForm () {
      if (confirm('Are you sure you want to add this tweet?')) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.Token
          },
          body: JSON.stringify({ userid: this.Userid, content: this.blog.content })
        }
        fetch('http://127.0.0.1:3000/tweetupload', requestOptions)
          .then(response => response.json())
          .then(data => (this.DataList = data))
      }
    }
  }
}
</script>

<style>
#add-blog *{
    box-sizing: border-box;
}
#add-blog{
    margin: 20px auto;
    max-width: 500px;
}
label{
    display: block;
    margin: 20px 0 10px;
}
input[type="text"], textarea{
    display: block;
    width: 100%;
    padding: 8px;
}
#preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}
h3{
    margin-top: 10px;
}

</style>
