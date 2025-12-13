// Contact Form Handler
export const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn');
        const messageDiv = document.getElementById('form-message');
        const formData = new FormData(form);

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Using Formspree - replace with your Formspree endpoint
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                messageDiv.textContent = 'Thank you for your message! I\'ll get back to you soon.';
                messageDiv.className = 'form-message success';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            messageDiv.textContent = 'Oops! There was a problem sending your message. Please try again.';
            messageDiv.className = 'form-message error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';

            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    });

    // Form validation
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
};

const validateField = (field) => {
    const value = field.value.trim();

    if (field.hasAttribute('required') && !value) {
        field.style.borderColor = '#ef4444';
        return false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.style.borderColor = '#ef4444';
            return false;
        }
    }

    field.style.borderColor = 'var(--border)';
    return true;
};
