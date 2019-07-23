const cartItem = {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item">
                    <img :src="img" alt="Some image">
                        <p>{{cartItem.product_name}}</p>
                        <div class="counter">{{cartItem.quantity}}</div>
                    <p class="product-price">$ {{cartItem.quantity*cartItem.price}}</p>
                    <button @click="$emit('remove', cartItem)">&times;</button>
            </div>`
};

export const cart = {
  data() {
    return {
      showCart: false,
      cartUrl: '/getBasket.json',
      imgCart: 'img/default.png',
      cartItems: []
    }
  },
  components: {
    'cart-item': cartItem
  },
  methods: {
    addProduct(product) {
      let find = this.cartItems.find(item => item.id_product === product.id_product);
      if(find){
        this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
          .then(data => {
            if(data.result){
              find.quantity++;
            }
          })
      } else {
        let prod = Object.assign({quantity: 1}, product);
        this.$parent.postJson(`/api/cart`, prod)
          .then(data => {
            if(data.result){
              this.cartItems.push(prod);
            }
          })
      }
    },
    remove(product) {
      if(product.quantity > 1) {
        this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
          .then(data => {
            if(data.result){
              product.quantity--;
            }
          })
      } else {
        this.$parent.deleteJson(`/api/cart/${product.id_product}`)
          .then(data => {
            if(data.result){
              this.cartItems.splice(this.cartItems.indexOf(product), 1);
            }
          })
      }
    },
  },
  mounted() {
    this.$parent.getJson(`/api/cart`)
      .then(data => {
        for(let el of data.contents){
          this.cartItems.push(el);
        }
      })
  },
  template: `<div class="open-btn">
                <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                <div class="cart" v-show="showCart">
                    <p v-if="!cartItems.length">Cart is empty</p>
                     <cart-item 
                     v-for="item of cartItems" 
                     :key="item.id_product"
                     :cart-item="item"
                     :img="imgCart"
                     @remove="remove"></cart-item>   
                </div>
            </div>`
};