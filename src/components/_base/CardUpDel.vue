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
      axios.patch(`http://localhost:4000/api/v1/product/${id}`, formData)
        .then((res) => {
          this.$swal('Edit Success', 'Product Successfully Updated', 'success')
          this.$emit('get-data')
        })
        .catch((res) => {
          this.$swal('Error!', 'Product Failed to Update', 'error')
        })
    },
    deleteData (id) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios.delete(process.env.VUE_APP_HISTORY_URL + id)
            .then(res => {
              this.$swal.fire('Delete Success', 'Product Successfully Deleted', 'success')
              this.$emit('get-data')
            })
            .catch((res) => {
              this.$swal('Error!', 'Product Failed to Delete', 'error')
            })
        }
      })
    }
  }
}

</script>

<style scoped>
.card-product {
  height: auto;
  width: auto;
  margin-bottom: 17px;
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
  margin: 30px 20px 0 20px;
}
#img-product {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
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
</style>
