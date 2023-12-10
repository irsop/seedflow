import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import SeedsService from '../services/SeedsService';
import AuthService from '@/services/AuthService';
import OrderService from '@/services/OrderService';

Vue.use(Vuex);

const DECREASE_CART_ELEMENT = 'DECREASE_CART_ELEMENT';
const INCREASE_CART_ELEMENT = 'INCREASE_CART_ELEMENT';
const SET_LOGGED_STATE = 'SET_LOGGED_STATE';
const SET_CART = 'SET_CART';
const SET_MORE = 'SET_MORE';
const SET_PRODUCTS = 'SET_PRODUCTS';

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'application_seedflow', // Ім'я ключа у localStorage
      paths: ['auth', 'cart'], // Які властивості стору слід зберігати
    }),
  ],
  state: {
    sliderItems: [],
    products: [],
    cart: [],
    auth: {
      token: '',
      data: {},
      role: '',
    },
  },
  getters: {
    adminLogin(state) {
      return state.auth?.data?.login || '';
    },
    isLogged(state) {
      return !!state.auth.token;
    },
    slides(state) {
      return state.sliderItems;
    },
    products(state) {
      return state.products;
    },
    cart(state) {
      return state.cart;
    },
  },
  mutations: {
    [SET_LOGGED_STATE](state, data) {
      state.auth = data;
    },
    [SET_PRODUCTS](state, data) {
      state.products = data.data;
    },
    [SET_MORE](state, data) {
      state.sliderItems = data;
    },
    [SET_CART](state, data) {
      state.cart = data;
    },
    [DECREASE_CART_ELEMENT](state, id) {
      state.cart.find((item) => item.id == id).count -= 1;
    },
    [INCREASE_CART_ELEMENT](state, id) {
      state.cart.find((item) => item.id == id).count += 1;
    },
  },
  actions: {

    async register({ commit }, { login, password, name, phone }) {
      const data = await AuthService.register(login, name, password, phone);
      commit(SET_LOGGED_STATE, data);
    },
    async login({ commit }, { login, password }) {
      const data = await AuthService.login(login, password);
      commit(SET_LOGGED_STATE, data);
    },
    unauth({ commit }) {
      commit(SET_LOGGED_STATE, {
        token: '',
        data: {},
        role: '',
      });
    },
    async loadMore({ commit }) {
      const result = await SeedsService.getRandom();
      commit(SET_MORE, result.data);
    },
    async addToCart({ state, commit }, data) {
      const duplicate = state.cart.find((item) => item.id === data.id);
      const cart = [...state.cart];
      if (duplicate) {
        return false;
      }
      cart.push(data);
      commit(SET_CART, cart);
    },
    increaseCartProduct({ commit }, id) {
      commit(INCREASE_CART_ELEMENT, id);
    },
    decreaseCartProduct({ commit }, id) {
      commit(DECREASE_CART_ELEMENT, id);
    },
    async makeOrderFromCart(context, products) {
      const response = await OrderService.create(products);
      return response;
    },
    clearCart({ commit }) {
      commit(SET_CART, []);
    },
    async removeFromCart({ state, commit }, id) {
      const exist = state.cart.find((item) => item.id === id);
      let cart = [...state.cart];
      if (!exist) {
        return false;
      }
      cart = cart.filter((item) => item.id !== id);
      commit(SET_CART, cart);
    },
    async loadSeeds({ commit }, { sort, season, size, action }) {
      let result;
      if (action) {
        result = await SeedsService.getAction();
      } else {
        result = await SeedsService.get(sort, season, size);
      }
      commit(SET_PRODUCTS, result);
    },
  },
})
