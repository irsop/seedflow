<template>
  <!-- Header block -->
  <header class="header">
    <div class="header__logo">
      <router-link to="/">
        <span>Seedflow</span>
        <i class="ri-seedling-fill"></i>
      </router-link>
    </div>
    <div class="flex-row mobile-hide">
      <ul class="header__menu">
        <li v-for="(item, key) in mobileItems" :key="key" @click="openedMenu = false">
          <router-link :to="`/${key}`">{{ item }}</router-link>
        </li>
      </ul>
      <ul class="header__actions">
        <li class="header__cart icon">
          <router-link to="/cart">
            <i class="ri-shopping-bag-2-fill"></i>
            <span class="cart-length">{{ cartProductsCount }}</span>
          </router-link>
        </li>
        <li class="header__auth icon">
          <router-link :to="authPath">
            <i :class="authIcon"></i>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="desktop-hide mobile_menu">
      <div class="cursor-pointer mobile_menu__burger" @click="openedMenu = !openedMenu">
        <i v-if="!openedMenu" class="ri-menu-line"></i>
        <i v-else class="ri-close-line"></i>
      </div>
      <div :class="containerClasses">
        <ul class="header__menu">
          <li v-for="(item, key) in menuItems" :key="key" @click="openedMenu = false">
            <router-link :to="`/${key}`">{{ item }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "XHeader",
  data() {
    return {
      openedMenu: false,
      menuItems: {
        about: "Про нас",
        advice: "Поради",
        actions: "Акції",
        cart: "Кошик",
        auth: "Авторизація",
      },
      mobileItems: {
        about: "Про нас",
        advice: "Поради",
        actions: "Акції",
      },
    };
  },
  computed: {
    ...mapGetters(["isLogged", "cart"]),
    cartProductsCount() {
      return this.cart.length;
    },
    authPath() {
      return !this.isLogged ? "/auth" : "/auth/logout";
    },
    authIcon() {
      return `ri-${this.isLogged ? "logout" : "login"}-box-fill`;
    },
    containerClasses() {
      return {
        mobile_menu__container: true,
        hidden: !this.openedMenu,
      };
    },
  },
};
</script>

<style>
.header {
  width: calc(100% - 32px);
  display: flex;
  margin: 0 auto;
  max-width: 1360px;
  padding: 0 16px;
  margin-top: 16px;
  align-items: center;
  justify-content: space-between;
}

.cart-length {
  font-size: 12px;
  position: absolute;
  right: -1px;
  bottom: -2px;
  z-index: 50;
  background: #e9d591;
  display: flex;
  height: 10px;
  width: 10px;
  padding: 4px;
  border-radius: 50%;
  justify-content: center;
  color: black;
  align-items: center;
}

.header li {
  position: relative;
  cursor: pointer;
}

/* Header Logo */
.header .header__logo a {
  text-decoration: none;
  display: flex;
  align-items: flex-end;
}

.header .header__logo span {
  color: black;
  font-weight: 400;
  line-height: auto;
  font-size: 24px;
}

.header .header__logo i {
  font-size: 35px;
  color: black;
}

/* Header Logo */

/* Header Menu */
.header .header__menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  margin-right: 86px;
}

/* Header Menu */

/* Header Actions */
.header__actions {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.header .header__menu li {
  list-style: none;
  margin-left: 48px;
}

.header .header__actions .icon {
  margin-left: 16px;
}

.header .header__actions .icon i {
  font-size: 35px;
}

/* Header Actions */
/* Moble adaptive */
.mobile_menu {
  position: relative;
}

.mobile_menu .mobile_menu__container {
  z-index: 99;
  background-color: white;
  position: fixed;
  width: 100%;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
}

.mobile_menu .mobile_menu__burger i {
  font-size: 35px;
}

.mobile_menu .header__menu {
  flex-direction: column;
  margin-right: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  box-shadow: 3px 5px 10px -4px rgba(0, 0, 0, 0.23);
}

.mobile_menu .header__menu li {
  margin-left: 0;
  padding: 8px;
}
</style>
