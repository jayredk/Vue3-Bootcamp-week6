<template>
  <div class="container">
    <div class="d-flex justify-content-end mb-3">
      <button
      @click="removeAll"
      class="btn btn-outline-danger me-3">清空購物車</button>
    </div>
    <table class="table align-middle table-striped table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">品名</th>
          <th scope="col" style="width: 200px;">數量/單位</th>
          <th scope="col" style="width: 200px;">單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart">
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button
              @click="removeItem(item.id)"
              type="button" class="btn btn-outline-danger btn-sm">x
              </button>
            </td>
            <td>{{ item.product.title}}</td>
            <td>
              <div class="input-group">
                <div class="btn-group me-2" role="group">
                  <button
                  @click="updateCart(item.id, item.product_id, item.qty - 1)"
                  type="button" class="btn btn-outline-danger btn-sm">-
                  </button>
                  <span class="btn border border-dark" style="width: 50px; cursor: auto;">
                    {{ item.qty }}
                  </span>
                  <button
                  @click="updateCart(item.id, item.product_id, item.qty + 1)"
                  type="button" class="btn btn-outline-primary btn-sm">+
                  </button>
                </div>
                <span class="input-group-text bg-transparent border-0">
                </span>
              </div>
            </td>
            <td class="text-end">{{ item.product.price }}</td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td class="text-end" colspan="3">總計</td>
          <td class="text-end">{{ cart.final_total}}  元</td>
        </tr>
      </tfoot>
    </table>
    <div v-if="cart.total !== 0" class="my-5 row justify-content-center">
      <Form v-slot="{ errors }"
      @submit="createOrder"
      class="col-md-6">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
          v-model="form.user.email"
          :class="{'is-invalid': errors['信箱']}"
          id="email" name="信箱" type="email"
          class="form-control" placeholder="請輸入 Email"
          rules="email|required"></Field>
          <Error-Message name="信箱" class="invalid-feedback"></Error-Message>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
          v-model="form.user.name"
          :class="{'is-invalid': errors['姓名']}"
          id="name" name="姓名" type="text"
          class="form-control" placeholder="請輸入姓名"
          rules="required"></Field>
          <Error-Message name="姓名" class="invalid-feedback">
          </Error-Message>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field
          v-model="form.user.tel"
          :class="{'is-invalid': errors['電話']}"
          id="tel" name="電話" type="tel"
          class="form-control" placeholder="請輸入電話"
          rules="numeric|required|min:8|max:10"></Field>
          <Error-Message name="電話" class="invalid-feedback">
          </Error-Message>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
          v-model="form.user.address"
          :class="{'is-invalid': errors['地址']}"
          id="address" name="地址" type="text"
          class="form-control" placeholder="請輸入地址" rules="required"></Field>
          <Error-Message name="地址" class="invalid-feedback">
          </Error-Message>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
          v-model="form.message"
          name="留言" id="message"
          class="form-control" cols="30" rows="10"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </Form>
      </div>
  </div>

  <Loading :active="isLoading"/>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCart(cartId, id, qty) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${cartId}`;
      const data = {
        data: {
          product_id: id,
          qty,
        },
      };
      this.$http.put(url, data)
        .then((res) => {
          if (res.data.success) {
            this.getCart();
            alert(res.data.message);
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.getCart();
            alert(res.data.message);
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeAll() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.getCart();
            alert(res.data.message);
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const data = {
        data: { ...this.form },
      };
      this.$http.post(url, data)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            this.isLoading = false;
            this.$router.push('/product-list');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
