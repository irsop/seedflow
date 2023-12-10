<template>
  <div>
    <h1 align="center">Admin form</h1>
    <h2 align="center">Login: {{ adminLogin }}</h2>
    <div style="width: 100%; margin: 0 auto">
      <button style="display: block; margin: 0 auto" @click="logout">Вийти</button>
    </div>
    <hr />
    <hr />
    <h2 align="center">Замовлення</h2>
    <table border="1" cellpadding="10" cellspacing="0" border-collapse="collapse">
      <tr>
        <th>Ім'я клієнта</th>
        <th>Номер клієнта</th>
        <th>Товар</th>
        <th>Кількість</th>
        <th>Сума</th>
        <th>Виконати</th>
      </tr>
      <tr v-if="!orders.length">
        Поки що немає замовлень
      </tr>
      <tr v-for="order of orders" :key="order._key">
        <td>{{ order.customer.name }}</td>
        <td>{{ order.customer.phone }}</td>
        <td>
          <ul>
            <li v-for="product of order.products" :key="product._id">
              {{ product.name }}: {{ financeFormat(product.price, true) }}
            </li>
          </ul>
        </td>
        <td>{{ order.totalCount }}</td>
        <td>{{ financeFormat(order.totalPrice, true) }} грн</td>
        <td style="vertical-align-middle; text-align; width:">
          <button @click="removeOrder(order._id)"
            style="border: none; font-size: 30px; cursor: pointer; background: none">
            ✔️
          </button>
        </td>
      </tr>
    </table>
    <hr />
    <hr />
    <h2 align="center">Seeds Control</h2>
    <table border="1" cellpadding="10" cellspacing="0" border-collapse="collapse">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Sort</th>
        <th>Season</th>
        <th>Big Seeds</th>
        <th>Weight</th>
        <th>Count</th>
        <th>Image</th>
        <th>Actions</th>
      </tr>
      <tr v-for="seed of seeds" :key="seed._id">
        <td>{{ seed._id }}</td>
        <td>{{ seed.name }}</td>
        <td>{{ seed.price }}</td>
        <td>{{ seed.description }}</td>
        <td>{{ seed.sort }}</td>
        <td>{{ seed.season }}</td>
        <td>{{ seed.big_seeds }}</td>
        <td>{{ seed.weight || "-" }}</td>
        <td>{{ seed.count }}</td>
        <td><img :src="image(seed.image)" alt="Image" /></td>
        <td style="vertical-align: middle">
          <button style="margin-right: 8px" @click="remove(seed._id)">X</button>
          <button @click="update(seed._id)">U</button>
        </td>
      </tr>
    </table>
    <h3 align="center">Add seed</h3>
    <div style="display: flex; align-items: start; flex-wrap: wrap">
      <div style="margin: 5px; padding: 10px; display: flex; flex-direction: column">
        <label style="margin-bottom: 10px">Name</label>
        <input v-model="seedForm.seedName" type="text" style="padding: 10px" placeholder="Name" />
      </div>
      <div style="margin: 5px; padding: 10px; display: flex; flex-direction: column">
        <label style="margin-bottom: 10px">Price</label>
        <input v-model="seedForm.price" type="number" style="padding: 10px" placeholder="Price" />
      </div>
      <div style="margin: 5px; padding: 10px; display: flex; flex-direction: column">
        <label style="margin-bottom: 10px">Description</label>
        <textarea v-model="seedForm.description" type="number" style="padding: 10px" rows="2" placeholder="Description" />
      </div>
      <div style="margin: 5px; padding: 10px; display: flex; flex-direction: column">
        <label style="margin-bottom: 10px">Sort</label>
        <select style="padding: 10px" placeholder="Sort" v-model="seedForm.sort">
          <option value="green">Насіння салату</option>
        </select>
      </div>
      <div style="margin: 5px; padding: 10px; display: flex; flex-direction: column">
        <label style="margin-bottom: 10px">Season</label>
        <select v-model="seedForm.season" type="text" style="padding: 10px" placeholder="Season">
          <option value="early">Ранній</option>
          <option value="mid-early">Середньо-ранній</option>
          <option value="mid-ripe">Середньо-стиглий</option>
        </select>
      </div>
      <div style="margin: 5px; padding: 10px; display: flex; flex-direction: column">
        <label style="margin-bottom: 10px">Count / Weight</label>
        <input v-model="seedForm.size" type="number" style="padding: 10px" placeholder="Count / Weight" />
      </div>
      <div style="margin: 5px; padding: 10px; display: flex; flex-direction: column">
        <label style="margin-bottom: 10px">Big Seeds</label>
        <input type="checkbox" v-model="seedForm.bigSeeds" style="padding: 10px" placeholder="Big Seeds" />
      </div>
      <div style="margin: 5px; padding: 10px; display: flex; flex-direction: column">
        <label style="margin-bottom: 10px">Action</label>
        <input type="checkbox" v-model="seedForm.action" style="padding: 10px" placeholder="Action" />
      </div>
      <div style="margin: 5px; padding: 10px; display: flex; flex-direction: column">
        <label style="margin-bottom: 10px">Upload Image</label>
        <input @change="setFile" ref="imageField" type="file" style="padding: 10px" placeholder="Upload Image" />
      </div>
      <div style="
          width: 100%;
          display: block;
          align-self: center;
          justify-content: center;
          margin: 0 10px;
        ">
        <input @click.prevent="submitSeed" type="submit" style="padding: 10px; width: 100%; margin: 0 auto"
          value="Create" />
      </div>
    </div>
    <hr />
    <hr />
  </div>
