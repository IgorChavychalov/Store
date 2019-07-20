Vue.component('cart', {
  data() {
    return {
      showCart: false,
      cartUrl: '/getBasket.json',
      imgCart: 'img/default.png',
      cartItems: []
    }
  },
  methods: {
    addProduct(product) {
      this.$parent.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if(data.result){
            let find = this.cartItems.find(item => item.id_product === product.id_product);
            if(find){
              find.quantity++;
            } else {
              let prod = Object.assign({quantity: 1}, product);
              this.cartItems.push(prod);
            }
          }
        })
    },
    remove(product) {
      this.$parent.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if(data.result){
            if(product.quantity > 1){
              product.quantity--;
            } else {
              this.cartItems.splice(this.cartItems.indexOf(product), 1);
            }
          }
        })
    },
  },
  mounted() {
    this.$parent.getJson(`${API + this.cartUrl}`)
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
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item">
                    <img :src="img" alt="Some image">
                        <p>{{cartItem.product_name}}</p>
                        <div class="counter">{{cartItem.quantity}}</div>
                    <p class="product-price">$ {{cartItem.quantity*cartItem.price}}</p>
                    <button @click="$emit('remove', cartItem)">&times;</button>
            </div>`
});