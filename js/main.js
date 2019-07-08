const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4) {
//             if (xhr.status !== 200){
//                 console.log('error')
//             } else {
//                 cb(xhr.responseText)
//             }
//         }
//     }
// }

class Products {
    constructor(container='.products') {
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this._fetchGoods()
            .then(() => this._render())
    }
    _fetchGoods(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log(error));
    }
    calcSum(){
        // let result = 0;
        // for (let prod of this.allProducts) {
        //     result += prod.price;
        // }
        return this.allProducts.reduce((accum, el) => accum + el.price, 0)
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new ProductItem(el);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

class ProductItem {
    constructor(product, img="img/default.png") {
        this.price = product.price;
        this.product_name = product.product_name;
        this.id_product = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                    <img src="${this.img}" alt="${this.product_name}">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price}</p>
                        <button class="buy-btn" data-id="${this.id_product}">Купить</button>
                    </div>
                </div>`
    }
    renderInBasket() {
        return `<div class="cart-item">
                    <img src="${this.img}" alt="${this.img}">
                    <p>"${this.product_name}"</p>
                    <div class="counter"></div>
                    <button data-id="${this.id_product}">Удалить</button>
                </div>`
    }

}

class BacketItem {
    constructor(product, img="img/default.png") {
        this.product_name = product.product_name;
        this.id_product = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="cart-item">
                    <img src="${this.img}" alt="${this.img}">
                    <p>"${this.img}"</p>
                    <div class="counter">1</div>
                    <button>Удалить</button>
                </div>`
    }
}

const products = new Products();
console.log(products.calcSum());


class Cart {
    constructor(container='.cart') {
        this.container = container;
        this._init();

    }
    _init() {
        const buyBtns = document.querySelectorAll('.buy-btn');
        for (const btn of buyBtns) {
            btn.addEventListener('click', (event) => {

            })
        }
    }
    addProductToBasket() {
        console.log('111');
    }

}

const cart = new Cart();
