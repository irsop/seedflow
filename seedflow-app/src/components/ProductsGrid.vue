<template>
  <div class="products-grid products-margin-top" v-if="sortedItems.length">
    <product-view v-for="product of sortedItems" :id="product._id" :key="product._id" :name="product.name"
      :price="product.price" :sort="product.sort" :season="product.season" :big-seeds="product.big_seeds"
      :weight="product.weight" :description="product.description" :image-url="product.image" :count="product.count" />
  </div>
  <div class="not-found" v-else>Насіння з цим фільтром немає</div>
</template>

<script>
import ProductView from "@/components/ProductView";

export default {
  name: "ProductsGrid",
  props: {
    sortBy: [Number, String],
    products: Array,
  },
  components: {
    ProductView,
  },
  watch: {
    products: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          var elements = document.querySelectorAll(".product-item");
          Array.from(elements).forEach((item) => {
            item.style.border = "2px solid black";
            this.removeDoubleBorders(item);
            const handler = () => {
              item.style.border = "2px solid black";
              this.removeDoubleBorders(item);
            };
            window.removeEventListener("resize", handler);
            window.addEventListener("resize", handler);
          });
        });
      },
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.handler);
  },
  methods: {
    getPositionInFlexContainer(element) {
      var flexContainer = element.parentElement;
      var flexItems = Array.from(flexContainer.children);
      var itemIndex = flexItems.indexOf(element);

      var containerWidth = flexContainer.clientWidth;
      var totalColumns = flexItems.length;
      var columnsPerRow = Math.floor(containerWidth / (flexItems[0].clientWidth || 1));
      var rowIndex = Math.floor(itemIndex / columnsPerRow) + 1;
      var columnIndex = (itemIndex % columnsPerRow) + 1;

      // Враховуємо випадок, коли останній рядок може мати менше стовпців
      if (rowIndex === Math.ceil(totalColumns / columnsPerRow)) {
        columnIndex = itemIndex - columnsPerRow * (rowIndex - 1) + 1;
      }

      return {
        row: rowIndex,
        column: columnIndex,
      };
    },
    removeDoubleBorders(element) {
      if (!element) {
        return false;
      }
      var flexContainer = element?.parentElement;
      if (!flexContainer) {
        return false;
      }
      var flexItems = Array.from(flexContainer.children);
      var itemIndex = flexItems.indexOf(element);

      var containerWidth = flexContainer.clientWidth;
      var columnsPerRow = Math.floor(containerWidth / flexItems[0].clientWidth);

      // Отримати позицію елемента в гнучкому контейнері
      var rowIndex = Math.floor(itemIndex / columnsPerRow);
      var columnIndex = itemIndex % columnsPerRow;

      // Визначити, чи є сусідні елементи на тій же самій стороні
      var hasNeighborAbove = rowIndex > 0 && itemIndex - columnsPerRow >= 0;
      var hasNeighborBelow =
        rowIndex < flexItems.length / columnsPerRow - 1 &&
        itemIndex + columnsPerRow < flexItems.length;
      var hasNeighborOnLeft = columnIndex > 0 && itemIndex - 1 >= 0;
      var hasNeighborOnRight =
        columnIndex < columnsPerRow - 1 && itemIndex + 1 < flexItems.length;

      // Видалити подвійні рамки на тих сторонах, де є сусідні елементи
      if (hasNeighborAbove) {
        element.style.borderTopWidth = "1px";
      }
      if (hasNeighborBelow) {
        element.style.borderBottomWidth = "1px";
      }
      if (hasNeighborOnLeft) {
        element.style.borderLeftWidth = "1px";
      }
      if (hasNeighborOnRight) {
        element.style.borderRightWidth = "1px";
      }
    },
  },
  computed: {
    sortedItems() {
      const products = [...this.products];
      products.sort((a, b) => {
        if (this.sortBy === "1") {
          return Math.random() - 0.5; // Випадкове сортування
        } else if (this.sortBy === "2") {
          return a.name.localeCompare(b.name); // Сортування за іменем (по алфавіту)
        } else if (this.sortBy === "3") {
          return a.price - b.price; // Сортування за ціною (зростанням)
        } else if (this.sortBy === "4") {
          return parseFloat(b.price) - parseFloat(a.price); // Сортування за ціною (спаданням)
        }
      });
      return products;
    },
  },
};
</script>

<style>
.products-margin-top {
  margin-top: 22px;
}

.products-margin-bottom {
  margin-bottom: 22px;
}

.products-grid {
  display: grid;
  justify-content: stretch;
  grid-template-columns: repeat(auto-fit, minmax(270px, 330px));
}

@media (max-width: 800px) {
  .products-grid {
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  }
}

.products-grid .product-item {
  max-width: 100%;
  flex-grow: 1;
  border: 2px solid black;
}

.products-grid .product-item .product-item__image {
  display: flex;
  justify-content: center;
}

.products-grid .product-item .product-item__buy {
  border-top: 2px solid black;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.products-grid .product-item .product-item__buy>p {
  width: 250px;
}

.not-found {
  display: flex;
  height: 100%;
  padding: 20px 0;
  width: 100%;
  text-align: center;
}

.products-grid .product-item .product-item__buy>div {
  align-items: center;
  width: 250px;
  justify-content: space-between;
  margin-top: 10px;
}

.products-grid .product-item .product-item__buy span {
  margin: 0 10px;
}

.products-grid .product-item .product-item__buy>button {
  width: 250px;
}

.product-item .product-item__counter {
  border: 2px solid #d9d9d9;
  margin-left: 10px;
}

.product-item .product-item__counter {
  display: flex;
  align-items: center;
}

.product-item .product-item__counter button {
  font-size: 14px;
  padding: 14px;
  background: transparent;
}

.product-item button {
  transition: background-color 0.2s ease-in-out;
  border: none;
  font-size: 14px;
  font-family: U;
  padding: 10px 30px;
  cursor: pointer;
  background-color: #d9d9d9;
  width: 100%;
}

.product-item button:hover {
  transition: background-color 0.2s ease-in-out;
  background-color: #e9d591;
}

.product-item__counter:hover {
  transition: border-color 0.2s ease-in-out;
  border-color: #e9d591 !important;
}
</style>
