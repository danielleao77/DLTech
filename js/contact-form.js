/**
 * ContactFormHandler Class
 * Handles interactive project type chips, input states, and submit button
 * transmission states with appropriate visual feedback.
 */
export class ContactFormHandler {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.submitBtn = document.getElementById('submit-btn');
    this.chips = document.querySelectorAll('.project-chip');
    this.projectTypeInput = document.getElementById('project-type-input');
    this.inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    
    this.selectedProjectType = '';

    this.init();
  }

  init() {
    if (!this.form) return;

    // Chips selection
    this.chips.forEach(chip => {
      chip.addEventListener('click', (e) => this.handleChipSelection(e));
    });

    // Inputs value monitoring for floating label compatibility (if fallback is needed)
    this.inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });

    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleChipSelection(e) {
    const clickedChip = e.currentTarget;
    const value = clickedChip.getAttribute('data-value');

    // Deselect other chips
    this.chips.forEach(chip => {
      chip.classList.remove('bg-purple-600/30', 'text-purple-300', 'border-purple-500');
      chip.classList.add('bg-slate-900/50', 'text-slate-400', 'border-slate-800');
    });

    // Select clicked chip
    clickedChip.classList.add('bg-purple-600/30', 'text-purple-300', 'border-purple-500');
    clickedChip.classList.remove('bg-slate-900/50', 'text-slate-400', 'border-slate-800');

    this.selectedProjectType = value;
    if (this.projectTypeInput) {
      this.projectTypeInput.value = value;
    }
  }

  validateField(input) {
    if (input.required && !input.value.trim()) {
      this.showError(input, 'Este campo é obrigatório.');
      return false;
    }

    if (input.type === 'email' && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        this.showError(input, 'Por favor, insira um e-mail válido.');
        return false;
      }
    }

    return true;
  }

  showError(input, message) {
    this.clearFieldError(input);
    input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    input.classList.remove('border-slate-800', 'focus:border-purple-500', 'focus:ring-purple-500');

    const errorMsg = document.createElement('span');
    errorMsg.className = 'text-red-500 text-xs mt-1 block error-message';
    errorMsg.innerText = message;
    input.parentNode.appendChild(errorMsg);
  }

  clearFieldError(input) {
    input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
    input.classList.add('border-slate-800', 'focus:border-purple-500', 'focus:ring-purple-500');
    
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    let isValid = true;
    this.inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!this.selectedProjectType) {
      alert('Por favor, selecione um tipo de projeto antes de enviar.');
      isValid = false;
    }

    if (!isValid) return;

    this.setSubmitState('loading');

    try {
      const formData = new FormData(this.form);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        this.setSubmitState('success');
        this.form.reset();
        this.resetChips();
      } else {
        throw new Error(data.message || 'Erro no envio do formulário.');
      }
    } catch (err) {
      this.setSubmitState('error');
      console.error(err);
    }
  }

  setSubmitState(state) {
    if (!this.submitBtn) return;

    const btnText = this.submitBtn.querySelector('.btn-text');
    const btnIcon = this.submitBtn.querySelector('.material-symbols-outlined');

    if (state === 'loading') {
      this.submitBtn.disabled = true;
      this.submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
      if (btnText) btnText.innerText = 'Enviando solicitação...';
      if (btnIcon) {
        btnIcon.innerText = 'sync';
        btnIcon.classList.add('animate-spin');
      }
    } else if (state === 'success') {
      this.submitBtn.disabled = false;
      this.submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      this.submitBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
      this.submitBtn.classList.remove('bg-purple-600', 'hover:bg-purple-700');
      if (btnText) btnText.innerText = 'Solicitação Enviada com Sucesso!';
      if (btnIcon) {
        btnIcon.innerText = 'check_circle';
        btnIcon.classList.remove('animate-spin');
      }

      // Reset to original state after 3 seconds
      setTimeout(() => {
        this.submitBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
        this.submitBtn.classList.add('bg-purple-600', 'hover:bg-purple-700');
        if (btnText) btnText.innerText = 'Solicitar Análise Técnica';
        if (btnIcon) btnIcon.innerText = 'send';
      }, 3000);
    } else if (state === 'error') {
      this.submitBtn.disabled = false;
      this.submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      this.submitBtn.classList.add('bg-red-600', 'hover:bg-red-700');
      if (btnText) btnText.innerText = 'Falha ao enviar';
      if (btnIcon) {
        btnIcon.innerText = 'error';
        btnIcon.classList.remove('animate-spin');
      }
    }
  }

  resetChips() {
    this.chips.forEach(chip => {
      chip.classList.remove('bg-purple-600/30', 'text-purple-300', 'border-purple-500');
      chip.classList.add('bg-slate-900/50', 'text-slate-400', 'border-slate-800');
    });
    this.selectedProjectType = '';
    if (this.projectTypeInput) {
      this.projectTypeInput.value = '';
    }
  }
}
