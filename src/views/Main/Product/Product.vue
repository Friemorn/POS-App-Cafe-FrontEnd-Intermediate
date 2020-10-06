<template>
  <div>
    <div class="contain">
    <router-view/>
    <ModalAdd v-show= "showModalAdd" @close-modal = "AddOff" @get-data = "getProduct"/>
    <div class="main">
      <div class="main-header">
        <nav class="navbar">
          <div class="menu">
            <img src="../../../assets/img/menu.png" alt="menu" />
          </div>
          <div class="title">Food Items</div>
          <div class="search" @click="SearchOn">
            <img src="../../../assets/img/magnifying-glass.png" alt="search" />
          </div>
        </nav>
        <SideBar @launch-modaladd = "AddOn"/>
      </div>
      <div class="sort-search">
        <div class="sort"><Sort/></div>
        <div class="search"><Search v-show="showSearch"/></div>
      </div>
      <div class="main-content">
        <div class="card-product">
          <CardUpDel :foods = "products" @get-data = "getProduct"/>
        </div>
      </div>
      <div class="pagination">
        <div class="page">
          <Pagination :data="pagination"/>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import SideBar from '../../../components/_base/SideBar'
import ModalAdd from '../../../components/_base/ModalAdd'
import CardUpDel from '../../../components/_base/CardUpDel'
import Sort from '../../../components/_base/Sort'
import Search from '../../../components/_base/Search'
import Pagination from '../../../components/_base/Pagination'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Product',
  components: {
    SideBar,
    ModalAdd,
    CardUpDel,
    Sort,
    Search,
    Pagination
  },
  data () {
    return {
      showModalAdd: false,
      showSearch: false
    }
  },
  methods: {
    AddOn () {
      this.showModalAdd = true
    },
    AddOff () {
      this.showModalAdd = false
    },
    SearchOn () {
      this.showSearch = !this.showSearch
    },
    ...mapActions(['getProduct'])
  },
  computed: {
    ...mapGetters(['products', 'pagination'])
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style scoped>
  .contain {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: Arial, Verdana, sans-serif;
  font-size: 20px;
  background-color: rgba(190, 195, 202, 0.3);
}
.main-content {
  height: 550px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: center;
  margin: 0 0 0 100px;
}
.navbar{
  width: 100%;
  height: 80px;
  font-size: 25px;
  padding: 20px 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  background-color: white;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
}
.menu {
  margin: 5px 0 0 5px;
  text-align: center;
}
.title {
    flex: 1;
    text-align: right;
}
.search {
    flex: 1;
    text-align: right;
}
.sort-search {
  height: 80px;
  margin: 0 20px -10px 125px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.sort {
  margin-top: 15px;
  text-align: center;
}
.search {
  margin-top: 8px;
  align-items: center;
}
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px 20px 0 165px;
}
</style>
