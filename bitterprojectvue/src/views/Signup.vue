<template>
  <div class="transition"> <br>
    <h4>Please Signup Here</h4>
    <b-container class="login">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Username"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="text"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.pass"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Confirm Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.confirmPass"
          type="password"
          required
          placeholder="Confirm password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button> |
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      DataList: [],
      Username: [],
      form: {
        email: '',
        pass: '',
        confirmPass: ''
      },
      status: true,
      show: true
    }
  },
  created  () {
    this.usernames()
  },
  methods: {
    onSubmit  (evt) {
      for (var i = 0; i < this.Username.length; i++) {
        if (this.Username[i].username === this.form.email) {
          alert('Username already exist!')
          throw new Error('Username already exist!')
        }
      }
      if (this.form.pass === this.form.confirmPass) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: this.form.email, password: this.form.pass })
        }
        fetch('http://127.0.0.1:3000/auth/signup', requestOptions)
          .then(response => response.json())
          .then(data => (this.DataList = data))
        alert('Singup complete . Please login to continue..')
        this.$router.push('/')
      } else {
        alert('Password doesnt match')
      }
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.pass = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    usernames () {
      fetch('http://127.0.0.1:3000/auth/username')
        .then(response => response.json())
        .then(data => (this.Username = data.results))
    }
  }
}
</script>

<style scoped>
.login {
  border: 1px solid #42464b;
  border-radius: 6px;
  height: 360px;
  margin: 50px auto 0;
  width: 320px;
}
.transition {
  animation: 1s ease-out 0s 1 slideInFromLeft;
  padding: 30px;
}
</style>
