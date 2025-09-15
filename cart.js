document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    // New selectors from the updated design
    const itemsTotalPriceElement = document.querySelector('.items-total-price');
    const discountsPriceElement = document.querySelector('.discounts-price');
    const finalTotalPriceElement = document.querySelector('.cart-total-price');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('blueDreamsCart')) || [];

    // --- Cart UI Functions ---
    const openCart = () => {
        if (cartSidebar) cartSidebar.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const closeCart = () => {
        if (cartSidebar) cartSidebar.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scroll
    };

    // Event Listeners for opening/closing cart
    document.querySelectorAll('.cart-btn').forEach(btn => btn.addEventListener('click', openCart));
    document.querySelectorAll('.close-cart-btn').forEach(btn => btn.addEventListener('click', closeCart));
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // --- Cart Data Functions ---
    const saveCart = () => {
        localStorage.setItem('blueDreamsCart', JSON.stringify(cart));
    };

    const updateCartTotals = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discounts = 0; // Placeholder for future discount logic
        const finalTotal = subtotal - discounts;

        // Update cart icon count
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
        });
        
        // Update summary footer
        if (itemsTotalPriceElement) itemsTotalPriceElement.textContent = `$${subtotal.toFixed(2)}`;
        if (discountsPriceElement) discountsPriceElement.textContent = `-$${discounts.toFixed(2)}`;
        if (finalTotalPriceElement) finalTotalPriceElement.textContent = `$${finalTotal.toFixed(2)}`;
    };

    const renderCartItems = () => {
        if (!cartItemsContainer) {
            console.error("Fatal Error: '.cart-items' container not found.");
            return;
        }

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; color: var(--text-secondary); padding: 40px 20px;">Your cart is empty.</p>';
        } else {
            const allItemsHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-img-container">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    </div>
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <p>Small - 200g</p>
                        <div class="cart-item-details">
                            <span class="cart-item-price">$${parseFloat(item.price).toFixed(2)}</span>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                                <span class="item-quantity-display">${item.quantity}</span>
                                <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            cartItemsContainer.innerHTML = allItemsHTML;
        }
    };
    
    const fullRender = () => {
        renderCartItems();
        updateCartTotals();
    }

    // --- Cart Logic Functions ---
    const increaseQuantity = (productId) => {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity++;
        }
        saveCart();
        fullRender();
    };

    const decreaseQuantity = (productId) => {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity--;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== productId);
            }
        }
        saveCart();
        fullRender();
    };

    // This function is no longer called from the UI but can be kept for other uses
    const removeItem = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        fullRender();
    };

    // --- Global addToCart function ---
    window.addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            // Ensure price is a number before adding
            const price = parseFloat(product.price);
            if (isNaN(price)) {
                console.error("Product being added has an invalid price:", product);
                return;
            }
            cart.push({ ...product, price: price, quantity: 1 });
        }
        
        saveCart();
        fullRender();
        openCart();
    };

    // --- Event Delegation for Cart Actions ---
    const handleCartClick = (e) => {
        const target = e.target;
        const productId = target.dataset.id;

        if (!productId) return;

        if (target.classList.contains('increase-btn')) {
            increaseQuantity(productId);
        } else if (target.classList.contains('decrease-btn')) {
            decreaseQuantity(productId);
        }
    };

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', handleCartClick);
    }
    
    // Initial render on page load
    fullRender();
});
