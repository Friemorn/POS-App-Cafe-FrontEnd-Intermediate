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
      <table id="table-checkout-value" border="0" cellspacing="0" cellpadding="1">
        <tr>
          <td>Coffe Latte 1x</td>
          <td class="table-right">Rp. 15.000</td>
        </tr>
        <tr>
          <td>Black Forest 1x</td>
          <td class="table-right">Rp. 30.000</td>
        </tr>
        <tr>
          <td>Salmon Tuffle Teriyaki 1x</td>
          <td class="table-right">Rp. 60.000</td>
        </tr>
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
          <button id="btn-print">Print</button>
        </div>
        <div id="or">Or</div>
        <div><Button id="btn-send-email">Send Email</Button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalCheckout'
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
#table-checkout-value {
    padding: 0px 20px;
    width: 100%;
    height: 50%;
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
