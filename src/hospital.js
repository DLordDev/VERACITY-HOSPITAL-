/**
 * @license
 * Veracity Hospital - Website Core Scripts
 * Pure Vanilla JavaScript (No React, No Frameworks)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // Appointment Form Interaction
    const appointmentForm = document.getElementById('appointment-form');
    const notification = document.getElementById('appointment-success-msg');

    if (appointmentForm && notification) {
      appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Extract values
        const nameInput = document.getElementById('patient-name');
        const phoneInput = document.getElementById('patient-phone');
        const deptInput = document.getElementById('appointment-department');
        const dateInput = document.getElementById('appointment-date');

        const patientName = nameInput ? nameInput.value.trim() : 'Patient';
        const department = deptInput ? deptInput.value : 'General Consultation';

        // Feedback to user
        notification.style.display = 'block';
        notification.innerHTML = `
          ✅ <strong>Appointment Request Received!</strong><br>
          Thank you, <strong>${patientName}</strong>. Our records desk for <strong>${department}</strong> will contact you via phone shortly to confirm your booking slot. For emergency cases, please call <a href="tel:08098114106" style="color:#0F766E; text-decoration:underline;">08098114106</a>.
        `;

        // Reset form
        appointmentForm.reset();

        // Scroll notification into view
        notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    // Mobile Navigation Off-Canvas Side Drawer (Clean, Accessible, Non-overlapping)
    const mobileToggle = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
    const mobileCloseBtn = document.getElementById('mobile-drawer-close');

    if (mobileToggle && mobileDrawer) {
      const closeMobileDrawer = () => {
        mobileDrawer.classList.remove('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (mobileBackdrop) {
          mobileBackdrop.classList.remove('is-active');
          mobileBackdrop.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.remove('drawer-open');
      };

      const openMobileDrawer = () => {
        mobileDrawer.classList.add('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        mobileToggle.setAttribute('aria-expanded', 'true');
        if (mobileBackdrop) {
          mobileBackdrop.classList.add('is-active');
          mobileBackdrop.setAttribute('aria-hidden', 'false');
        }
        document.body.classList.add('drawer-open');
      };

      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileDrawer.classList.contains('is-open');
        if (isOpen) {
          closeMobileDrawer();
        } else {
          openMobileDrawer();
        }
      });

      if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', () => {
          closeMobileDrawer();
        });
      }

      if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', () => {
          closeMobileDrawer();
        });
      }

      // Close drawer when any nav link or CTA inside it is clicked
      const drawerLinks = mobileDrawer.querySelectorAll('a');
      drawerLinks.forEach((link) => {
        link.addEventListener('click', () => {
          closeMobileDrawer();
        });
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
          closeMobileDrawer();
        }
      });

      // Automatically reset if viewport expands past mobile breakpoint
      window.addEventListener('resize', () => {
        if (window.innerWidth > 960 && mobileDrawer.classList.contains('is-open')) {
          closeMobileDrawer();
        }
      });
    }

    // Interactive Facilities & Infrastructure Carousel (8 Slides)
    const initFacilitiesCarousel = () => {
      const track = document.getElementById('carousel-track');
      const prevBtn = document.getElementById('carousel-prev-btn');
      const nextBtn = document.getElementById('carousel-next-btn');
      const dotsContainer = document.getElementById('carousel-dots-container');
      const currentIndexEl = document.getElementById('carousel-current-index');
      const carouselSection = document.getElementById('facilities-carousel');

      if (!track) return;

      const slides = Array.from(track.querySelectorAll('.carousel-slide'));
      const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel-dot')) : [];
      const totalSlides = slides.length;
      if (totalSlides === 0) return;

      let currentIndex = 0;
      let autoplayTimer = null;
      const AUTOPLAY_INTERVAL = 6000;

      const updateCarouselView = (newIndex) => {
        currentIndex = (newIndex + totalSlides) % totalSlides;

        // Move track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active slide state
        slides.forEach((slide, idx) => {
          const isActive = idx === currentIndex;
          slide.classList.toggle('active', isActive);
          slide.setAttribute('aria-hidden', (!isActive).toString());
        });

        // Update dot indicators
        dots.forEach((dot, idx) => {
          const isActive = idx === currentIndex;
          dot.classList.toggle('active', isActive);
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update counter badge (e.g., 01, 02, etc.)
        if (currentIndexEl) {
          currentIndexEl.textContent = String(currentIndex + 1).padStart(2, '0');
        }
      };

      // Button handlers
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          updateCarouselView(currentIndex + 1);
          restartAutoplay();
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          updateCarouselView(currentIndex - 1);
          restartAutoplay();
        });
      }

      // Dot click handlers
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          updateCarouselView(idx);
          restartAutoplay();
        });
      });

      // Keyboard navigation when carousel or its controls have focus
      if (carouselSection) {
        carouselSection.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') {
            updateCarouselView(currentIndex + 1);
            restartAutoplay();
          } else if (e.key === 'ArrowLeft') {
            updateCarouselView(currentIndex - 1);
            restartAutoplay();
          }
        });
      }

      // Touch swipe gestures
      let touchStartX = 0;
      let touchEndX = 0;

      track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 40) {
          if (diffX > 0) {
            updateCarouselView(currentIndex + 1); // Swipe left -> next
          } else {
            updateCarouselView(currentIndex - 1); // Swipe right -> prev
          }
        }
        startAutoplay();
      }, { passive: true });

      // Autoplay cycle
      const startAutoplay = () => {
        if (!autoplayTimer) {
          autoplayTimer = setInterval(() => {
            updateCarouselView(currentIndex + 1);
          }, AUTOPLAY_INTERVAL);
        }
      };

      const stopAutoplay = () => {
        if (autoplayTimer) {
          clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      };

      const restartAutoplay = () => {
        stopAutoplay();
        startAutoplay();
      };

      if (carouselSection) {
        carouselSection.addEventListener('mouseenter', stopAutoplay);
        carouselSection.addEventListener('mouseleave', startAutoplay);
      }

      // Initial state
      updateCarouselView(0);
      startAutoplay();
    };

    initFacilitiesCarousel();

    // Subtle Intersection-Observer based entrance animations for cards
    const initScrollEntranceAnimations = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const elementsToAnimate = [
        ...document.querySelectorAll('.dept-photo-card'),
        ...document.querySelectorAll('.doctor-profile-card'),
        ...document.querySelectorAll('.trust-card'),
        ...document.querySelectorAll('.stat-cell'),
        document.getElementById('nigerian-team-showcase'),
        document.querySelector('.veracity-carousel-wrapper')
      ].filter(Boolean);

      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        // Fallback: immediately show without animation
        elementsToAnimate.forEach((el) => {
          el.classList.add('is-revealed');
        });
        return;
      }

      elementsToAnimate.forEach((el, index) => {
        el.classList.add('reveal-on-scroll');
        const delayClass = `reveal-delay-${(index % 4) + 1}`;
        el.classList.add(delayClass);
      });

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.08,
      };

      const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      elementsToAnimate.forEach((el) => {
        cardObserver.observe(el);
      });
    };

    initScrollEntranceAnimations();

    // Synchronized Doctor booking button interaction
    const initDoctorBookingButtons = () => {
      const bookButtons = document.querySelectorAll('.btn-doctor-book');
      const deptSelect = document.getElementById('appointment-department');
      const appointmentSection = document.getElementById('appointment');
      
      bookButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const dept = btn.getAttribute('data-doctor-department');
          if (dept && deptSelect) {
            for (let i = 0; i < deptSelect.options.length; i++) {
              if (deptSelect.options[i].value === dept || deptSelect.options[i].value.includes(dept)) {
                deptSelect.selectedIndex = i;
                break;
              }
            }
          }
          if (appointmentSection) {
            e.preventDefault();
            appointmentSection.scrollIntoView({ behavior: 'smooth' });
            const patientNameInput = document.getElementById('patient-name');
            if (patientNameInput) {
              setTimeout(() => patientNameInput.focus(), 450);
            }
          }
        });
      });
    };

    initDoctorBookingButtons();
  });
})();
