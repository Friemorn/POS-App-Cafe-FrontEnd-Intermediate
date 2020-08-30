<template>
    <nav>
    <div class="navbar">
      <img class="menu" src="../../assets/img/menu.png" alt="menu" />
    </div>
    <div class="title">History</div>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
nav{
  width: 100%;
  height: 80px;
  font-size: 25px;
  padding: 20px 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  background-color: white;
}
.navbar:hover {
  background-color: rgba(207, 207, 207, 0.6);
  border-radius: 5px;
  text-align: center;
}
.menu {
    flex: 1;
    margin: -10px 0 0 -10px;
}
.title {
    width: 95%;
    text-align: center;
}
</style>
