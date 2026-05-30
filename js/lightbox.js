/**
 * ImageLightbox Class
 * Creates a dynamic modal overlay (lightbox) to display large versions
 * of images when clicked.
 */
export class ImageLightbox {
  constructor() {
    this.triggers = document.querySelectorAll('.lightbox-trigger');
    this.modal = null;
    this.modalImg = null;
    this.closeBtn = null;
    
    this.init();
  }

  init() {
    if (this.triggers.length === 0) return;

    // Create modal element dynamically so we don't clutter the HTML files
    this.createModal();

    // Attach click listener to triggers
    this.triggers.forEach(img => {
      img.classList.add('cursor-zoom-in');
      img.addEventListener('click', (e) => this.open(e));
    });
  }

  createModal() {
    // Create overlay container
    this.modal = document.createElement('div');
    this.modal.id = 'lightbox-modal';
    this.modal.className = 'fixed inset-0 bg-slate-950/90 z-50 hidden flex items-center justify-center p-4 backdrop-blur-md opacity-0 transition-opacity duration-300';
    
    // Create image container/image
    this.modalImg = document.createElement('img');
    this.modalImg.className = 'max-w-full max-h-[90vh] rounded-lg border border-slate-800 shadow-2xl transition-transform duration-300 scale-95';
    this.modal.appendChild(this.modalImg);

    // Create close button
    this.closeBtn = document.createElement('button');
    this.closeBtn.className = 'absolute top-6 right-6 text-white bg-slate-900/50 hover:bg-slate-850 border border-slate-800 p-2 rounded-full flex items-center justify-center active:scale-95 transition-all';
    this.closeBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
    this.modal.appendChild(this.closeBtn);

    // Append to body
    document.body.appendChild(this.modal);

    // Close events
    this.closeBtn.addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // ESC key close support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open(e) {
    const src = e.currentTarget.getAttribute('src');
    const alt = e.currentTarget.getAttribute('alt');

    if (this.modal && this.modalImg) {
      this.modalImg.setAttribute('src', src);
      this.modalImg.setAttribute('alt', alt);
      
      this.modal.classList.remove('hidden');
      // Delay opacity class to trigger css transition
      setTimeout(() => {
        this.modal.classList.add('opacity-100');
        this.modalImg.classList.add('scale-100');
        this.modalImg.classList.remove('scale-95');
      }, 10);
      document.body.classList.add('overflow-hidden');
    }
  }

  close() {
    if (this.modal && this.modalImg) {
      this.modal.classList.remove('opacity-100');
      this.modalImg.classList.remove('scale-100');
      this.modalImg.classList.add('scale-95');
      
      // Delay hiding element until transition ends
      setTimeout(() => {
        this.modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }, 300);
    }
  }
}
