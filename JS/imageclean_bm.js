(function () {
  const processedElements = new WeakSet();

  function cleanBackgroundImage(el) {
    const style = el.getAttribute('style');
    const regex = /background-image:\s*url\(["']?(https:\/\/assets\.airtrfx\.com\/cdn-cgi\/image[^"]+\/(https:\/\/[^"')]+))["']?\)/;
    const match = style?.match(regex);

    if (match) {
      const originalURL = match[2];
      const newStyle = style.replace(match[1], originalURL);
      el.setAttribute('style', newStyle);
      console.log(`✅ URL limpia aplicada: ${originalURL}`);
    }
  }

  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (!processedElements.has(el)) {
          cleanBackgroundImage(el);
          processedElements.add(el);
          observer.unobserve(el);
        }
      }
    });
  }, {
    root: null,
    threshold: 0.1
  });

  function observeNewElements() {
    const elements = document.querySelectorAll('.FlightsBooking .bg-center.bg-cover.bg-no-repeat');
    elements.forEach(el => {
      if (!processedElements.has(el)) {
        intersectionObserver.observe(el);
      }
    });
  }

  const mutationObserver = new MutationObserver(() => {
    observeNewElements();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeNewElements);
  } else {
    observeNewElements();
  }
})();
