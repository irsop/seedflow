const API_URL = "http://localhost:4000";

export default {
	methods: {
		image(image) {
			return `${API_URL}/images/${image}`;
		},
	},
}