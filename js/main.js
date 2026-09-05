(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  // ---------- nav toggle (mobile) ----------
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // ---------- scroll reveal ----------
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // ---------- active nav link on scroll ----------
  var sections = ['work', 'what-i-do', 'testimonials', 'experience', 'skills'].map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);
  var navAnchors = {};
  document.querySelectorAll('.nav-links a[href*="#"]').forEach(function (a) {
    var id = a.getAttribute('href').split('#')[1];
    if (id) navAnchors[id] = a;
  });
  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = navAnchors[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.values(navAnchors).forEach(function (a) { a.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  // ---------- hero panel parallax ----------
  var heroPanels = document.querySelectorAll('.hero-panels .panel');
  var panelsWrap = document.querySelector('.hero-panels');
  if (panelsWrap && heroPanels.length && !reduceMotion && !isCoarsePointer) {
    panelsWrap.addEventListener('mousemove', function (e) {
      var rect = panelsWrap.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;
      heroPanels.forEach(function (panel) {
        var depth = parseFloat(panel.dataset.depth || '0.03');
        var rot = parseFloat(panel.dataset.rot || '0');
        var x = relX * depth * 400;
        var y = relY * depth * 400;
        panel.style.transform = 'rotate(' + rot + 'deg) translate(' + x + 'px, ' + y + 'px)';
      });
    });
    panelsWrap.addEventListener('mouseleave', function () {
      heroPanels.forEach(function (panel) {
        var rot = parseFloat(panel.dataset.rot || '0');
        panel.style.transform = 'rotate(' + rot + 'deg) translate(0px, 0px)';
      });
    });
  }

  // ---------- magnetic buttons ----------
  if (!reduceMotion && !isCoarsePointer) {
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = (e.clientX - rect.left - rect.width / 2) * 0.25;
        var y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        btn.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // ---------- cursor glow ----------
  if (!reduceMotion && !isCoarsePointer) {
    var glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);
    var gx = 0, gy = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      glow.classList.add('active');
    });
    function loop() {
      gx += (tx - gx) * 0.12;
      gy += (ty - gy) * 0.12;
      glow.style.left = gx + 'px';
      glow.style.top = gy + 'px';
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ---------- testimonial marquee, tap to pause on touch ----------
  var testiMarquee = document.getElementById('testiMarquee');

  if (testiMarquee) {
    testiMarquee.addEventListener('pointerup', function (e) {
      if (e.pointerType === 'touch') {
        testiMarquee.classList.toggle('paused');
      }
    });
  }

  // ---------- stat count-up ----------
  var counters = document.querySelectorAll('[data-count-to]');
  function animateCount(el) {
    var target = parseFloat(el.dataset.countTo);
    var decimals = (el.dataset.countTo.split('.')[1] || '').length;
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if (reduceMotion) {
      counters.forEach(function (el) { el.textContent = parseFloat(el.dataset.countTo).toFixed((el.dataset.countTo.split('.')[1] || '').length); });
    } else {
      setTimeout(function () { counters.forEach(animateCount); }, 500);
    }
  }
})();