</template>

<script>
import SeedsService from "@/services/SeedsService";
import ImageMixin from "@/mixins/image-mixin";
import FinanceMixin from "@/mixins/finance-mixin";
import { mapActions, mapGetters } from "vuex";
import OrderService from "@/services/OrderService";

export default {
  name: "AdminView",
  mixins: [ImageMixin, FinanceMixin],
  data() {
    return {
      seedForm: {
        image: {},
        seedName: "",
        description: "",
        action: false,
        price: "0",
        sort: "green",
        season: "early",
        bigSeeds: true,
        size: "0",
      },
      seeds: [],
      orders: [],
    };
  },
  computed: {
    ...mapGetters(["adminLogin"]),
  },
  methods: {
    ...mapActions(["unauth"]),
    async submitSeed() {
      const { result, message } = await SeedsService.create({
        ...this.seedForm,
        weight: this.seedForm.size,
        count: this.seedForm.size,
        size: undefined,
      });
      if (result) {
        this.$refs.imageField.value = null;
        this.seedForm = {
          image: {},
          seedName: "",
          action: false,
          price: "0",
          description: "",
          sort: "carrot",
          season: "late",
          bigSeeds: true,
          size: "0",
        };
        alert(message);
        await this.getPageData();
      } else {
        alert(message);
      }
    },
    setFile() {
      this.seedForm.image = this.$refs.imageField.files[0];
    },
    async getPageData() {
      this.seeds = await SeedsService.all();
      this.orders = await OrderService.get();
    },
    logout() {
      this.unauth();
      this.$router.push("/");
    },
    async removeOrder(id) {
      await OrderService.remove(id);
      this.orders = await OrderService.get();
    },
    async remove(id) {
      if (!confirm("Remove?")) {
        return false;
      }
      await SeedsService.remove(id);
      this.seeds = await SeedsService.all();
    },
    async update(id) {
      if (!confirm("Update from form?")) {
        return false;
      }
      const { result, message } = await SeedsService.update(
        {
          ...this.seedForm,
          weight: this.seedForm.size,
          count: this.seedForm.size,
          size: undefined,
        },
        id
      );
      if (result) {
        this.$refs.imageField.value = null;
        this.seedForm = {
          image: {},
          seedName: "",
          price: "0",
          action: false,
          description: "",
          sort: "carrot",
          season: "late",
          bigSeeds: true,
          size: "0",
        };
        alert(message);
        await this.getPageData();
      } else {
        alert(message);
      }
      this.seeds = await SeedsService.all();
    },
  },
  async mounted() {
    await this.getPageData();
  },
};
</script>

<style scoped>
body {
  margin: 10px;
}

table {
  margin: 0 auto;
}

table img {
  width: 100px;
  height: 100%;
  object-fit: contain;
}
</style>
