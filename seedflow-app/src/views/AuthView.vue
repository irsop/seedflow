<template>
  <div class="centered">
    <div class="auth-form-block">
      <div class="header__logo">
        <router-link to="/">
          <span>Seedflow</span>
          <i class="ri-seedling-fill"></i>
        </router-link>
      </div>
      <div class="auth-text">
        Станьте архітектором свого смачного світу - реєструйтесь, і найкращі врожаї
        почнуться вже з першого кліку
      </div>
      <div class="buttons">
        <button @click="goToLogin" class="grey">Увійти</button>
        <button @click="goToRegister" class="yellow">Реєстрація</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AuthView",
  created() {
    if (this.$route.query.logout) {
      this.unauth();
    }
  },
  methods: {
    ...mapActions(["unauth"]),
    goToLogin() {
      this.$router.push("/login");
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
.centered {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.auth-form-block {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 40px;
  border: 2px solid black;
}

.auth-form-block .header__logo a {
  text-decoration: none;
  display: flex;
  align-items: flex-end;
}

.auth-form-block .header__logo span {
  color: black;
  font-weight: 400;
  line-height: auto;
  font-size: 24px;
}

.auth-form-block .header__logo i {
  font-size: 35px;
  color: black;
}

.buttons {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.buttons button {
  font-size: 16px;
  font-family: U;
  border: none;
  cursor: pointer;
  width: 260px;
  padding: 10px;
  width: 100%;
}

.buttons button.grey {
  background-color: #d9d9d9;
}

.buttons button.yellow {
  background-color: #e9d591;
}

.auth-text {
  font-size: 14px;
  max-width: 367px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
}
</style>
