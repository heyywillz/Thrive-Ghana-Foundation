document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Drawer Toggle & Auto Close ---
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-drawer');

  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
      const isExpanded = !mobileNav.classList.contains('hidden');
      toggleBtn.innerHTML = isExpanded
        ? '<i class="fa-solid fa-xmark text-2xl text-white"></i>'
        : '<i class="fa-solid fa-bars text-2xl text-white"></i>';
    });

    // Auto-close mobile drawer when any link inside it is clicked
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl text-white"></i>';
      });
    });
  }

  // --- Scroll to Top Floating Button ---
  const scrollTopBtn = document.getElementById('scroll-to-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.remove('hidden', 'opacity-0');
        scrollTopBtn.classList.add('flex', 'opacity-100');
      } else {
        scrollTopBtn.classList.add('opacity-0');
        setTimeout(() => {
          if (window.scrollY <= 400) scrollTopBtn.classList.add('hidden');
        }, 200);
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Homepage Hero Slider Carousel (Only for Index page) ---
  const heroBgImg = document.getElementById('hero-bg-img');
  const heroContentBox = document.getElementById('hero-content-box');
  const heroTagline = document.getElementById('hero-tagline');
  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  const heroBtnText = document.getElementById('hero-btn-text');
  const heroProgressBar = document.getElementById('hero-progress-bar');
  const heroPrevBtn = document.getElementById('hero-prev');
  const heroNextBtn = document.getElementById('hero-next');

  if (heroContentBox && heroBgImg) {
    const heroSlides = [
      {
        bg: 'assets/gallery-1.jpg',
        tagline: 'Together for Inclusive Development',
        title: 'Partnerships that Drive Sustainable Change',
        desc: 'Collaborate with us to champion civic responsibility, economic empowerment, and inclusive leadership.',
        btn: 'Get Involved'
      },
      {
        bg: 'assets/gallery-3.jpg',
        tagline: 'Empowering Women & Girls',
        title: 'Building the Next Generation of Women Leaders',
        desc: 'We nurture and equip women in Zongo and settler communities with the skills, confidence, and opportunities to lead change.',
        btn: 'Join Our Mission'
      },
      {
        bg: 'assets/gallery-9.jpg',
        tagline: 'Clean Water & Sustainable Health',
        title: 'Providing Safe Water & Healthcare for Communities',
        desc: 'Drilling solar-powered mechanized boreholes and deploying mobile health clinics across rural villages in Ghana.',
        btn: 'Explore Impact'
      }
    ];

    let currentSlide = 0;
    let slideTimer = null;

    function updateSlide(index) {
      currentSlide = (index + heroSlides.length) % heroSlides.length;
      const slide = heroSlides[currentSlide];

      // Smooth horizontal slide-out motion to left
      heroContentBox.classList.add('-translate-x-10', 'opacity-0');
      heroContentBox.classList.remove('translate-x-0', 'opacity-100');

      setTimeout(() => {
        heroBgImg.style.backgroundImage = `url('${slide.bg}')`;
        // Reset zoom-out animation only on homepage
        heroBgImg.classList.remove('animate-hero-zoomout');
        void heroBgImg.offsetWidth; // trigger reflow
        heroBgImg.classList.add('animate-hero-zoomout');

        if (heroTagline) heroTagline.textContent = slide.tagline;
        if (heroTitle) heroTitle.textContent = slide.title;
        if (heroDesc) heroDesc.textContent = slide.desc;
        if (heroBtnText) heroBtnText.textContent = slide.btn;
        if (heroProgressBar) {
          heroProgressBar.style.height = `${((currentSlide + 1) / heroSlides.length) * 100}%`;
        }

        // Prepare slide-in from right
        heroContentBox.classList.remove('-translate-x-10');
        heroContentBox.classList.add('translate-x-10');

        requestAnimationFrame(() => {
          setTimeout(() => {
            heroContentBox.classList.remove('translate-x-10', 'opacity-0');
            heroContentBox.classList.add('translate-x-0', 'opacity-100');
          }, 30);
        });
      }, 300);
    }

    function startAutoSlide() {
      stopAutoSlide();
      slideTimer = setInterval(() => {
        updateSlide(currentSlide + 1);
      }, 5500);
    }

    function stopAutoSlide() {
      if (slideTimer) clearInterval(slideTimer);
    }

    if (heroPrevBtn) {
      heroPrevBtn.addEventListener('click', () => {
        updateSlide(currentSlide - 1);
        startAutoSlide();
      });
    }

    if (heroNextBtn) {
      heroNextBtn.addEventListener('click', () => {
        updateSlide(currentSlide + 1);
        startAutoSlide();
      });
    }

    startAutoSlide();
  }

  // --- Animated Stat Counters ---
  const statNumbers = document.querySelectorAll('.stat-counter');
  if (statNumbers.length > 0) {
    const observerOptions = { threshold: 0.5 };
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute('data-target') || target.innerText, 10);
          let startValue = 0;
          const duration = 1500;
          const stepTime = Math.max(10, Math.floor(duration / endValue));

          const counter = setInterval(() => {
            startValue += 1;
            target.innerText = startValue;
            if (startValue >= endValue) {
              target.innerText = endValue;
              clearInterval(counter);
            }
          }, stepTime);

          observer.unobserve(target);
        }
      });
    }, observerOptions);

    statNumbers.forEach(num => counterObserver.observe(num));
  }

  // --- Modal Logic (Donate Modal) ---
  const donateModal = document.getElementById('donate-modal');
  const openDonateBtns = document.querySelectorAll('.open-donate-modal');
  const closeDonateBtns = document.querySelectorAll('.close-donate-modal');

  openDonateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (donateModal) {
        donateModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeDonateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (donateModal) {
        donateModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  if (donateModal) {
    donateModal.addEventListener('click', (e) => {
      if (e.target === donateModal) {
        donateModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Donation Amount Selection
  const amountBtns = document.querySelectorAll('.donate-amount-btn');
  const customAmountInput = document.getElementById('custom-donate-amount');

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => {
        b.classList.remove('bg-brand-pink', 'text-white', 'border-brand-pink');
        b.classList.add('bg-gray-100', 'text-gray-800', 'border-gray-300');
      });
      btn.classList.remove('bg-gray-100', 'text-gray-800', 'border-gray-300');
      btn.classList.add('bg-brand-pink', 'text-white', 'border-brand-pink');
      if (customAmountInput) customAmountInput.value = '';
    });
  });

  // --- Filter Tabs (Gallery & Events) ---
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const filterItems = document.querySelectorAll('.filterable-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-pink', 'text-white');
        b.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
      });

      btn.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');
      btn.classList.add('bg-brand-pink', 'text-white');

      filterItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // --- Lightbox Modal (Gallery) ---
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const galleryTriggers = document.querySelectorAll('.lightbox-trigger');
  const closeLightboxBtns = document.querySelectorAll('.close-lightbox');

  galleryTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = trigger.getAttribute('data-src') || trigger.querySelector('img')?.src;
      const caption = trigger.getAttribute('data-caption') || trigger.querySelector('img')?.alt || '';

      if (lightboxModal && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeLightboxBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // --- Toast Notification helper ---
  window.showToast = function (message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    toast.className = `flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl text-white transform transition-all duration-300 translate-y-4 opacity-0 ${
      isSuccess ? 'bg-emerald-600' : 'bg-brand-pink'
    }`;
    toast.innerHTML = `
      <i class="${isSuccess ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'} text-xl"></i>
      <span class="font-medium text-sm">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    }, 50);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // Form handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin mr-2"></i> Submitting...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          form.reset();
          if (donateModal && donateModal.classList.contains('active')) {
            donateModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            showToast('Thank you! Your donation request has been received.');
          } else {
            showToast('Thank you! Your message has been sent.');
          }
        }, 1200);
      }
    });
  });
});
