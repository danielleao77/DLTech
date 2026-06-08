import { NavigationManager } from './navigation.js';
import { ScrollAnimationTrigger } from './scroll-animation.js';
import { ContactFormHandler } from './contact-form.js?v=1.0.2';
import { ImageLightbox } from './lightbox.js';
import { CircuitBackground } from './circuit-background.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize OOP-structured components
  const navigation = new NavigationManager();
  const scrollAnimations = new ScrollAnimationTrigger();
  const contactForm = new ContactFormHandler();
  const lightbox = new ImageLightbox();
  const circuitBackground = new CircuitBackground('hero-circuit-canvas');

  console.log('Obsidian Tech SPA initialized successfully.');
});
