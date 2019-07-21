const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;


const app = new Vue({
  el: '#app',
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => this.$refs.error.setText(error));
    },
    postJson(url, data) {
      return fetch(url, {
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => this.$refs.error.setText(error));
    },
    putJson(url, data) {
      return fetch(url, {
        method: 'PUT',
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => this.$refs.error.setText(error));
    },
  },

});
