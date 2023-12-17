let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Mixed Munch',
        image: '1.PNG',
        price: 210
    },
    {
        id: 2,
        name: 'Tandoori Chicken',
        image: '2.PNG',
        price: 250
    },
    {
        id: 3,
        name: 'Veggy Chicken',
        image: '3.PNG',
        price: 240
    },
    {
        id: 4,
        name: 'Sweet',
        image: '4.PNG',
        price: 120
    },
    {
        id: 5,
        name: 'Green Salad',
        image: '5.PNG',
        price: 110
    },
    {
        id: 6,
        name: 'Chilli Pizza',
        image: '6.PNG',
        price: 150
    }
];
let listCards  = [];
function initApp() {
    // Check if there is existing cart data in localStorage
    let storedCart = localStorage.getItem('cart');
    if (storedCart) {
        listCards = JSON.parse(storedCart);
    }

    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">₹${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})" style="cursor: pointer;">Add To Card</button>`;
        list.appendChild(newDiv);
    });

    // Reload the cart
    reloadCard();
}

initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        // copy product from list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(listCards));

    // Reload the cart
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price;
            count += value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>₹${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})" style="cursor: pointer;">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})" style="cursor: pointer;">+</button>
                </div>`;
            listCard.appendChild(newDiv);
            
        }
    });
    console.log(totalPrice);

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity === 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(listCards));

    // Reload the cart
    reloadCard();
}
