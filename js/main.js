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
            .then(() => this._render());

        this._buyBtnListner();
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

    _buyBtnListner() {
        const buttons = document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains("buy-btn")) {
                this.clickBuy(e);
            }
        });
    }

    clickBuy(event) {
        const id_product = event.target.dataset.id;
        for (const elem of this.allProducts) {
            if (elem.id_product === +id_product) {
                this.addProduct(elem);
            }
        }
    }

    addProduct(product) {
        const conteiner = '.cart';
        const basket = document.querySelector(conteiner);
        basket.insertAdjacentHTML('beforeend', product.renderInBasket());
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


const products = new Products();
console.log(products.calcSum());
