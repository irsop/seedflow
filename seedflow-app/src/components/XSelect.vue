<template>
  <select ref="input" :id="field" class="filter_item">
    <option
      v-for="option in options"
      :data-icon="option.icon"
      :key="option.value"
      :value="option.value"
    >
      {{ option.title }}
    </option>
  </select>
</template>

<script>
export default {
  name: "XSelect",
  props: {
    options: Array,
    classes: Array,
    field: String,
    value: String,
  },
  methods: {
    selection(item) {
      const isIcon = !!item.element.getAttribute("data-icon");
      let icon = "";
      if (isIcon) {
        icon = '<i style="margin-right: 6px" class="ri-contrast-fill"></i>';
      }
      const text = item.text.replace(/Середньо-/, "");
      return window.$(`<div>${icon}${text}</div>`);
    },
    formatOption(state) {
      let html = state.text.replace(
        /Середньо-/g,
        '<i style="margin-right: 6px" class="ri-contrast-fill"></i>'
      );
      var $state = window.$(
        `<div data-icon="1" style="display: flex; align-items: center">${html}</div>`
      );
      return $state;
    },
  },
  mounted() {
    window.$(this.$refs.input).select2({
      minimumResultsForSearch: -1,
      data: this.options,
      templateResult: this.formatOption,
      templateSelection: this.selection,
      dropdownCssClass: "my_dropdown",
      width: "auto",
    });
    window.$(this.$refs.input).on("select2:select", (event) => {
      this.$emit("input", event.target.value);
    });
  },
  computed: {
    firstOption() {
      return window.$(this.$refs.input).select2("val") || this.options[0].value;
    },
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          window.$(this.$refs.input).trigger("select2:select");
          window.$(this.$refs.input).select2("destroy");
          window.$(this.$refs.input).select2({
            minimumResultsForSearch: -1,
            templateResult: this.formatOption,
            templateSelection: this.selection,
            dropdownCssClass: "my_dropdown",
            width: "auto",
          });
        });
      },
    },
  },
};
</script>

<style>
.select2-container .select2-results__option:not([id]) {
  display: none !important;
}
</style>
