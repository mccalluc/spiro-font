export default {
  props: {
    baseUrl: String,
    page: Object,
  },
  template: `
  <p><a :href="baseUrl">home</a></p>
  <h1>{{ page.name }}</h1>
  <textarea rows="2" columns="12" class="style-me">{{ page.sampleText }}</textarea>
  <button class="style-me" id="download">GET FONT</button>
  <div id="controls"></div>
  `
}
