document.addEventListener('DOMContentLoaded', () => {

    // Lógica para el menú hamburguesa
    const menuToggle = document.querySelector('.menu-toggle');
    const navCapsula = document.querySelector('.nav-capsula');

    if (menuToggle && navCapsula) {
        menuToggle.addEventListener('click', () => {
            navCapsula.classList.toggle('active');
        });
    }

    // Lógica para el carrito de compras
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');

    if (cartBtn && cartSidebar && closeCartBtn && cartOverlay) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
        });

        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        });

        cartOverlay.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }

    // Lógica para el header con scroll
    const header = document.querySelector('header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});
const mainSlider = document.querySelector('.slider');
    if (mainSlider) {
          let list = mainSlider.querySelector('.list');
         let items = mainSlider.querySelectorAll('.list .item');
                      let prev = document.getElementById('prev');
                            let next = document.getElementById('next');
                                  if (list && items.length > 0 && prev && next) {
                                          let count = items.length;
                                                  let active = 1;
                                                          let width_item = items[active] ? items[active].offsetWidth : 0;
                                                                  function runCarousel() {
                                                                            if (active < 0 || active >= count) return;
                                                                                      prev.style.display = (active === 0) ? 'none' : 'block';
                                                                                                next.style.display = (active === count - 1) ? 'none' : 'block';
                                                                                                          let old_active = mainSlider.querySelector('.item.active');
                                                                                                                    if (old_active) old_active.classList.remove('active');
                                                                                                                              items[active].classList.add('active');
                                                                                                                                        let leftTransform = width_item * (active - 1) * -1;
                                                                                                                                                  list.style.transform = `translateX(${leftTransform}px)`;
                                                                                                                                                          }
                                                                                                                                                                  next.addEventListener('click', () => {
                                                                                                                                                                            active = active >= count - 1 ? count - 1 : active + 1;
                                                                                                                                                                                      runCarousel();
                                                                                                                                                                                              });
                                                                                                                                                                                                      prev.addEventListener('click', () => {
                                                                                                                                                                                                                active = active <= 0 ? 0 : active - 1;
                                                                                                                                                                                                                          runCarousel();
                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                          let resizeObserver = new ResizeObserver(() => {
                                                                                                                                                                                                                                                      width_item = items[active] ? items[active].offsetWidth : 0;
                                                                                                                                                                                                                                                                  runCarousel();
                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                                  resizeObserver.observe(mainSlider);
                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                            let circle = document.querySelector('.circle');
                                                                                                                                                                                                                                                                                                    if (circle && circle.innerText) {
                                                                                                                                                                                                                                                                                                              let textCircle = circle.innerText.split('');
                                                                                                                                                                                                                                                                                                                        circle.innerText = '';
                                                                                                                                                                                                                                                                                                                                  textCircle.forEach((value, key) => {
                                                                                                                                                                                                                                                                                                                                              let newSpan = document.createElement("span");
                                                                                                                                                                                                                                                                                                                                                          newSpan.innerText = value;
                                                                                                                                                                                                                                                                                                                                                                      let rotateThisSpan = (360 / textCircle.length) * (key + 1);
                                                                                                                                                                                                                                                                                                                                                                                  newSpan.style.setProperty('--rotate', rotateThisSpan + 'deg');
                                                                                                                                                                                                                                                                                                                                                                                              circle.appendChild(newSpan);
                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                                                          }