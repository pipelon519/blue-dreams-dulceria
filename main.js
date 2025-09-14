document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navCapsula = document.querySelector('.nav-capsula');
    if (menuToggle && navCapsula) {
      menuToggle.addEventListener('click', () => {
        navCapsula.classList.toggle('active');
      });
    }
  
    // 2. Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
      const SCROLL_THRESHOLD = 60;
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const y = window.scrollY || window.pageYOffset;
            if (y > SCROLL_THRESHOLD) {
              header.classList.add('scrolled');
            } else {
              header.classList.remove('scrolled');
            }
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  
    // 3. Main Carousel Slider (Top of page)
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
  
    // 4. Products Slider (CORREGIDO Y RESTAURADO)
    const productSliderContainer = document.querySelector('.slider-productos');
    if (productSliderContainer) {
      const subSlider = productSliderContainer.querySelector('.sub-slider');
      const products = Array.from(productSliderContainer.querySelectorAll('.producto'));
      const prevBtn = document.getElementById('product-prev');
      const nextBtn = document.getElementById('product-next');
  
      if (subSlider && products.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
  
        function updateProductSlider() {
          if (!products[0] || window.innerWidth <= 600) {
              subSlider.style.transform = `translateX(0px)`;
              return;
          };
          
          const containerWidth = productSliderContainer.offsetWidth;
          const productNode = products[0];
          const productWidth = productNode.offsetWidth;
          const productMargin = parseInt(window.getComputedStyle(productNode).marginRight) || 20;
          const step = productWidth + productMargin;
          const numVisible = Math.floor(containerWidth / step);
          const maxIndex = products.length - numVisible > 0 ? products.length - numVisible : 0;
  
          if (currentIndex > maxIndex) currentIndex = maxIndex;
          if (currentIndex < 0) currentIndex = 0;
          
          const offset = -currentIndex * step;
          subSlider.style.transform = `translateX(${offset}px)`;
  
          prevBtn.disabled = currentIndex === 0;
          nextBtn.disabled = currentIndex === maxIndex;
        }
  
        nextBtn.addEventListener('click', () => {
          currentIndex++;
          updateProductSlider();
        });
  
        prevBtn.addEventListener('click', () => {
          currentIndex--;
          updateProductSlider();
        });
        
        window.addEventListener('resize', updateProductSlider);
        updateProductSlider();
      }
    }
  
    // 5. Lógica para Modal Esencia Cafetera
    const esenciaContenido = {
      "01": {
        title: "Calidad Suprema y Única",
        image: "assets/img14.png",
        text: '<p>Nuestra promesa comienza con la selección de los granos más finos. Cada lote es evaluado rigurosamente por nuestros expertos para asegurar un perfil de sabor excepcional.</p><p>Trabajamos solo con granos de especialidad, aquellos que superan los 85 puntos en la escala de la SCA, garantizando que cada taza sea una experiencia memorable.</p>'
      },
      "02": {
        title: "Origen Selecto y Sostenible",
        image: "assets/img7.jpg",
        text: '<p>Creemos en el café que cuida su origen. Nuestros granos provienen de fincas exclusivas en las altas montañas de Colombia, donde el microclima y la altitud crean las condiciones perfectas.</p><p>Nos asociamos con agricultores que practican la agricultura sostenible, protegiendo la biodiversidad y asegurando un trato justo.</p>'
      },
      "03": {
        title: "Tostado Artesanal",
        image: "assets/img6.jfif",
        text: '<p>El tostado es un arte que define el alma del café. Nuestro Maestro Tostador utiliza técnicas artesanales, ajustando con precisión el tiempo y la temperatura para cada lote.</p><p>A diferencia del tostado industrial, nuestro método garantiza una frescura inigualable y un sabor equilibrado.</p>'
      },
      "04": {
        title: "Equipo Profesional con Cultura",
        image: "assets/img8.jpg",
        text: '<p>Detrás de cada taza hay un equipo de baristas apasionados que no solo sirven café, sino que cuentan una historia. Entienden la cultura y el legado del café colombiano.</p><p>Desde un espresso perfectamente extraído hasta un latte art que te hará sonreír, nuestro equipo está aquí para guiarte en un viaje sensorial.</p>'
      }
    };
    const itemsEsencia = document.querySelectorAll('.esencia2 .item');
    const modalOverlay = document.getElementById('esencia-modal-overlay');
    if (itemsEsencia.length > 0 && modalOverlay) {
      const modalImage = modalOverlay.querySelector('.esencia-modal-image img');
      const modalTitle = modalOverlay.querySelector('.esencia-modal-title');
      const modalBody = modalOverlay.querySelector('.esencia-modal-body');
      itemsEsencia.forEach(item => {
        item.addEventListener('click', () => {
          const dataNum = item.getAttribute('data-num');
          const contenido = esenciaContenido[dataNum];
          if (contenido && modalImage && modalTitle && modalBody) {
            modalImage.src = contenido.image;
            modalTitle.textContent = contenido.title;
            modalBody.innerHTML = contenido.text;
            modalOverlay.classList.add('active');
          }
        });
      });
      modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
          modalOverlay.classList.remove('active');
        }
      });
    }
  });
  