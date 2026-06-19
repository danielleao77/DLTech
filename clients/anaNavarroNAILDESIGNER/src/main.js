document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Ícones Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Comportamento do Navbar no Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('bg-luxury-bg/95', 'shadow-sm', 'border-luxury-border/50');
      navbar.classList.remove('bg-luxury-bg/80', 'border-transparent');
    } else {
      navbar.classList.remove('bg-luxury-bg/95', 'shadow-sm', 'border-luxury-border/50');
      navbar.classList.add('bg-luxury-bg/80', 'border-transparent');
    }
  });

  // 3. Menu Mobile Hambúrguer
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuBtn && mobileMenu) {
    const iconEl = menuBtn.querySelector('i');
    
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
      
      // Mudar ícone de Menu para X
      if (iconEl) {
        if (isExpanded) {
          iconEl.setAttribute('data-lucide', 'menu');
        } else {
          iconEl.setAttribute('data-lucide', 'x');
        }
        lucide.createIcons();
      }
    });

    // Fechar menu mobile ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
        if (iconEl) {
          iconEl.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }
      });
    });
  }

  // 4. Filtros Dinâmicos da Galeria
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const portfolioGrid = document.getElementById('portfolio-grid');
  const antesDepoisSection = document.getElementById('antes-depois-section');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualizar botões ativos
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-luxury-accent', 'text-white', 'border-luxury-accent');
        b.classList.add('bg-white', 'text-luxury-text', 'border-luxury-border');
      });
      btn.classList.add('active', 'bg-luxury-accent', 'text-white', 'border-luxury-accent');
      btn.classList.remove('bg-white', 'text-luxury-text', 'border-luxury-border');

      const filterValue = btn.getAttribute('data-filter');

      // Filtrar itens
      portfolioItems.forEach(item => {
        // Se for filtro "antesdepois"
        if (filterValue === 'antesdepois') {
          if (item.classList.contains('antesdepois')) {
            item.style.display = 'block';
            // Ajustar grid da galeria para dar destaque total
            if (portfolioGrid) portfolioGrid.style.display = 'none';
            if (antesDepoisSection) {
              antesDepoisSection.classList.remove('lg:col-span-4');
              antesDepoisSection.classList.add('lg:col-span-12', 'max-w-xl', 'mx-auto');
            }
          } else {
            item.style.display = 'none';
          }
        } 
        // Se for "todas"
        else if (filterValue === 'todas') {
          item.style.display = 'block';
          if (portfolioGrid) portfolioGrid.style.display = 'grid';
          if (antesDepoisSection) {
            antesDepoisSection.classList.remove('lg:col-span-12', 'max-w-xl', 'mx-auto');
            antesDepoisSection.classList.add('lg:col-span-4');
          }
        } 
        // Se for outros filtros ("alongamentos", "nailart")
        else {
          if (portfolioGrid) portfolioGrid.style.display = 'grid';
          if (antesDepoisSection) {
            antesDepoisSection.classList.remove('lg:col-span-12', 'max-w-xl', 'mx-auto');
            antesDepoisSection.classList.add('lg:col-span-4');
          }
          
          if (item.classList.contains(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });

  // 5. Slider Antes/Depois Interativo
  const sliderContainer = document.querySelector('.slider-container');
  const sliderClip = document.getElementById('slider-clip');
  const sliderHandle = document.getElementById('slider-handle');
  const sliderBtn = document.getElementById('slider-btn');

  if (sliderContainer && sliderClip && sliderHandle && sliderBtn) {
    let isSliding = false;

    const startSlide = () => {
      isSliding = true;
    };

    const endSlide = () => {
      isSliding = false;
    };

    const moveSlide = (e) => {
      if (!isSliding) return;

      const rect = sliderContainer.getBoundingClientRect();
      let pageX = 0;

      // Suporte a toque (mobile) e mouse (desktop)
      if (e.touches) {
        pageX = e.touches[0].clientX;
      } else {
        pageX = e.clientX;
      }

      // Calcular posição relativa em porcentagem
      let position = ((pageX - rect.left) / rect.width) * 100;

      // Limitar a barra dentro do container
      if (position < 0) position = 0;
      if (position > 100) position = 100;

      // Atualizar clip-path do slide sobreposto (Antes)
      sliderClip.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
      
      // Mover a barra de arraste e o botão
      sliderHandle.style.left = `${position}%`;
      sliderBtn.style.left = `${position}%`;
    };

    // Eventos Mouse
    sliderHandle.addEventListener('mousedown', startSlide);
    window.addEventListener('mouseup', endSlide);
    window.addEventListener('mousemove', moveSlide);

    // Eventos Touch (Mobile)
    sliderHandle.addEventListener('touchstart', startSlide);
    window.addEventListener('touchend', endSlide);
    window.addEventListener('touchmove', moveSlide);

    // Permitir arrastar clicando no container
    sliderContainer.addEventListener('click', (e) => {
      isSliding = true;
      moveSlide(e);
      isSliding = false;
    });
  }

  // 6. Carrossel de Depoimentos (Chevron Controls + Deslizar)
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (track && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cardWidth = track.firstElementChild.getBoundingClientRect().width;
      track.scrollBy({
        left: cardWidth + 32, // Card + Gap
        behavior: 'smooth'
      });
    });

    prevBtn.addEventListener('click', () => {
      const cardWidth = track.firstElementChild.getBoundingClientRect().width;
      track.scrollBy({
        left: -(cardWidth + 32),
        behavior: 'smooth'
      });
    });
  }

  // 7. FAQ Acordeão (Expansão Suave)
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const content = trigger.nextElementSibling;
      const icon = trigger.querySelector('[data-lucide="chevron-down"]');

      // Fechar outros itens abertos (opcional, mas garante elegância)
      faqTriggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherContent = otherTrigger.nextElementSibling;
          otherContent.style.maxHeight = null;
          otherContent.setAttribute('aria-hidden', 'true');
          const otherIcon = otherTrigger.querySelector('[data-lucide="chevron-down"]');
          if (otherIcon) {
            otherIcon.style.transform = 'rotate(0deg)';
          }
        }
      });

      // Toggle item atual
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
        content.setAttribute('aria-hidden', 'true');
        if (icon) {
          icon.style.transform = 'rotate(0deg)';
        }
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.setAttribute('aria-hidden', 'false');
        if (icon) {
          icon.style.transform = 'rotate(180deg)';
        }
      }
    });
  });
});
