class Topping {
    constructor(container='.topping') {
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.burger = [];
        this.init();
    }
    init(){
        this._fetchGoods();
        this.render(this.container, this.data);
        this.addTopping();


    }
    _fetchGoods(){
        this.data = [
            {id: 1, title: 'Котлета', price: 100, img: 'img/beef.jpg'},
            {id: 2, title: 'Сыр', price: 100, img: 'img/chees.jpg'},
            {id: 3, title: 'Верхняя булочка', price: 100, img: 'img/bread-top.jpg'},
            {id: 4, title: 'Нижняя булочка', price: 100, img: 'img/bread-bottom.jpg'},
        ];
    }
    render(container, data){
        const block = document.querySelector(container);
        for (let el of data) {
            const product = new ProductItem(el, el.img);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }

    _totalCostProducts() {
        let total = 0;
        for (let elem of this.burger) {
            total += parseInt(elem.price);
        }
				return total;
    }

    addTopping() {
	      const buttons = document.querySelectorAll(".buy-btn");
		        for (const elem of buttons) {
		            elem.addEventListener('click', event => this.clickBuy(event));
		        }
    }

    clickBuy() {
        this.burger = [];
        const id = event.target.dataset.id;
				this.findProduct(id);
				this.render('.burger', this.burger);

    }

		findProduct(id) {
        for (const elem of this.data) {
            if (elem.id == id) {
                this.burger.push(elem);
            }
        }
		}




}

class ProductItem {
    constructor(product, img="img/default.png") {
        this.price = product.price;
        this.title = product.title;
        this.id = product.id;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn" data-id="${this.id}">Добавить</button>
                 </div>
             </div>`
    }
}


const topping = new Topping();


