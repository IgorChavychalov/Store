const products = [
  {id: 1, title: 'Notebook', price: 2000},
  {id: 2, title: 'Keyboard', price: 70},
  {id: 3, title: 'Mouse', price: 46},
  {id: 4, title: 'Gamepad', price: 68},
  {id: 5, title: 'Chair', price: 168},
  {id: 6, title: '', price: ''},

];

const renderProduct = (title, price) => {
	if (title && price) {
	  return `<div class="product-item"><img class="product-img" src="img/default.png">
	        <h3>${title}</h3>
	        <p>${price}</p>
	        <button class="buy-btn btn">Купить</button>
	    </div>`;
	}
	return `<div class="product-item"><img class="product-img" src="img/default.png">
	        <h3>товар</h3>
	        <p>цена</p>
	        <button class="buy-btn btn">Купить</button>
	   </div>`;
};

const renderPage = list => {
  const productList = list.map(item => renderProduct(item.title, item.price));
  // ЗАПЯТЫЕ - РАЗДЕЛИТЕЛЬ КОЛЕКЦИИ
  // ПОЧЕМУ ОНИ ВЫВОДЯТЬСЯ ТАК И НЕ ПОНЯЛ
  document.querySelector(`.products`).innerHTML = productList.join('');
};

renderPage(products);



//==ПЫТАЛСЯ РЕАЛИЗОВАТЬ renderProduct с ипользованием объекта, но получал undefined===========


//const products = [
//  {id: 1, title: 'Notebook', price: 2000},
//  {id: 2, title: 'Keyboard', price: 70},
//  {id: 3, title: 'Mouse', price: 46},
//  {id: 4, title: 'Gamepad', price: 68},
//  {id: 5, title: 'Chair', price: 168},
//];
//
//let productDiv = {
//	divClass: 'product-item',
//	imgСlass: 'product-img',
//	titleDefault: 'title',
//	priceDefault: 'price',
//	imgDefault: "img/default.png",
//
//	render() {
//		`<div class=${this.divClass}><img class=${this.imgСlass} src=${this.imgDefault}>
//        <h3>${this.titleDefault}</h3>
//        <p>${this.priceDefault}</p>
//        <button class="buy-btn btn">Купить</button>
//    </div>`;
//	}
//}
//const renderProduct = (title, price) => {
//	div = productDiv
//	div.titleDefault = title;
//	div.priceDefault = price;
//  return `${div.render()}`
//};
//
//const renderPage = list => {
//  const productList = list.map(item => renderProduct(item.title, item.price));
//  document.querySelector(`.products`).innerHTML = productList.join('');
//};
//
//renderPage(products);
