<template>
  <div class="modal-checkout">
    <div class="checkout">
      <table id="table-checkout-header" border="0" cellspacing="0" cellpadding="5">
        <tr>
          <td>Checkout</td>
          <td class="table-right">Receipt no : #010410919</td>
        </tr>
        <tr>
          <td class="cahier" colspan="2">Cashier : Pevita Pearce</td>
        </tr>
      </table>
      <div class="container-table">
        <table id="table-checkout-value" border="0" cellspacing="0" cellpadding="1">
          <tr v-for="item in cart" :key="item.id">
            <td>{{item.name}} {{item.quantity}}x</td>
            <td class="table-right">Rp. {{item.price}}</td>
          </tr>
        </table>
      </div>
      <table id="table-checkout-total" border="0" cellspacing="0" cellpadding="1">
        <tr>
          <td>Ppn 10%</td>
          <td class="table-right">Rp. 10.500</td>
        </tr>
        <tr>
          <td class="table-right" colspan="2">Total : Rp. 115.500</td>
        </tr>
        <tr>
          <td colspan="2">Payment : Cash</td>
        </tr>
      </table>
      <div class="button-checkout">
        <div>
          <button id="btn-print" @click="$emit('close-modal')">Print</button>
        </div>
        <div id="or">Or</div>
        <div><Button id="btn-send-email">Send Email</Button></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'ModalCheckout',
  props: ['close-modal'],
  data () {
    return {
      invoices: '#10930',
      cashier: 1,
      cashierName: 'Pevita Pearce',
      orders: '',
      amount: null
    }
  },
  methods: {
    addHistory () {
      axios.post('http://localhost:4000/api/v1/history', {
        invoices: this.invoices,
        cashier: this.cashier,
        cashierName: this.cashierName,
        orders: this.orders,
        amount: this.amount
      })
        .then((res) => {
          alert('Orders Added')
          this.$emit('close-modal')
        })
        .catch((res) => {
        })
    }
  },
  computed: {
    ...mapGetters(['countCart', 'cart', 'total'])
  }
}
</script>

<style scoped>
.modal-checkout {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    z-index: 5;
}
.checkout {
    width: 550px;
    height: 600px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    margin: 50px auto;
    border-radius: 10px;
}
#table-checkout-header {
    padding: 20px;
    width: 100%;
}
.container-table {
  overflow-x: auto;
  height: 150px;
}
#table-checkout-value {
    padding: 0px 20px;
    width: 100%;
    overflow-y: auto;
}
#table-checkout-total {
    width: 100%;
    height: 50px;
}
.table-right {
    text-align: right;
}
.button-checkout {
    padding: 20px;
}
.cashier {
    font-weight: 550;
    font-size: 15px;
}
#btn-print,
#btn-send-email {
    color: white;
    border: none;
    border-radius: 7px;
    width: 100%;
    height: 50px;
    font-size: 18px;
}
#btn-print {
    background-color: #F24F8A;
}
#btn-send-email {
    background-color: #57CAD5;
}
#or {
    margin: 5px 0;
    text-align: center;
}
</style>
