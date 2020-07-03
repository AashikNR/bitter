<template>
  <div> <br>
    <h4>Please Login Here</h4>
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
      form: {
        email: '',
        pass: ''
      },
      show: true
    }
  },
  mounted () {
    if (this.DataList && this.$store.state.user.token !== undefined) {
      this.$router.push('/user')
    }
  },
  methods: {
    onSuccess () {
      if (this.DataList) {
        localStorage.setItem('token', this.DataList.accesstoken)
        localStorage.setItem('userid', this.DataList.userid)
        if (this.DataList.accesstoken !== undefined) {
          this.$router.go(0)
        }
      }
    },
    onSubmit  (evt) {
      evt.preventDefault()
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: this.form.email, password: this.form.pass })
      }
      fetch('http://127.0.0.1:3000/auth/login', requestOptions)
        .then(response => response.json())
        .then(data => (this.DataList = data))
      const _this = this
      _this.onSuccess()
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.pass = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
.login {
  border: 1px solid #6088b6;
  border-radius: 6px;
  height: 300px;
  margin: 50px auto 0;
  width: 320px;
}
</style>
