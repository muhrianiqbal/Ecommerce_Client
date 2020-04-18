<template>
<div class="login">
  <h1>Add Product</h1>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group
        id="input-group-1"
        label="Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Image Url:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.image_url"
          type="url"
          required
          placeholder="Enter Image Url"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Price:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.price"
          type="number"
          required
          placeholder="Enter Price"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Stock:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.stock"
          type="number"
          required
          placeholder="Enter Stock"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Description:">
        <b-form-textarea
          id="input-5"
          v-model="form.description"
          placeholder="Enter description..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <div class="d-flex bd-highlight mb-3">
        <b-button type="submit" variant="primary" class="mr-auto p-2 bd-highlight">Add</b-button>
        <b-button type="reset" variant="danger" class="p-2 bd-highlight">Cancel</b-button>
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
        name: '',
        image_url: '',
        price: '',
        stock: '',
        description: ''
      }
    }
  },
  methods: {
    onSubmit () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/add',
        headers: {
          token: localStorage.token
        },
        data: {
          name: this.form.name,
          image_url: this.form.image_url,
          price: this.form.price,
          stock: this.form.stock,
          description: this.form.description
        }
      })
        .then(data => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    onReset () {
      this.$router.push('/')
    }
  },
  created () {
    this.form.name = ''
    this.form.image_url = ''
    this.form.price = ''
    this.form.stock = ''
    this.form.description = ''
    if (this.$store.state.role !== 'admin') {
      this.$router.push('/')
    } else if (!localStorage.token) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.login {
  margin: 40px 35% 0px 35%;
}
</style>
