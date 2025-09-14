document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL SLIDER (Esta parte visual ya funcionaba bien) ---
    const track = document.querySelector('.slider-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.slider-arrow.next');
        const prevButton = document.querySelector('.slider-arrow.prev');
        
        if (slides.length > 0) {
            const slideWidth = slides[0].offsetWidth;
            const gap = 40;
            let currentIndex = 0;

            const updateSliderPosition = () => {
                const amountToMove = currentIndex * (slideWidth + gap);
                track.style.transform = `translateX(-${amountToMove}px)`;
                prevButton.style.display = currentIndex === 0 ? 'none' : 'block';

                const containerWidth = track.parentElement.offsetWidth;
                const totalWidth = track.scrollWidth;
                
                if (amountToMove + containerWidth >= totalWidth) {
                    nextButton.style.display = 'none';
                } else {
                    nextButton.style.display = 'block';
                }
            };

            nextButton.addEventListener('click', () => {
                currentIndex++;
                updateSliderPosition();
            });

            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSliderPosition();
                }
            });
            updateSliderPosition();
        }
    }

    // --- LÓGICA PARA AÑADIR AL CARRITO (VERSIÓN DEFINITIVA) ---
    
    // Función que se encarga de todo el proceso de añadir al carrito
    function handleAddToCart(event) {
        // ¡IMPORTANTE! Prevenimos la acción por defecto del enlace para evitar que la página salte.
        event.preventDefault();

        // Buscamos el contenedor padre más cercano que tiene la información del producto.
        const productElement = event.currentTarget.closest('[data-product-id]');

        if (!productElement) {
            console.error('No se encontraron los datos del producto.');
            return;
        }

        const productData = {
            id: productElement.dataset.productId,
            name: productElement.dataset.productName,
            price: parseFloat(productElement.dataset.productPrice),
            image: productElement.dataset.productImage
        };
        
        // Llamamos a la función global del carrito que está en cart.js
        if (window.addToCart) {
            window.addToCart(productData);
        } else {
            console.error("Error: La función addToCart del carrito no está disponible.");
        }
    }

    // Seleccionamos TODOS los elementos que pueden añadir algo al carrito
    const addToCartTriggers = document.querySelectorAll('.buy-now-btn, .add-to-order');

    // Asignamos un listener a CADA uno de ellos.
    addToCartTriggers.forEach(trigger => {
        trigger.addEventListener('click', handleAddToCart);
    });
});


