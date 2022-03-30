export default {
  props: {
    label: String,
    modelValue: Number,
  },
  data() {
    return {}
  },
  emits: ['update:modelValue'],
  template: `
    <div class="form-group row py-1">
      <div class="col-6">
        <label :for="label">{{ label }}:</label>
      </div>
      <div class="col-6">
        <input
          type="number"
          class="form-control"
          :id="label"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        >
      </div>
    </div>
  `
}
