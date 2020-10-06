<template>
  <div class="contain">
    <router-view/>
    <ModalAdd v-show= "showModalAdd" @close-modal = "AddOff" @get-data = "getProduct"/>
    <ModalCheckout v-show= "showModalCheckout" @close-modal = "CheckoutOff"/>
    <div class="main">
      <div class="main-header">
        <nav class="navbar">
          <div class="menu" @click="SideBarOn">
            <img src="../../../assets/img/menu.png" alt="menu" />
          </div>
          <div class="title">Food Items</div>
          <div class="btn-search" @click="SearchOn">
            <img src="../../../assets/img/magnifying-glass.png" alt="search" />
          </div>
        </nav>
        <SideBar v-show="showSideBar" @launch-modaladd = "AddOn"/>
        <div class="sort-search">
          <div class="sort"><Sort/></div>
          <div class="search"><Search v-show="showSearch"/></div>
        </div>
      </div>
      <div class="main-content">
        <div class="card-product" v-for="product in products" :key="product.id">
          <CardAdd :active="checkProductActive(product.id)" :image="product.image" :name="product.name" :price="product.price" :id="product.id"/>
        </div>
      </div>
      <div class="pagination">
        <div class="page">
          <Pagination :data="pagination"/>
        </div>
      </div>
    </div>
    <div class="cart">
      <div class="cart-header">
        <nav class="navbar-cart">
          <span>Cart</span>
          <span class="cart-n" for="n">{{countCart}}</span>
        </nav>
      </div>
      <div class="cart-content">
        <div v-if="countCart === 0">
          <div class="cart-null">
            <img src="../../../assets/img/food-and-restaurant.png" alt="food-cart">
            <br>
            <div class="cart-empty">Your cart is empty</div>
            <div class="cart-add">Please add some items from the menu</div>
          </div>
        </div>
        <div v-else>
          <div class="cart-value">
              <CartList/>
          </div>
          <div class="cart-total">
            <CartTotal @launch-modalcheckout = "CheckoutOn"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../../../components/_base/SideBar'
import CardAdd from '../../../components/_base/CardAdd'
import ModalAdd from '../../../components/_base/ModalAdd'
import ModalCheckout from '../../../components/_base/ModalCheckout'
import CartList from '../../../components/_base/CartList'
import CartTotal from '../../../components/_base/CartTotal'
import Pagination from '../../../components/_base/Pagination'
import Sort from '../../../components/_base/Sort'
import Search from '../../../components/_base/Search'
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    SideBar,
    CardAdd,
    ModalAdd,
    ModalCheckout,
    CartList,
    CartTotal,
    Pagination,
    Sort,
    Search
  },
  data () {
    return {
      username: '',
      password: '',
      showSideBar: true,
      showModalAdd: false,
      showModalCheckout: false,
      showSearch: false
    }
  },
  methods: {
    handleLogin () {
      const data = {
        username: this.username,
        password: this.password
      }
      this.login(data)
    },
    AddOn () {
      this.showModalAdd = true
    },
    AddOff () {
      this.showModalAdd = false
    },
    CheckoutOn () {
      this.showModalCheckout = true
    },
    CheckoutOff () {
      this.showModalCheckout = false
    },
    SideBarOn () {
      this.showSideBar = !this.showSideBar
    },
    SearchOn () {
      this.showSearch = !this.showSearch
    },
    checkProductActive (id) {
      return this.cart.find(item => {
        return item.id === id
      })
    },
    ...mapMutations(['addToCart']),
    ...mapActions(['login', 'getProduct'])
  },
  computed: {
    ...mapGetters(['cart', 'countCart', 'products', 'pagination'])
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style scoped>
/* Home Container */
.contain {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: Arial, Verdana, sans-serif;
  font-size: 20px;
  background-color: rgba(190, 195, 202, 0.3)
}
/* Main */
.main {
    flex: 2;
}
.content {
  display: flex;
  flex-direction: row;
  width: 30px;
}
.main-content {
  height: 550px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: auto;
  margin: 0 20px 0 100px;
  padding-top: 10px;
}
.navbar {
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
.menu:hover {
  background-color: rgba(207, 207, 207, 0.6);
  border-radius: 5px;
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
  margin: 15px 20px 0 125px;
}
.menu {
  margin: 5px 0 0 5px;
  text-align: center;
}
.title {
    flex: 1;
    text-align: right;
}
.btn-search {
    flex: 1;
    text-align: right;
}
/* Cart */
.cart {
    flex: 1;
    background-color: white;
    border-left: 1px solid rgba(141, 141, 141, 0.3);
    box-shadow: 0px -2px 7px rgba(0, 0, 0, 0.1);
}
.cart-content {
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.navbar-cart {
    width: 100%;
    height: 80px;
    font-size: 25px;
    padding: 20px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 5px 0px rgba(0, 0, 0, 0.2);
}
.cart-n {
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    color: white;
    background-color: #57CAD5;
    border-radius: 50%;
}
.cart-null {
  flex: 1;
  height: 200px;
  padding-top: 30px;
  margin: 30px 20px 30px 20px;
  text-align: center;
}
.cart-value {
  width: 400px;
  height: 380px;
  overflow: auto;
}
.cart-total {
  flex: 1;
  height: 250px;
}
.cart-empty {
    color: black;
    font-weight: 650;
}
.cart-add {
    color: #cecece;
    font-weight: 500;
}
</style>
