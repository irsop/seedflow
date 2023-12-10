<template>
  <body>
    <x-header />
    <div id="page_content">
      <div class="container">
        <h1>Насіння овочів вищого сорту</h1>
        <div class="navigation_filter">
          <x-select field="sort" :value="filterData.sort" @input="filterData.sort = $event"
            :options="[{ value: 'green', title: 'Насіння салату' }]" />

          <x-select :value="sortBy" @input="sortBy = $event" :options="[
            { value: '1', title: 'За популярністю' },
            { value: '2', title: 'За назвою' },
            { value: '3', title: 'Спочатку дешевше' },
            { value: '4', title: 'Спочатку дорожче' },
          ]" />

          <x-select :value="filterData.season" @input="filterData.season = $event" :options="seasonsList" />

          <x-select :value="filterData.size" @input="filterData.size = $event" :options="sizesList" />
        </div>
      </div>

      <div class="container">
        <products-grid :products="products" :sort-by="sortBy" />
        <small>* Щоб бачити більше товарів змініть параметри пошуку</small>
      </div>

      <div class="container">
        <h2>Також можете переглянути</h2>
      </div>

      <div class="container" v-if="slides.length">
        <div class="glide">
          <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
              <li class="glide__slide" v-for="slide of slides" :key="slide._id">
                <div class="slide-item">
                  <div class="slide-image">
                    <img v-if="slide.image" :src="image(slide.image)" alt="Slide" />
                  </div>
                  <div class="slide-name">{{ slide.name }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <x-footer />
  </body>
</template>

<script>
import XHeader from "@/components/XHeader";
import XFooter from "@/components/XFooter";
import XSelect from "@/components/XSelect";
import ProductsGrid from "@/components/ProductsGrid.vue";
import { mapActions, mapGetters } from "vuex";
import ImageMixin from "@/mixins/image-mixin";
import {
  ALL_SEASONS,
  ICONS_DEFINE,
  SEASONS_TITLES,
  FILTERED_SEASONS,
  COUNTS,
  WEIGHTS,
  SIZES_TYPES,
} from "./../constants";

export default {
  name: "MainPage",
  mixins: [ImageMixin],
  data() {
    return {
      sortBy: "1",
      filterData: {
        sort: "green",
        season: "early",
        size: "3",
      },
      timer: false,
    };
  },
  async created() {
    this.loadSeeds(this.filterData);
    await this.loadMore();
    this.$nextTick(() => {
      if (!document.querySelector(".glide")) {
        return false;
      }
      new window.Glide(".glide", {
        type: "carousel", // Тип слайдера
        startAt: 0, // Починаємо з першого слайда (індекс 0)
        perView: 4, // Кількість видимих елементів одночасно
        focusAt: "center", // Ставимо фокус на центральний елемент
        clones: true,
        gap: 20, // Відстань між слайдами
        breakpoints: {
          768: {
            perView: 2, // Змінюємо кількість видимих елементів для екранів шириною менше 768px
          },
          500: {
            perView: 1,
          },
        },
      }).mount();
    });
  },
  components: {
    XHeader,
    XFooter,
    ProductsGrid,
    XSelect,
  },
  computed: {
    ...mapGetters(["products", "slides"]),
    weights() {
      return WEIGHTS;
    },
    counts() {
      return COUNTS;
    },
    sizesList() {
      const type = SIZES_TYPES[this.filterData.sort][this.filterData.season];
      if (type === "weight") {
        return this.weights;
      } else if (type === "count") {
        return this.counts;
      }
      return [];
    },
    seasons() {
      return ALL_SEASONS.map((item) => ({ value: item, icon: ICONS_DEFINE[item] }));
    },
    seasonsList() {
      if (!FILTERED_SEASONS[this.filterData.sort]) {
        return [];
      }
      return this.seasons
        .filter((item) => FILTERED_SEASONS[this.filterData.sort].includes(item.value))
        .map((item) => ({
          ...item,
          title: SEASONS_TITLES[item.value],
          data: { icon: item.icon },
        }));
    },
  },
  watch: {
    filterData: {
      deep: true,
      handler(newValue) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.loadSeeds(newValue).then(() => {
            this.timer = null;
          });
        }, 500);
      },
    },
  },
  methods: {
    ...mapActions(["loadSeeds", "loadMore"]),
  },
};
</script>

<style>
#page_content {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 16px;
}

.navigation_filter {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.navigation_filter .filter_item {
  border: none;
  cursor: pointer;
  justify-content: space-between;
  display: flex;
  font-size: 16px;
  padding: 10px 28px;
  line-height: auto;
  align-items: center;
  border-radius: 20px;
  background-color: #d9d9d9;
}

.navigation_filter .filter_item i {
  font-size: 28px;
  margin-left: 8px;
}

.slide-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slide-item img {
  width: 231px;
  height: 321px;
  object-fit: contain;
}

.slide-item .slide-name {
  margin-top: 16px;
}

small {
  display: flex;
  margin-top: 20px;
}

.glide {
  margin-bottom: 80px;
}
</style>
