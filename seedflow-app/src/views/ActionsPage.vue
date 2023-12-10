<template>
	<body>
		<x-header />
		<div id="page">
			<section>
				<div class="container">
					<h1>Акції</h1>
				</div>
			</section>
			<section class="action-alert">
				З 27. 10. 2023 по 09. 11. 2023 діє знижка - 50 % на всі сорти томатів
			</section>
			<section>
				<div class="container">
					<products-grid :products="products" sort-by="1" />
				</div>
			</section>
		</div>
		<x-footer />
	</body>
</template>

<script>
import XHeader from "@/components/XHeader";
import XFooter from "@/components/XFooter";
import ProductsGrid from "@/components/ProductsGrid";
import { mapActions, mapGetters } from "vuex";

export default {
	name: "ActionsPage",
	components: {
		XHeader,
		XFooter,
		ProductsGrid,
	},
	computed: {
		...mapGetters(["products"]),
	},
	methods: {
		...mapActions(["loadSeeds"]),
	},
	created() {
		this.loadSeeds({ action: true });
	},
};
</script>

<style scoped>
.products-grid {
	width: 100%;
	margin-bottom: 20px;
}

#page {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	width: 100%;
}

.action-alert {
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color: #e9d591;
}

.grid img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.grid #left_image {
	grid-area: left_image;
}

.grid #right_first_image {
	grid-area: right_first_image;
	border-bottom: none;
}

.grid #right_second_image {
	grid-area: right_second_image;
}

h1 {
	width: 100%;
	font-size: 24px;
	font-weight: 400;
	font-family: U;
	margin-top: 80px;
	margin-bottom: 40px;
}

.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 95%;
	max-width: 1360px;
}

section {
	width: 100%;
	align-items: center;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
</style>
