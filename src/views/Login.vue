<template>
<!-- eslint-disable-next-line vue/max-attributes-per-line -->
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

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
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
      // show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      // alert(JSON.stringify(this.form))
      axios({
        method: 'post',
        url: 'localhost:3000/login',
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
        .then(data => {
          localStorage.setItem('token', data.token)
          console.log('Welcome')
        })
        .catch(err => {
          console.log(err)
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      this.$router.push('/register')
      // Trick to reset/clear native browser form validation state
      // this.show = false
      // this.$nextTick(() => {
      //   this.show = true
      // })
    }
  }
}
</script>

<style scoped>
.login {
  margin: 40px 35% 0px 35%;
}
</style>
