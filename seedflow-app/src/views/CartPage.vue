<template>
	<body>
		<x-header />
		<div class="cart">
			<div class="cart-container">
				<div class="cart-head">
					<div class="row title align-center">
						<span>Моя корзина</span>
						<p>{{ cartLength || 0 }} {{ cartLength === 1 ? "товар" : "товарів" }}</p>
					</div>
					<div class="row total align-center">
						<p>Всього</p>
						<span>{{ total || "0,00" }}</span>
					</div>
				</div>
				<div class="empty" v-if="cartLength === 0">Немає товарів</div>
				<div class="cart-products" v-else>
					<div class="cart-product" v-for="product of cart" :key="product.id">
						<div class="image-part">
							<img :src="image(product.image)" alt="Image" />
						</div>
						<div class="info-part">
							<div class="info-row">
								<div class="product-descriptions">
									<h5>{{ product.name }}</h5>
									<span>{{ product.productCount }}</span>
									<p>{{ product.description }}</p>
								</div>
								<div class="product-counts">
									<span>Кількість</span>
									<div class="counter">
										<a href="javascript:void(0)" @click="decrease(product.id)">-</a>
										<p>{{ product.count }}</p>
										<a href="javascript:void(0)" @click="increase(product.id)">+</a>
									</div>
								</div>
								<div class="product-season">
									<div v-html="title(product.season)"></div>
								</div>
								<div class="product-price">
									{{ financeFormat(product.price) }} x {{ financeFormat(product.count)
									}}<br />=<br />{{ financeFormat(product.price * product.count, true) }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cart-footer">
					<div class="row continue">
						<router-link to="/">Продовжити покупки</router-link>
					</div>
					<div class="row order" v-if="cartLength > 0">
						<button @click="makeOrder">Оформити замовлення</button>
					</div>
				</div>
			</div>
		</div>
	</body>
</template>

<script>
import XHeader from "@/components/XHeader";
import imageMixin from "@/mixins/image-mixin";
import financeMixin from "@/mixins/finance-mixin";
import { mapGetters, mapActions } from "vuex";
import { SEASONS_TITLES } from "@/constants";

export default {
	name: "CartPage",
	mixins: [imageMixin, financeMixin],
	components: {
		XHeader,
	},
	computed: {
		...mapGetters(["cart"]),
		total() {
			return this.cart
				.reduce((accumulator, currentItem) => {
					return (
						accumulator + parseFloat(currentItem.price) * parseFloat(currentItem.count)
					);
				}, 0)
				.toLocaleString("ua-UK", {
					style: "currency",
					currency: "UAH",
					minimumFractionDigits: 2,
				});
		},
		cartLength() {
			return this.cart.length;
		},
	},
	methods: {
		...mapActions([
			"makeOrderFromCart",
			"increaseCartProduct",
			"decreaseCartProduct",
			"removeFromCart",
			"clearCart",
			"decreaseCartProduct",
			"increaseCartProduct",
		]),
		title(value) {
			return this.middleFormat(SEASONS_TITLES[value]);
		},
		middleFormat(item) {
			return item.replace(
				/Середньо-/,
				`<i style="margin-right: 6px" class="ri-contrast-fill"></i>`
			);
		},
		async makeOrder() {
			const result = await this.makeOrderFromCart(this.cart);
			if (result) {
				alert("Замовлення виконано");
				this.clearCart();
			} else {
				alert(result?.message || "Error");
			}
		},
		decrease(id) {
			const element = this.cart.find((item) => item.id == id);
			if (element.count == 1) {
				this.removeFromCart(id);
				return false;
			}
			this.decreaseCartProduct(id);
		},
		increase(id) {
			this.increaseCartProduct(id);
		},
	},
};
</script>

<style>
@media (max-width: 1130px) {
	.cart-product {
		flex-direction: column;
		align-items: stretch !important;
	}
}

@media (max-width: 752px) {
	.info-row {
		flex-direction: column;
	}
}

.cart-product {
	display: flex;
	align-items: center;
	column-gap: 20px;
	flex-wrap: wrap;
}

.cart-product .image-part {
	display: flex;
	justify-content: center;
	flex-basis: 23%;
}

.cart-product .info-part {
	display: flex;
	flex-grow: 1;
	border-bottom: 2px solid black;
	padding-top: 48px;
	padding-bottom: 40px;
}

.info-row {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	flex-wrap: wrap;
	flex-grow: 1;
	align-items: center;
}

.info-row .product-descriptions {
	display: flex;
	justify-content: center;
	flex-direction: column;
}

.info-row .product-descriptions h5 {
	margin: 0;
	margin-bottom: 13px;
	font-family: U;
	font-size: 20px;
	font-weight: 400;
}

.info-row .product-descriptions span {
	display: flex;
	font-size: 16px;
	margin-bottom: 21px;
}

.info-row .product-descriptions p {
	font-size: 12px;
	margin: 0;
}

.info-row .product-counts {
	display: flex;
	align-items: center;
	font-size: 16px;
	gap: 27px;
}

.info-row .product-counts .counter {
	display: flex;
	align-items: center;
	gap: 10px;
}

.info-row .product-counts .counter a {
	font-size: 14px;
}

.info-row .product-counts .counter p {
	font-size: 16px;
	display: flex;
	margin: 0;
	border: 1px solid black;
	border-radius: 16px;
	padding: 5px 24px;
}

.info-row .product-season {
	display: flex;
	align-items: center;
	font-size: 16px;
}

.info-row .product-price {
	text-align: center;
	font-size: 16px;
}

.cart-product .image-part img {
	width: 135px;
	height: 188px;
	object-fit: contain;
}

.row {
	display: flex;
	column-gap: 30px;
}

@media (max-width: 350px) {

	.cart-head .total span,
	.cart-head .title span {
		font-size: 16px !important;
	}
}

@media (max-width: 740px) {
	.cart-head {
		flex-direction: column;
		justify-content: space-between;
	}

	.cart-head .total:nth-child(2) {
		margin-top: 10px;
	}

	.cart-head .title,
	.cart-head .total {
		justify-content: space-between;
	}

	.cart-footer {
		align-items: end;
		flex-direction: column;
	}

	.cart-footer .row {
		margin-top: 10px;
	}
}

.align-center {
	align-items: center;
}

.cart {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 80px;
}

.cart-footer {
	margin-bottom: 24px;
}

.cart-container {
	width: 95%;
	max-width: 1360px;
}

.cart-head {
	border-bottom: 2px solid black;
	padding-bottom: 24px;
	display: flex;
	justify-content: space-between;
}

.title span {
	font-size: 24px;
}

.total span {
	font-size: 20px;
}

p {
	font-size: 16px;
}

.cart-footer {
	display: flex;
	justify-content: space-between;
	margin-top: 70px;
}

.empty {
	display: block;
	padding: 40px 0;
}

.cart-products {
	display: flex;
	flex-direction: column;
}

.continue a {
	font-size: 16px;
	font-family: U;
	border-bottom: 1px solid black;
	padding-bottom: 7px;
	display: flex;
	margin: auto;
}

.order button {
	font-family: U;
	font-size: 16px;
	background: #d9d9d9;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 10px 30px;
}
</style>
