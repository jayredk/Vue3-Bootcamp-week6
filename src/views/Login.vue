<template>
  <div class="vh-100">
    <div class="container h-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-8 col-lg-3">
          <h1 class="mb-5 text-center">後台登入頁面</h1>
          <h2 class="h3 mb-3 text-center font-weight-normal">
            請先登入
          </h2>
          <form @submit.prevent="login" id="form" class="form-signin">
            <div class="form-floating mb-3">
              <input
              v-model="user.username"
              type="email" class="form-control"
              id="username" placeholder="name@example.com"
              required autofocus>
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password"
              v-model="user.password"
              class="form-control" id="password"
              placeholder="Password" required>
              <label for="password">Password</label>
            </div>
            <button id="loginBtn" class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </form>
          <p class="mt-3 mb-3 text-center text-muted">
          &copy; 2021~∞ - 六角學院
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(url, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hextoken=${token}, expires=${new Date(expired)}`;
            alert(res.data.message);
            this.$router.push('/dashboard');
          } else {
            alert(res.data.message);
            this.user.username = '';
            this.user.password = '';
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
