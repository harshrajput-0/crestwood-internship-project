// Mobile menu toggle
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
}));

// Count-up for About stats (runs once when scrolled into view)
const nums = document.querySelectorAll('[data-count]');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '';
    const t0 = performance.now(), dur = 1200;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * p) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(tick);
    io.unobserve(el);
  });
}, { threshold: .6 });
nums.forEach(n => io.observe(n));

// View All Events / Show Less toggle
const toggleBtn = document.getElementById('toggleEvents');
const cards = document.getElementById('cards');

toggleBtn.addEventListener('click', e => {
  e.preventDefault();
  const expanded = cards.classList.toggle('is-expanded');
  toggleBtn.setAttribute('aria-expanded', expanded);

  toggleBtn.querySelector('span').textContent = expanded ? 'Show Less' : 'View All Events';
  // when collapsing, scroll back to the section heading
  if (!expanded) {
    document.getElementById('events').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

