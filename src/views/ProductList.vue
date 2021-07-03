<template>
  <div class="container">
    <ul class="row align-items-md-stretch">
      <li v-for="item in products" :key="item.id" class="col-md-6 col-lg-4 mb-5 list-unstyled">
        <div class="card h-100">
          <a @click.prevent="goProductPage(item.id)"
          href="#">
          <img :src="item.imageUrl" class="card-img-top" :alt="item.title">
          </a>
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="mb-4">
              <a href="#"
              class="text-dark text-decoration-none">
                <h5 class="card-title">{{ item.title }}</h5>
              </a>
              <p class="card-text">
                {{ item.content }}
              </p>
            </div>
            <div class="d-flex justify-content-around">
              <button
              @click="addCart(item.id)"
              href="#" class="btn btn-lg btn-primary">加入購物車</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <Pagination :pages="pagination" @change-page="getProducts" class="justify-content-center"/>
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getProducts(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goProductPage(id) {
      this.$router.push(`/product-list/${id}`);
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
    this.getProducts();
  },
};
</script>
