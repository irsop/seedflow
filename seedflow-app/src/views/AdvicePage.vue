<template>
	<body>
		<x-header />
		<div id="page_content">
			<section>
				<div class="container">
					<h1>Поради</h1>
				</div>
			</section>
			<section>
				<div class="container">
					<div class="grid">
						<div class="grid-element image" id="left_image">
							<img alt="Image" src="@/assets/images/advice/1.png" />
						</div>
						<div class="grid-element">
							Забезпечте свої рослини достатньою кількістю сонячного світла.
						</div>
						<div class="grid-element image" id="right_first_image">
							<img alt="Image" src="@/assets/images/advice/2.png" />
						</div>
						<div class="grid-element">
							Використовуйте якісні ґрунти з доброю дренажною системою.
						</div>
						<div class="grid-element">
							Добре плануйте розташування рослин, дотримуючись рекомендацій щодо розсади.
						</div>
						<div class="grid-element">
							Застосовуйте органічні добрива для підживлення ґрунту.
						</div>
						<div class="grid-element">
							Враховуйте потреби кожного виду овочів щодо температури та вологості.
						</div>
						<div class="grid-element image" id="right_second_image">
							<img alt="Image" src="@/assets/images/advice/3.png" />
						</div>
						<div class="grid-element">
							Уникайте захворювань шляхом регулярної інспекції та вживання заходів
							захисту.
						</div>
						<div class="grid-element">
							Регулярно поливайте рослини, уникаючи пересихання чи переосвітлення.
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
	name: "AdvicePage",
	components: {
		XHeader,
		XFooter,
	},
};
</script>

<style scoped>
.grid-element:not(.image) {
	padding: 31px 48px;
	font-size: 16px;
	font-family: U;
}

.grid-element {
	border: 2px solid black;
}

.grid-element:nth-child(2) {
	grid-area: second;
	border-right: none;
	border-left: none;
	border-bottom: none;
}

.grid-element:nth-child(4) {
	grid-area: fourth;
	border-right: none;
	border-left: none;
	border-bottom: none;
}

.grid-element:nth-child(5) {
	grid-area: fifth;
	border-right: none;
	border-left: none;
	border-bottom: none;
}

.grid-element:nth-child(6) {
	grid-area: sixth;
}

.grid-element:nth-child(7) {
	grid-area: seventh;
	border-bottom: none;
	border-right: none;
	border-left: none;
}

.grid-element:nth-child(9) {
	grid-area: nineth;
	border-top: none;
}

.grid-element:nth-child(10) {
	grid-area: tenth;
	border-left: none;
	border-right: none;
}

@media (max-width: 950px) {
	.grid {
		display: flex !important;
		flex-direction: column;
	}

	.grid .grid-element:nth-child(2) {
		border: 2px solid black !important;
		border-top: none !important;
	}

	.grid .grid-element:nth-child(4) {
		border: 2px solid black !important;
		border-bottom: none !important;
	}

	.grid .grid-element:nth-child(5) {
		border: 2px solid black !important;
		border-bottom: none !important;
	}

	.grid .grid-element:nth-child(6) {
		border: 2px solid black !important;
		border-bottom: none !important;
	}

	.grid .grid-element:nth-child(7) {
		border: 2px solid black !important;
		border-bottom: none !important;
	}

	.grid .grid-element:nth-child(9) {
		border: 2px solid black !important;
		border-top: none !important;
	}

	.grid .grid-element:nth-child(10) {
		border: 2px solid black !important;
		border-top: none !important;
	}
}

.grid {
	margin-bottom: 20px;
	display: grid;
	grid-template-columns: minmax(200px, 1fr) minmax(200px, 1fr) 164px minmax(200px, 1fr);
	grid-template-areas:
		"left_image second  second right_first_image"
		"left_image fourth  fourth right_first_image"
		"left_image fifth   fifth  right_first_image"
		"sixth      seventh right_second_image right_second_image"
		"nineth     tenth   right_second_image right_second_image";
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

#page_content {
	max-width: unset !important;
	width: unset !important;
}

#page_content h1 {
	width: 100%;
	font-size: 24px;
	font-weight: 400;
	font-family: U;
	margin-top: 80px;
	margin-bottom: 53px;
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
