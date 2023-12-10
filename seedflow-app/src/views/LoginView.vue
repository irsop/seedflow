<template>
	<div class="centered">
		<form class="auth-form-block" @submit="onSubmit">
			<div class="header__logo">
				<router-link to="/">
					<span>Seedflow</span>
					<i class="ri-seedling-fill"></i>
				</router-link>
			</div>
			<div class="auth-form">
				<input autocomplete="off" required class="auth-input" type="text" placeholder="Логін" v-model="login" />
				<input autocomplete="off" required class="auth-input" type="password" placeholder="Пароль"
					v-model="password" />
			</div>
			<div class="buttons">
				<button type="submit" class="yellow">Увійти</button>
			</div>
			<small @click="goToRegister">Немає аккаунта? Зареєструйтесь</small>
		</form>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "LoginView",
	methods: {
		...mapActions({
			loginAction: "login",
		}),
		async onSubmit(event) {
			event.preventDefault();
			this.loginAction({ login: this.login, password: this.password }).then(() => {
				this.$router.push("/");
			});
		},
		goToRegister() {
			this.$router.push("/register");
		},
	},
	data() {
		return {
			login: "",
			password: "",
		};
	},
};
</script>

<style>
.auth-form {
	display: flex;
	row-gap: 12px;
	margin: 37px 0;
	flex-direction: column;
}

.auth-input {
	padding: 12px;
	font-weight: 400;
	font-family: U;
	font-size: 14px;
	width: 260px;
	outline: none;
	border: 1px solid black;
}

.auth-form-block small {
	margin-top: 10px;
	color: black;
	opacity: 0.5;
	font-size: 12px;
	font-weight: 400;
	cursor: pointer;
}

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
	width: 100%;
}

.buttons button {
	font-size: 16px;
	font-family: U;
	border: none;
	cursor: pointer;
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
