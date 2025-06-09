(function () {
  const initialized = new WeakSet();

  function openAccordion(el, expand) {
    const button = el.querySelector('.accordion-header');
    const panel = el.querySelector('.accordion-panel');
    const icon = button?.querySelector('i');

    if (!button || !panel) return;

    button.setAttribute('aria-expanded', expand);
    panel.classList.toggle('is-collapsed', !expand);

    if (icon) {
      icon.classList.remove('mdi-chevron-up', 'mdi-chevron-down');
      icon.classList.add(expand ? 'mdi-chevron-up' : 'mdi-chevron-down');
    }
  }

  function initAccordion(el, allItems) {
    if (initialized.has(el)) return;
    initialized.add(el);

    const button = el.querySelector('.accordion-header');
    if (!button) return;

    if (el.hasAttribute('data-open') && el.getAttribute('data-open') === 'true') {
      openAccordion(el, true);
    } else {
      openAccordion(el, false);
    }

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (!el.hasAttribute('data-exclusive') || el.getAttribute('data-exclusive') === 'false') {
        allItems.forEach(item => {
          if (item !== el && (!item.hasAttribute('data-exclusive') || item.getAttribute('data-exclusive') === 'false')) {
            openAccordion(item, false);
          }
        });
      }

      openAccordion(el, !isExpanded);
    });
  }

  function initializeAccordions() {
    const allItems = document.querySelectorAll('.accordion-item');
    allItems.forEach(item => initAccordion(item, allItems));
  }

  function observeDOM() {
    const observer = new MutationObserver(() => {
      const accordions = document.querySelectorAll('.accordion-item');
      if (accordions.length) {
        initializeAccordions();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initializeAccordions();
      observeDOM();
    });
  } else {
    initializeAccordions();
    observeDOM();
  }
})();
