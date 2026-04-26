import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      const card = e.target.closest('.prompt-card');
      const promptBody = card.querySelector('.prompt-body');

      const paragraphs = Array.from(promptBody.querySelectorAll('p'));
      const textToCopy = paragraphs.map(p => p.textContent).join('\n\n');

      const label = button.querySelector('span');

      try {
        await navigator.clipboard.writeText(textToCopy);

        const originalText = label.textContent;
        label.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(() => {
          label.textContent = originalText;
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        label.textContent = 'Failed';
        setTimeout(() => {
          label.textContent = 'Copy Prompt';
        }, 2000);
      }
    });
  });
});
