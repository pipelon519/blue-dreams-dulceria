document.addEventListener('DOMContentLoaded', () => {
    // --- SELECTORES (Sin cambios) ---
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPriceElement = document.querySelector('.cart-total-price');
    const cartCountElements = document.querySelectorAll('.cart-count');

    // Carga el carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('blueDreamsCart')) || [];

    // --- LÓGICA DE VISIBILIDAD DEL CARRITO (Sin cambios) ---
    const openCart = () => {
        if (cartSidebar) cartSidebar.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
    };

    const closeCart = () => {
        if (cartSidebar) cartSidebar.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
    };

    // Asignar eventos a los botones de abrir/cerrar
    document.querySelectorAll('.cart-btn').forEach(btn => btn.addEventListener('click', openCart));
    document.querySelectorAll('.close-cart-btn').forEach(btn => btn.addEventListener('click', closeCart));
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // --- FUNCIONES DE GUARDADO Y LÓGICA DEL CARRITO ---
    const saveCart = () => {
        localStorage.setItem('blueDreamsCart', JSON.stringify(cart));
        console.log('LocalStorage actualizado:', localStorage.getItem('blueDreamsCart'));
    };
    
    // --- ¡AQUÍ ESTÁ LA MAGIA! - FUNCIONES DE RENDERIZADO REFORZADAS ---

    // 1. Función para actualizar los totales (ícono y suma)
    const updateCartTotals = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        console.log(`Actualizando totales: ${totalItems} items, $${totalPrice.toFixed(2)}`);

        cartCountElements.forEach(el => {
            el.textContent = totalItems;
        });
        
        if (cartTotalPriceElement) {
            cartTotalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        }
    };

    // 2. Función para renderizar los productos dentro del carrito
    const renderCartItems = () => {
        if (!cartItemsContainer) {
            console.error("Error fatal: Contenedor '.cart-items' no encontrado.");
            return;
        }

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; color:#6b7280; padding: 20px;">Tu pedido está vacío.</p>';
        } else {
            // Construimos todo el HTML de una vez para evitar errores de renderizado
            const allItemsHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-quantity-text">x ${item.quantity}</p>
                    </div>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-item-btn">&times;</button>
                </div>
            `).join('');
            
            cartItemsContainer.innerHTML = allItemsHTML;
        }
    };
    
    // 3. Función principal que une el renderizado
    const fullRender = () => {
        console.log("Iniciando renderizado completo del carrito...");
        renderCartItems();
        updateCartTotals();
        console.log("Renderizado completo.");
    }

    // --- FUNCIONES GLOBALES Y MANEJO DE EVENTOS ---
    window.addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        saveCart();   // Guarda los datos
        fullRender(); // Actualiza la pantalla
        openCart();   // <-- ¡NUEVO! Abre el carrito para mostrar el producto añadido.
    };

    const handleCartClick = (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const itemElement = e.target.closest('.cart-item');
            const productId = itemElement.dataset.id;
            
            cart = cart.filter(item => item.id !== productId);
            
            saveCart();
            fullRender();
        }
    };

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', handleCartClick);
    }
    
    // --- INICIALIZACIÓN ---
    // Dibuja el estado inicial del carrito apenas carga la página.
    fullRender();
});

