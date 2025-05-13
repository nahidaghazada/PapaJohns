const cartBadge = document.querySelectorAll(".cartBadge");
const cardPrice = document.querySelectorAll("#cardPrice");
const totalPrice = document.getElementById("totalPrice");
const basketCount = document.getElementById('basketCount');
const cartItems = document.getElementById('cartItems');

let basket = JSON.parse(localStorage.getItem('basket')) || [];
let sizePizza = ['S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL'];

function addToBasket() {
    let check = basket.find(item => item.id == DETDATA.id && item.sizeValue == DETDATA.sizeValue)
    if (check == undefined) {
        DETDATA.productCount = count;
        basket.push(DETDATA);
    } else {
        basket.map(item => {
            if (item.category == 'cat' && item.id == DETDATA.id) {
                item.sizeValue = DETDATA.sizeValue;
            }
            if (item.id == DETDATA.id) {
                item.productCount += count;
            }
        });
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    count = 1;
    showBasket();
    show(DETDATA);
    updatePizzaOptions(size, DETDATA.sizeValue);
}

function showBasket() {
    let price = 0;
    let total = 0;
    let pizzaSizeIndex = 0;
    cartItems.innerHTML = '';

    let totalProductCount = basket.reduce((sum, item) => sum + item.productCount, 0);
    cartBadge.forEach((badge) => {
        badge.innerHTML = totalProductCount;
    });
    basketCount.innerHTML = totalProductCount;

    basket.map((item, i) => {
        if (item.category == 'cat') pizzaSizeIndex = item.variations.findIndex(el => el.price == item.sizeValue);
        price = (item.productCount * (item.sizeValue || item.price)).toFixed(1);
        cartItems.innerHTML += `
            <div class="flex flex-col sm:flex-row justify-between items-center py-3 border border-slate-400 mt-2">
                <div class="w-full sm:w-1/2 flex gap-2 items-center">
                    <img class="w-[50px]" src="${item.img}" alt="product" />
                    <h3 class="sm:text-[20px] font-bold">${item.title}</h3>
                    <p class="sm:text-[20px] font-bold">${item.category == 'cat' ? sizePizza[pizzaSizeIndex] : ""}</p>
                </div>
                <div class="w-full sm:w-1/2 justify-end flex items-center gap-3 px-2">
                    <div class="flex items-center sm:text-[20px] text-white p-2">
                        <button onclick="changeBasketCount(-1, '${item.id}', ${i})" class="px-2 sm:px-3 pb-1 bg-[#b91c1c] rounded w-[38px] font-black">-</button>
                        <span class="px-2 sm:px-3 text-black">${item.productCount}</span>
                        <button onclick="changeBasketCount(1, '${item.id}', ${i})" class="px-2 sm:px-3 pb-1 bg-green-600 rounded w-[38px] font-black">+</button>
                    </div>
                    <div class="font-bold">
                        <span class="text-[22px]">${price} ₼</span>
                        <span onclick="deleteProduct(${i})" class="fa-solid cursor-pointer fa-xmark text-gray-600 ml-2"></span>
                    </div>
                </div>
            </div>
        `;
        total += +price;
    });

    totalPrice.innerHTML = total;
    cardPrice.forEach((priceElement) => {
        priceElement.innerHTML = total;
    });
}

function changeBasketCount(acc, id, index) {
    const itemIndex = basket.findIndex(item => item.id == id);
    if (itemIndex !== -1) {
        basket[itemIndex].productCount += acc;
        if (basket[itemIndex].productCount < 1) {
            deleteProduct(itemIndex);
        }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    showBasket();
}

function deleteProduct(index) {
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket));
    showBasket();
}