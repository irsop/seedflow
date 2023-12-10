export default {
	methods: {
		financeFormat(summ, currency = false) {
			const config = {
				minimumFractionDigits: 2,
			};
			if (currency) {
				config.currency = "UAH";
			}
			return summ.toLocaleString("ua-UK", config);
		},
	},
};