<template>
	<body>
		<x-header />
		<div id="page">
			<section>
				<div class="container">
					<div class="row border-bottom full-width margin-top flex">
						<h1>Про нас</h1>
						<div class="clip"><i class="ri-attachment-fill"></i></div>
					</div>
				</div>
			</section>
			<section>
				<div class="container" id="about_us">
					<div class="about-us-block full-width space-between">
						<div class="row align-start space-between">
							<div class="description">
								<p>
									Наш інтернет-магазин - це не лише місце для покупок, але і путівник у
									світ садівництва.<br /><br />
								</p>
								<p>
									Ми вже більше 20 років займаємось вирощуванням овочів, маємо сертіфикати
									та гранти якості на насіння. Тому знаємо як виростити здоровий та
									смачний врожай.
								</p>
							</div>
						</div>
						<div class="image-block">
							<div class="row space-between">
								<span>Приєднуйтесь та відкрийте світ садівництва разом з нами!</span>
								<span>Обирайте якість та надійність для свого врожаю!</span>
							</div>
							<div class="row">
								<img src="@/assets/images/about.png" alt="About image" />
							</div>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div class="container">
					<div class="row full-width margin-bottom flex">
						<h1>Що кажуть наші покупці?</h1>
					</div>
					<div class="row">
						<div class="container" v-if="slides.length">
							<div class="glide">
								<div class="glide__track" data-glide-el="track">
									<ul class="glide__slides">
										<li class="glide__slide" v-for="slide of slides" :key="slide.id">
											<div class="slide-item" :style="{ 'min-height': slide.height + 'px' }">
												<div class="slide-text">
													{{ slide.text }}
												</div>
												<div class="slide-row">
													<img :src="require(`@/assets/images/slider-about/${slide.avatar}`)"
														class="avatar" alt="Logo" />
													<div class="slide-column">
														<span style="margin-bottom: 6px">{{ slide.name }}</span>
														<span style="opacity: 0.5">{{ slide.location }}</span>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div class="container">
					<div class="slider-arrows">
						<div class="arrows-block">
							<div class="arrow-left" @click="glide.go('<')">
								<i class="ri-arrow-left-line"></i>
							</div>
							<div class="arrow-right" @click="glide.go('>')">
								<i class="ri-arrow-right-line"></i>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
		<x-footer />
	</body>
</template>

<script>
import XHeader from "@/components/XHeader";
import XFooter from "@/components/XFooter";

export default {
	name: "AboutPage",
	components: {
		XFooter,
		XHeader,
	},
	data() {
		return {
			glide: {},
			slides: [
				{
					id: 1,
					text: "Знайшов всі необхідні сорти, і ще й з доставкою під двері )))",
					name: "Олександра Бойко",
					location: "Чернівці",
					avatar: "1.png",
					height: 208,
				},
				{
					id: 2,
					text:
						"Купив насіння овочів в інтернеті – мегакруто! Швидка доставка, кльовий вибір. Тепер чекаю, як мої овочі виростуть. ",
					name: "Іван Григорчук",
					location: "Луцьк",
					avatar: "2.png",
					height: 265,
				},
				{
					id: 3,
					text:
						"Замовив насіння в інтернеті – тепер чекаю, як у мене вдома виросте овочевий рай. Класно, що все так просто! 🌱🛒",
					name: "Лілія Мельник",
					location: "Тернопіль",
					avatar: "3.png",
					height: 243,
				},
				{
					id: 4,
					text: "Замовив насіння , чекаю  врожаю. Просто і класно.",
					name: "Олена Гончаренко",
					location: "Рівне",
					avatar: "4.png",
					height: 195,
				},
			],
		};
	},
	mounted() {
		if (!document.querySelector(".glide")) {
			return false;
		}
		this.glide = new window.Glide(".glide", {
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
	},
};
</script>

<style scoped>
.slider-arrows {
	margin-top: 32px;
	margin-bottom: 70px;
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
}

.arrows-block {
	display: flex;
	align-items: center;
	font-size: 46px;
	gap: 118px;
}

.arrows-block>div {
	cursor: pointer;
}

.slide-row {
	display: flex;
	align-items: center;
	gap: 20px;
}

.slide-column {
	display: flex;
	flex-direction: column;
}

.slide-column span {
	font-size: 16px;
}

.slide-item {
	border: 2px solid black;
	padding: 30px;
}

.slide-text {
	font-size: 16px;
	margin-bottom: 30px;
}

.image-block {
	display: flex;
	flex-direction: column;
}

.margin-bottom {
	margin-bottom: 40px;
}

.image-block>div:first-child {
	margin-bottom: 97px;
	gap: 75px;
}

@media (max-width: 700px) {
	.image-block>div:first-child {
		margin-bottom: 20px;
	}
}

.image-block>div img {
	width: 100%;
	height: auto;
	object-fit: cover;
}

img.avatar {
	width: 52px;
	height: 52px;
	object-fit: cover;
	background-color: #000;
	border-radius: 50%;
}

.image-block span {
	font-size: 16px;
	font-family: U;
	max-width: 269px;
}

.description {
	max-width: 596px;
}

.space-between {
	justify-content: space-between;
}

.align-start {
	align-items: start;
}

.description p {
	margin: 0;
	font-size: 20px;
	font-family: U;
	font-weight: 400;
}

.flex {
	display: flex;
}

.margin-top {
	margin-top: 80px;
}

.full-width {
	width: 100%;
}

.border-bottom {
	padding-bottom: 12px;
	border-bottom: solid 2px black;
}

#about_us {
	display: flex;
	flex-wrap: wrap;
	border-right: 2px solid black;
	margin-bottom: 68px;
}

.about-us-block {
	display: flex;
	gap: 40px;
	padding-top: 24px;
	flex-wrap: wrap;
}

.row {
	display: flex;
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

h1 {
	display: flex;
	width: 100%;
	font-size: 24px;
	font-weight: 400;
	font-family: U;
	align-items: center;
	flex-grow: 1;
}

.clip {
	flex-grow: 1;
	display: flex;
	align-items: center;
	width: 100%;
}

.clip i {
	font-size: 46px;
}

#page {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	width: 100%;
}
</style>
