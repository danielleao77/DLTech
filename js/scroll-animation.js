/**
 * ScrollAnimationTrigger Class
 * Uses IntersectionObserver to trigger animations on scroll
 * for elements containing the 'reveal-on-scroll' class.
 */
export class ScrollAnimationTrigger {
  constructor() {
    this.elementsToObserve = document.querySelectorAll('.reveal-on-scroll');
    this.options = {
      root: null, // Viewport
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before it fully hits the viewport
    };
    
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: make all elements visible if Intersection Observer is not supported
      this.elementsToObserve.forEach(element => {
        element.classList.add('active');
      });
      return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, this.options);

    this.elementsToObserve.forEach(element => {
      observer.observe(element);
    });
  }
}
