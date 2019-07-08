class Products {
    constructor(container='.products') {
        this.container = container;
        this.data = [];
        this.allProducts = [];
    }
    init(){
        this._fetchGoods();
        this._render();
        console.log(this._totalCostProducts());
    }
    _fetchGoods(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Keyboard', price: 70},
            {id: 3, title: 'Mouse', price: 46},
            {id: 4, title: 'Gamepad', price: 68},
            {id: 5, title: 'Chair', price: 168},
        ];
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new ProductItem(el);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
		// ДЗ
    _totalCostProducts() {
        let total = 0;
        for (let elem of this.data) {
            total += parseInt(elem.price);
        }
				return total;
    }
}

class ProductItem {
    constructor(product, img="img/default.png") {
        this.price = product.price;
        this.title = product.title;
        this.id = product.id;
        this.img = img
    }
    render(){
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn" data-id="${this.id}">Купить</button>
                 </div>
             </div>`
    }
}


// ДЗ
class Cart {
    constructor(container='.buy-btn'){
        this.backetProducts = [];
        this.container = container;
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll(this.container);
        for (const elem of buttons) {
            elem.addEventListener('click', event => this.clickBuy(event));
        }

    }

    clickBuy(event) {
        const id = event.target.dataset.id;
				this.addProduct(id);

    }

    addProduct(id) {
        const product = new Products();
        product._fetchGoods();
        const selectProduct = product.data;
        for (const elem of selectProduct) {
            if (elem.id == id) {
                this.backetProducts.push(elem);
            }
        }
        console.log(selectProduct);

    }

    removeProduct() {}

    confirm() {}

}

const products = new Products().init();
const backet = new Cart();
