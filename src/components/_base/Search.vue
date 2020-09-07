<template>
  <div class="search">
    <div class="search-box">
      <input type="text" placeholder="Search Here!" v-on:keyup="setSearch">
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Search',
  methods: {
    ...mapActions(['getProduct']),
    setSearch (e) {
      const url = `search=${e.target.value}&`
      this.getProduct(url)
    }
  }
}
</script>

<style scoped>
input[type=text] {
  height: 40px;
  width: 250px;
  border: none;
  outline: none;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
</style>
