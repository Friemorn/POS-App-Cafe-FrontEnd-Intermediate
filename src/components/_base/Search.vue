<template>
  <div class="search">
    <div class="search-box">
      <input type="text" v-model="name">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data: () => ({
    name: ''
  })
}
</script>

<style scoped>

</style>
