Vue.component('error', {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    setText(value) {
      this.text = value;
    }
  },
  template: `<div class="error-msg" v-if="text">
                <p></p>
                <button @click="setText('')">&times;</button>
                {{text}}}
             </div>`
});