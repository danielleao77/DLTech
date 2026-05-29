import { NavigationManager } from './navigation.js';
import { ScrollAnimationTrigger } from './scroll-animation.js';
import { ContactFormHandler } from './contact-form.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize OOP-structured components
  const navigation = new NavigationManager();
  const scrollAnimations = new ScrollAnimationTrigger();
  const contactForm = new ContactFormHandler();

  console.log('Obsidian Tech SPA initialized successfully.');
});
