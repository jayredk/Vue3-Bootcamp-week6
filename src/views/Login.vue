<template>
  <div class="vh-100">
    <div class="container h-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-8 col-lg-3">
          <h1 class="mb-5 text-center">後台登入頁面</h1>
          <h2 class="h3 mb-3 text-center font-weight-normal">
            請先登入
          </h2>
          <form id="form" class="form-signin">
            <div class="form-floating mb-3">
              <input type="email" class="form-control"
              id="username" placeholder="name@example.com"
              required autofocus>
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password"
              class="form-control" id="password"
              placeholder="Password" required>
              <label for="password">Password</label>
            </div>
            <button id="loginBtn" class="btn btn-lg btn-primary w-100 mt-3" type="button">
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
