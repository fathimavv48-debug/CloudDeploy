'use strict';

// Update the footer year automatically.
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile navigation: open/close and close after choosing a link.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
function closeMenu() {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
}
menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav') && navLinks.classList.contains('open')) closeMenu();
});

// Project details use a native, keyboard-accessible modal dialog.
const projects = {
  documind: {
    title: 'DocuMind',
    description: 'An academic AWS project for document uploads, text-based verification checks, duplicate detection, document status tracking, and administrative review. It demonstrates cloud storage and asynchronous processing.',
    technologies: 'Amazon S3, DynamoDB, Lambda, SQS, SES, Cognito, Python, Flask'
  },
  innercircle: {
    title: 'InnerCircle+',
    description: 'An academic emotional-support application concept with anonymous stories, mood check-ins, and community-oriented features.',
    technologies: 'Flutter, Node.js, Express, MongoDB'
  },
  clouddeploy: {
    title: 'CloudDeploy',
    description: 'A static portfolio website built with HTML, CSS, and JavaScript. The project aims to publish site updates automatically from GitHub to Azure Static Web Apps using GitHub Actions. Azure deployment will be completed after account setup.',
    technologies: 'HTML, CSS, JavaScript, GitHub Actions, Azure Static Web Apps'
  }
};
const dialog = document.getElementById('project-dialog');
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    document.getElementById('dialog-title').textContent = project.title;
    document.getElementById('dialog-description').textContent = project.description;
    document.getElementById('dialog-technologies').textContent = project.technologies;
    dialog.showModal();
  });
});
dialog.querySelectorAll('.dialog-close, .dialog-done').forEach(button => {
  button.addEventListener('click', () => dialog.close());
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

// Copy the public GitHub profile URL with an older-browser fallback.
const githubUrl = 'https://github.com/fathimavv48-debug';
const copyStatus = document.getElementById('copy-status');
document.getElementById('copy-github').addEventListener('click', async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(githubUrl);
    } else {
      const field = document.createElement('textarea');
      field.value = githubUrl;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      if (!copied) throw new Error('Copy not supported');
    }
    copyStatus.textContent = 'GitHub link copied!';
  } catch (error) {
    copyStatus.textContent = 'Could not copy automatically. Use this link: ' + githubUrl;
  }
});
