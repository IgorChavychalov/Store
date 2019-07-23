import {cart} from './CartComp';
import {products} from './ProductsComp';
import {error} from './Error';
import {search} from './Search';


export const app = {
  el: '#app',
  component: {
    cart,
    error,
    products,
    search,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => this.$refs.error.setText(error));
    },
    postJson(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => this.$refs.error.setText(error));
    },
    deleteJson(url) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(result => result.json())
        .catch(error => this.$refs.error.setText(error));
    },
  }

};
