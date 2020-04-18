<template>
<div class="d-flex justify-content-around flex-wrap">
  <div v-for="product in products" :key="product.id" :class="order(product.id)">
    <b-card
      :title="product.name"
      :img-src="product.image_url"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        {{product.description}} <br>
        Stock: {{product.stock}} <br>
        Price: {{product.price}} <br>
      </b-card-text>

      <div class="d-flex bd-highlight mb-3">
        <b-button href="/" variant="primary" class="mr-auto p-2 bd-highlight" v-if="role == 'user'" @click.prevent="buy(product.id)">Buy</b-button>
        <b-button href="/" variant="secondary" class="mr-auto p-2 bd-highlight" v-if="role == 'admin'" @click.prevent="update(product)">Update</b-button>
        <b-button href="/" variant="danger" class="p-2 bd-highlight" v-if="role == 'admin'" @click.prevent="remove(product.id)">Delete</b-button>
      </div>
    </b-card>
  </div>
</div>
</template>

<script>
export default {
  name: 'Product',
  computed: {
    role () {
      return this.$store.state.role
    },
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    remove (id) {
      this.$store.dispatch('remove', id)
    },
    update (product) {
      this.$store.commit('update', product)
      this.$router.push(`/update/${product.id}`)
    },
    buy (id) {
      this.$store.commit('buy', id)
      const product = this.$store.state.updateData
      this.$store.dispatch('update', product)
    },
    order (id) {
      return `order-${id}`
    }
  },
  updated () {
    this.$store.dispatch('getProduct')
  }
}
</script>
