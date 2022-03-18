export default {
  props: {
    baseUrl: String,
    page: Object,
  },
  template: `
  <div>
    <p><a :href="baseUrl">home</a></p>
    <h1>{{ page.name }}</h1>
    {{ page.name }}
    <textarea rows="2" columns="12" class="style-me">{{ page.sampleText }}</textarea>
  </div>
  `
}

// <h1>{{ name }}</h1>
// {{ content }}
// <textarea rows="2" columns="12" class="style-me">{{ sampleText }}</textarea>