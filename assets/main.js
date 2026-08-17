(function () {
  var nav = document.getElementById('site-nav');
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.nav-panel');

  if (!nav) return;

  function setNavOpen(open) {
    nav.classList.toggle('nav-open', open);
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('nav-no-scroll', open);
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      setNavOpen(!nav.classList.contains('nav-open'));
    });

    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setNavOpen(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNavOpen(false);
    });
  }

  function onScroll() {
    nav.classList.toggle('nav-scrolled', window.scrollY > 24);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-nav]').forEach(function (link) {
    var target = link.getAttribute('data-nav');
    if (
      (target === 'home' && (path === '' || path === 'index.html')) ||
      (target !== 'home' && path === target)
    ) {
      link.classList.add('is-active');
    }
  });
})();
