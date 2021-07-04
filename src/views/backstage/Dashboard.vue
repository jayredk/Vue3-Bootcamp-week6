<template>
  <h1 class="text-center my-5">後台管理頁面</h1>
  <div class="d-flex justify-content-center">
    <button @click="signOut" type="button" class="btn btn-lg btn-danger">登出</button>
  </div>
</template>

<script>
export default {
  methods: {
    checkLogin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        const url = `${process.env.VUE_APP_API}api/user/check`;
        this.$http.post(url)
          .then((res) => {
            if (res.data.success) {
              alert(res.data.message);
            } else {
              this.$router.push('/login');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$router.push('/login');
      }
    },
    signOut() {
      document.cookie = 'hextoken=;expires=';
      alert('已登出');
      this.$router.push('/login');
    },
  },
  created() {
    this.checkLogin();
  },
};
</script>
