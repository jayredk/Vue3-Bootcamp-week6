<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-lg-5 offset-lg-1 mb-4 mb-lg-0">
        <img
        :src="product.imageUrl"
        :alt="product.title"
        class="img-fluid"
        >
      </div>
      <div class="col-md-6 col-lg-5 col-xxl-4 offset-lg-1">
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
  <Loading :active="isLoading"/>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      qty: 1,
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.product = res.data.product;
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCart(id, qty = 1) {
      this.isLoading = true;
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
            this.isLoading = false;
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
