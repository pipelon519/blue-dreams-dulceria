document.addEventListener('DOMContentLoaded', () => {
    const cartOverlay = document.getElementById('cart-overlay');
    const cart = document.getElementById('cart');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartBtn = document.querySelector('.cart-btn');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');

    let items = [];

    const openCart = () => {
        cartOverlay.classList.add('active');
    };

    const closeCart = () => {
        cartOverlay.classList.remove('active');
    };

    const updateCart = () => {
        cartItems.innerHTML = '';
        let total = 0;
        let count = 0;

        items.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${formatCOP(item.price)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                </div>
                <button class="remove-btn" data-id="${item.id}">&times;</button>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = formatCOP(total);
        cartCount.textContent = count;
    };

    const addToCart = (product) => {
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            items.push({ ...product, quantity: 1 });
        }

        updateCart();
        openCart(); // Open cart when item is added
    };

    cartItems.addEventListener('click', (e) => {
        const id = e.target.dataset.id;

        if (e.target.classList.contains('plus-btn')) {
            const item = items.find(item => item.id === id);
            if (item) item.quantity++;
        } else if (e.target.classList.contains('minus-btn')) {
            const item = items.find(item => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity--;
            } else {
                items = items.filter(item => item.id !== id);
            }
        } else if (e.target.classList.contains('remove-btn')) {
            items = items.filter(item => item.id !== id);
        }

        updateCart();
    });

    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            closeCart();
        }
    });

    window.addToCart = addToCart; 
});
