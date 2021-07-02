<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-5 offset-md-1">
        <img
        :src="product.imageUrl"
        :alt="product.title"
        class="img-fluid"
        >
      </div>
      <div class="col-12 col-md-4 offset-md-1">
        <h2 class="h2 mb-3">{{ product.title }}</h2>
        <p class="mb-5">{{ product.content }}</p>
        <p>{{ product.description }}</p>
        <span class="d-block mb-2 fs-5">NT$ {{ product.price }}</span>
        <div class="input-group mb-3 border border-primary rounded">
          <input v-model.number="qty" type="number" min="1" class="form-control" >
          <button
          @click="addCart(product.id, qty)"
          class="btn btn-lg btn-primary">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      qty: 1,
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCart(id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const data = {
        data: {
          product_id: id,
          qty,
        },
      };
      this.$http.post(url, data)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
