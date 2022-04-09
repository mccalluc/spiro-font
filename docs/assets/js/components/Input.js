import replaceUrlParam from "../replaceUrlParam.js";

export default {
  inheritAttrs: false, // attrs are passed to sub-component; not used on top-level.
  props: {
    label: String,
    modelValue: Number,
  },
  computed: {
    inputId() {
      return `input-${this.label.replace(/\W+/g, '-')}`;
    }
  },
  methods: {
    onInput(event) {
      // Vue's default behavior for .number is:
      //
      // > If the value cannot be parsed with parseFloat(),
      // > then the original value is used instead.
      // https://vuejs.org/guide/essentials/forms.html#number
      //
      // We never want a non-numeric value, so instead we use Number() explicitly.
      const value = Number(event.target.value);
      replaceUrlParam(this.label, value);
      this.$emit('update:modelValue', value)
    }
  },
  emits: ['update:modelValue'], 
  template: `
    <div class="form-group row py-1">
      <div class="col-6">
        <label :for="inputId" v-html="label" />
      </div>
      <div class="col-6">
        <input
          v-bind="$attrs"
          type="number"
          class="form-control"
          :id="inputId"
          :value="modelValue"
          @input="onInput"
        >
      </div>
    </div>
  `
}
