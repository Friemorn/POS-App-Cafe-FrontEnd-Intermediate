<template>
  <div class="card-up-del">
    <div class="card-product" v-for="item in foods" :key="item.id">
    <div class="card-image">
      <img id="img-product" :src="item.image" alt="img-product" />
    </div>
    <div class="card-box">
      <table id="table-UpDel" border="0" cellspacing="0" cellpadding="8">
          <tr>
            <td>Product Name : </td>
            <td><input type="text" class="input-name" v-model="item.name"></td>
          </tr>
        <tr>
          <td>Image : </td>
          <td><input ref="image" type="file" @change="onFileUpload"></td>
        </tr>
        <tr>
          <td>Price : </td>
          <td><input type="text" class="input-price" v-model="item.price"></td>
        </tr>
        <tr>
          <td>Category</td>
          <td>
            <select name="category" class="input-category" v-model="item.idCategory">
              <option value="0">Category</option>
              <option value="1">Drink</option>
              <option value="2">Dessert</option>
              <option value="3">Main Course</option>
            </select>
          </td>
        </tr>
      </table>
    </div>
    <div class="button-UpDel">
      <button id="btn-update" @click="updateData (item.id, item)">Update</button>
      <Button id="btn-delete" @click="deleteData (item.id)">Delete</Button>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CardUpDel',
  props: ['foods', 'get-data'],
  data () {
    return {
      FILE: null
    }
  },
  methods: {
    onFileUpload (event) {
      this.FILE = event.target.files[0]
    },
    updateData (id, item) {
      const formData = new FormData()
      formData.append('name', item.name)
      formData.append('image', this.FILE, this.FILE.name)
      formData.append('price', item.price)
      formData.append('idCategory', item.idCategory)
      axios.patch(process.env.VUE_APP_PRODUCT_URL + id, formData)
        .then((res) => {
          alert('Product Successfully Updated')
          this.$emit('get-data')
        })
        .catch((res) => {
          alert('Product Failed to Update')
        })
    },
    deleteData (id) {
      axios.delete(process.env.VUE_APP_PRODUCT_URL + id)
        .then(res => {
          alert('Product Successfully Deleted')
          this.$emit('get-data')
        })
        .catch((res) => {
          alert('Product Failed to Delete')
        })
    }
  }
}

</script>

<style scoped>
.card-product {
  height: auto;
  width: auto;
  margin: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}
.card-image {
  height: 200px;
  width: 250px;
  margin: 20px;
}
.card-box {
  margin: 20px;
}
#table-UpDel {
  font-weight: 555;
}
input[type=text],
.input-category {
  height: 40px;
  width: 100%;
  border: none;
  border-radius: 7px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.button-UpDel {
  text-align: right;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#btn-delete,
#btn-update {
  height: 60px;
  width: 100px;
  border: none;
  border-radius: 7px;
  font-size: 18px;
  margin-left: 10px;
}
#btn-delete {
  color: white;
  background-color: #F24F8A;
}
#btn-update {
  color: white;
  background-color: #57CAD5;
}
#img-product {
  height: 200px;
  width: 250px;
}
</style>
