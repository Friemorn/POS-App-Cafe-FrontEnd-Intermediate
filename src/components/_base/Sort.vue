<template>
  <select name="category" id="category" @change="setSort">
    <option value="selected">Sort By</option>
    <option value="name">Name</option>
    <option value="categoryName">Category</option>
    <option value="price">Price</option>
    <option value="createdAt">Newest</option>
  </select>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Sort',
  methods: {
    ...mapActions(['getProduct']),
    setSort (e) {
      const url = `sort=${e.target.value}&`
      this.getProduct(url)
    }
  }
}
</script>

<style scoped>
#category {
  height: 40px;
  width: 100%;
  padding-left: 20px;
  border: none;
  border-radius: 7px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
</style>
