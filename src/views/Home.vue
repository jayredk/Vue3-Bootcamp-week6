<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Navbar</router-link>>
      <button class="navbar-toggler" type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/product-list"
          class="nav-link">前台產品列表</router-link>
          <router-link to="/cart"
          class="nav-link">前台購物車</router-link>
          <router-link to="/login"
          class="nav-link">後台登入</router-link>
        </div>
      </div>
    </div>
  </nav>
  <h1 class="text-center mt-3 mb-5">歡迎來到前台</h1>
  <router-view></router-view>
</template>

<script>
// @ is an alias to /src

export default {
};
</script>
