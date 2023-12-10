<template>
  <div class="product-item">
    <div class="product-item__image">
      <img v-if="imageUrl" :src="image(imageUrl)" alt="Logo" />
    </div>
    <div class="product-item__buy">
      <p>{{ name }}</p>
      <div class="flex-row" :style="{ color: isInCart ? 'grey' : 'inherit' }">
        <div class="product-item__price">
          {{
            (parseFloat(price) * counter).toLocaleString("uk-UA", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
          грн
        </div>
        <div class="product-item__counter">
          <button @click="decrease">-</button>
          <span>{{ counter }}</span>
          <button @click="increase">+</button>
        </div>
      </div>
      <button v-if="!isInCart" @click="add">Додати в кошик</button>
      <button v-else @click="remove">Видалити з кошика</button>
    </div>
  </div>
</template>

<script>
import imageMixin from "@/mixins/image-mixin";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductView",
  data() {
    return {
      counter: 1,
    };
  },
  mounted() {
    if (this.isInCart) {
      this.counter = this.cart.find((item) => item.id === this.id).count;
    }
  },
  methods: {
    ...mapActions(["addToCart", "removeFromCart"]),
    add() {
      if (parseFloat(this.counter) === 0) {
        return false;
      }
      this.addToCart({
        id: this.id,
        name: this.name,
        price: this.price,
        sort: this.sort,
        season: this.season,
        image: this.imageUrl,
        productCount: this.count,
        description: this.description,
        bigSeeds: this.bigSeeds,
        count: this.counter,
        weight: this.weight,
      });
    },
    remove() {
      this.removeFromCart(this.id);
    },
    increase() {
      if (this.isInCart) {
        return false;
      }
      this.counter++;
    },
    decrease() {
      if (this.counter === 1) {
        return false;
      }
      if (this.isInCart) {
        return false;
      }
      this.counter--;
    },
  },
  computed: {
    ...mapGetters(["cart"]),
    isInCart() {
      return !!this.cart.find((item) => item.id === this.id);
    },
  },
  mixins: [imageMixin],
  props: {
    name: String,
    id: String,
    price: [String, Number],
    description: String,
    sort: String,
    season: String,
    imageUrl: {
      type: String,
      default: "",
    },
    bigSeeds: Boolean,
    weight: {
      type: Number,
      default: 0,
      required: false,
    },
    count: {
      type: Number,
      default: 0,
      required: false,
    },
  },
};
</script>
