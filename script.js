(function () {
  var nav, observer, mobileMenu, mobileLinks, lightbox, lightboxImg, lightboxPrev, lightboxNext;
  var lightboxImages, currentImageIndex;

  function init() {
    initNav();
    initFadeIn();
    initMobileMenu();
    initBookingForm();
    initLightbox();
    initBackToTop();
    initWhatsAppFloat();
    initHeroEntrance();
  }

  function initNav() {
    nav = document.getElementById('nav');
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  function initFadeIn() {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale').forEach(function (el) { observer.observe(el); });
  }

  function initMobileMenu() {
    var toggle = document.getElementById('nav-toggle');
    mobileMenu = document.getElementById('mobile-menu');
    mobileLinks = mobileMenu.querySelectorAll('a');

    function openMenu() {
      toggle.classList.add('active');
      mobileMenu.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
      document.body.style.overflow = 'hidden';
      if (mobileLinks.length) mobileLinks[0].focus();
    }

    function closeMenu() {
      toggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
      toggle.focus();
    }

    toggle.addEventListener('click', function () {
      mobileMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    mobileMenu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      if (e.key === 'Tab') {
        var focusable = Array.from(mobileLinks);
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  function initBookingForm() {
    var btn = document.getElementById('booking-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var nome = document.getElementById('nome');
      var whatsapp = document.getElementById('whatsapp');
      var servico = document.getElementById('servico');
      var data = document.getElementById('data');
      var obs = document.getElementById('obs');
      var errorFields = [nome, whatsapp, servico];
      var valid = true;

      errorFields.forEach(function (f) {
        f.classList.remove('error', 'success');
        var err = f.nextElementSibling;
        if (err && err.classList.contains('form-error')) err.textContent = '';
        if (!f.value.trim()) {
          f.classList.add('error');
          if (err && err.classList.contains('form-error')) err.textContent = 'Campo obrigat\xf3rio';
          valid = false;
        } else {
          f.classList.add('success');
        }
      });

      if (!valid) return;

      var texto = 'Ol\xe1 Leonardo! Gostaria de solicitar um agendamento:%0A%0A' +
        '*Nome:* ' + nome.value + '%0A' +
        '*WhatsApp:* ' + whatsapp.value + '%0A' +
        '*Servi\xe7o:* ' + servico.value + '%0A' +
        '*Data:* ' + data.value + '%0A' +
        '*Observa\xe7\xf5es:* ' + obs.value;

      var numero = '559840000000';
      window.open('https://wa.me/' + numero + '?text=' + texto, '_blank');
    });
  }

  function initLightbox() {
    lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightboxImg = lightbox.querySelector('img');
    lightboxPrev = lightbox.querySelector('.prev');
    lightboxNext = lightbox.querySelector('.next');
    lightboxImages = [];
    currentImageIndex = 0;

    function setLightboxImage(src) {
      lightboxImg.classList.add('lb-fade');
      setTimeout(function () {
        lightboxImg.src = src;
        lightboxImg.classList.remove('lb-fade');
      }, 220);
    }

    function closeLightbox() {
      lightbox.style.pointerEvents = 'none';
      lightbox.classList.remove('active');
      setTimeout(function () {
        lightbox.style.pointerEvents = '';
        document.body.style.overflow = '';
      }, 300);
    }

    document.querySelectorAll('.galeria-item').forEach(function (item, i) {
      var img = item.querySelector('img');
      if (img) {
        lightboxImages.push(img.src);
        item.addEventListener('click', function () {
          currentImageIndex = i;
          lightboxImg.src = lightboxImages[currentImageIndex];
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      }
    });

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
        setLightboxImage(lightboxImages[currentImageIndex]);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', function (e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
        setLightboxImage(lightboxImages[currentImageIndex]);
      });
    }

    lightbox.addEventListener('click', function () {
      closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      }
      if (e.key === 'ArrowLeft') lightboxPrev && lightboxPrev.click();
      if (e.key === 'ArrowRight') lightboxNext && lightboxNext.click();
    });
  }

  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 400);
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initWhatsAppFloat() {
    var floatBtn = document.getElementById('whatsapp-float');
    if (!floatBtn) return;

    floatBtn.addEventListener('click', function (e) {
      var numero = '559840000000';
      window.open('https://wa.me/' + numero, '_blank');
    });
  }

  function initHeroEntrance() {
    var hero = document.querySelector('.hero');
    if (!hero) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.add('hero-loaded');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();