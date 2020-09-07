<template>
  <div class="modal-add">
    <div class="add-item">
      <div class="title-add">Add Items</div>
      <table id="table-add" border="0" cellspacing="0" cellpadding="1">
        <tr>
          <td>Name</td>
          <td><input type="text" v-model="name"></td>
        </tr>
        <tr>
          <td>Image (jpeg/jpg/png)</td>
          <td><input type="file" @change="onFileUpload"></td>
        </tr>
        <tr>
          <td>Price</td>
          <td><input id="price" type="text" v-model="price"></td>
        </tr>
        <tr>
          <td>Category</td>
          <td>
            <select name="category" id="category" v-model="idCategory">
              <option value="0">Category</option>
              <option value="1">Drink</option>
              <option value="2">Dessert</option>
              <option value="3">Main Course</option>
            </select>
          </td>
        </tr>
      </table>
      <div class="button-add">
        <button id="btn-cancel-add" @click="$emit('close-modal')">Cancel</button>
        <Button id="btn-add" @click="addData">Add</Button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Mixins from '../_base/Mixins'

export default {
  name: 'ModalAdd',
  props: ['close-modal', 'get-data'],
  mixins: [Mixins],
  data () {
    return {
    // name: '',
      FILE: null
    // price: '',
    // idCategory: ''
    }
  },
  methods: {
    onFileUpload (event) {
      this.FILE = event.target.files[0]
    },
    addData () {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('image', this.FILE, this.FILE.name)
      formData.append('price', this.price)
      formData.append('idCategory', this.idCategory)
      axios.post(process.env.VUE_APP_PRODUCT_URL, formData)
        .then((res) => {
          this.$swal('Input Success', 'Product Added Successfully', 'success')
          this.$emit('close-modal')
          this.clearData()
          this.$emit('get-data')
        })
        .catch((res) => {
          this.$swal('Error!', 'Product Failed to Add', 'error')
        })
    },
    clearData () {
      this.name = ''
      this.FILE = null
      this.price = ''
      this.idCategory = 0
    }
  }
}
</script>

<style scoped>
.modal-add {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 5;
}
.add-item {
  width: 650px;
  height: 500px;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  margin: 100px auto;
  border-radius: 10px;
}
.title-add {
  padding-top: 30px;
}
#table-add {
  width: 100%;
  height: 50%;
  padding: 20 20px;
}
input[type=text],
#category {
  height: 40px;
  width: 100%;
  border: none;
  border-radius: 7px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
#price {
  width: 70%;
}
#category {
  width: 50%;
  font-size: 20px;
  color: #CECECE;
}
.button-add {
  text-align: right;
  padding: 20px;
}
#btn-cancel-add,
#btn-add {
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 7px;
  font-size: 18px;
  margin-left: 10px;
}
#btn-cancel-add {
  color: white;
  background-color: #F24F8A;
}
#btn-add {
  color: white;
  background-color: #57CAD5;
}
</style>
