<!-- eslint-disable-next-line vue/max-attributes-per-line -->
<template>
<div class="login">
  <h1>Login</h1>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <div class="d-flex bd-highlight mb-3">
        <b-button type="submit" variant="primary" class="mr-auto p-2 bd-highlight">Login</b-button>
        <b-button type="reset" variant="danger" class="p-2 bd-highlight">Register</b-button>
      </div>
    </b-form>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then(data => {
          localStorage.setItem('token', data.data.token)
          this.form.email = ''
          this.form.password = ''
          this.$router.push('/')
          this.$store.commit('getRole', data.data.role)
          console.log('Welcome')
        })
        .catch(err => {
          console.log(err)
        })
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.password = ''
      this.$router.push('/register')
    }
  },
  created () {
    if (localStorage.token) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.login {
  margin: 40px 35% 0px 35%;
}
</style>
