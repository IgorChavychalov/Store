Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'img/default.png',
        }
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `<div class="products">
         <product 
         v-for="el of filtered" 
         :key="el.id_product"
         :product="el"
         :img="imgCatalog"></product>
    </div>`
});

Vue.component('product', {
   props: ['product', 'img'],
   template: `<div class="product-item">
                  <img :src="img" :alt="product.product_name">
                  <div class="desc">
                      <h3>{{product.product_name}}</h3>
                      <p>{{product.price}}</p>
                      <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                  </div>
              </div>`
});


