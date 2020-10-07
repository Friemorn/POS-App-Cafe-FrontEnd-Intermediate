<template>
  <div class="modal-checkout" ref="checkout">
    <div class="checkout">
      <div class="data-checkout">
        <table id="table-checkout-header" border="0" cellspacing="0" cellpadding="5">
          <tr>
            <td>Checkout</td>
            <td class="table-right">No. Invoices : #{{invoices ()}} </td>
          </tr>
          <tr>
            <td class="cahier" colspan="2">Cashier : Pevita Pearce</td>
          </tr>
        </table>
        <div class="container-table">
          <table id="table-checkout-value" border="0" cellspacing="0" cellpadding="1">
            <tr v-for="item in cart" :key="item.id">
              <td>{{item.name}} {{item.quantity}}x</td>
              <td class="table-right">Rp. {{item.price * item.quantity}}</td>
            </tr>
          </table>
        </div>
        <table id="table-checkout-total" border="0" cellspacing="0" cellpadding="1">
          <tr>
            <td>Ppn 10%</td>
            <td class="table-right">Rp. {{ppn()}}</td>
          </tr>
          <tr>
            <td class="table-right" colspan="2">Total : Rp. {{totalPrice()}}</td>
          </tr>
          <tr>
            <td colspan="2">Payment : Cash</td>
          </tr>
        </table>
      </div>
      <!-- Print Page with Inline CSS -->
      <div id="print">
        <div class="header" style="text-align: center; padding: 20px; background-color: #57CAD5; color: white;">UFOCAFE</div>
        <table border="0" cellspacing="5" cellpadding="10" style="width: 100%">
          <tr>
            <td colspan="2" style="font-weight: 600;">No. Invoices: #{{invoices ()}}</td>
          </tr>
          <tr v-for="item in cart" :key="item.id">
            <td style="border-bottom: 1px solid gray;">{{item.name}} {{item.quantity}}x</td>
            <td class="table-right" style="border-bottom: 1px solid gray;">Rp. {{item.price * item.quantity}}</td>
          </tr>
          <tr>
          <tr>
            <td style="background-color: gray; color: white;">Total</td>
            <td style="background-color: gray; color: white; font-size: 20px">Rp. {{totalPrice()}}</td>
          </tr>
        </table>
      </div>
      <div class="button-checkout">
        <div>
          <button id="btn-print" @click="checkOutPrint">Print</button>
        </div>
        <div id="or">Or</div>
        <div><Button id="btn-send-email" @click="checkOutEmail">Send Email</Button></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ModalCheckout',
  props: ['close-modal'],
  methods: {
    totalPrice () {
      return this.cart.reduce((a, b) => a + b.quantity * 11 / 10 * b.price, 0)
    },
    ppn () {
      return this.cart.reduce((a, b) => a + b.quantity * 1 / 10 * b.price, 0)
    },
    totalOrder () {
      return this.cart.map(({ name }) => name).join(', ')
    },
    invoices () {
      return moment().format('L').split('/').reverse().join('') + Math.floor((Math.random() * 100) + 1)
    },
    addHistory () {
      axios.post(process.env.VUE_APP_HISTORY_URL, {
        invoices: this.invoices(),
        cashier: 1,
        cashierName: 'Pevita Pearce',
        orders: this.totalOrder(),
        amount: this.totalPrice()
      })
        .then((res) => {
          console.log('success')
        })
        .catch((res) => {
          console.log('error')
        })
    },
    sendEmail () {
      axios.post(process.env.VUE_APP_EMAIL_URL, {
        to: this.user.email,
        subject: 'UFOCAFE ORDERS',
        order: {
          invoices: '#' + this.invoices(),
          name: this.user.firstName,
          orders: this.totalOrder(),
          amount: this.totalPrice()
        }
      })
        .then((res) => {
          console.log('success')
        })
        .catch((res) => {
          console.log('error')
        })
    },
    print () {
      this.$htmlToPaper('print')
    },
    checkOutPrint () {
      this.$swal('Order Success', 'Order is Success', 'success')
      this.$emit('close-modal')
      this.addHistory()
      this.print()
      this.setEmptyCart()
    },
    checkOutEmail () {
      this.$swal('Order Success', 'Order is Success', 'success')
      this.$emit('close-modal')
      this.addHistory()
      this.sendEmail()
      this.setEmptyCart()
    }
  },
  computed: {
    ...mapMutations(['setEmptyCart']),
    ...mapGetters(['countCart', 'cart', 'total', 'user'])
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
#print {
  display: none;
}
.header {
  font-size: 40px;
}
</style>
