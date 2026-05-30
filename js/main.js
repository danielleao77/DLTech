import { NavigationManager } from './navigation.js';
import { ScrollAnimationTrigger } from './scroll-animation.js';
import { ContactFormHandler } from './contact-form.js';
import { ImageLightbox } from './lightbox.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize OOP-structured components
  const navigation = new NavigationManager();
  const scrollAnimations = new ScrollAnimationTrigger();
  const contactForm = new ContactFormHandler();
  const lightbox = new ImageLightbox();

  console.log('Obsidian Tech SPA initialized successfully.');
});
