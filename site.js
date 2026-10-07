(() => {
  const hasGSAP = !!window.gsap;
  const hasST = !!window.ScrollTrigger;
  if (hasGSAP && hasST) gsap.registerPlugin(ScrollTrigger);

  if (hasGSAP) {
    gsap.from('.hero-caption h1', {y:70, opacity:0, duration:1.2, ease:'power3.out'});
    gsap.from('.hero-caption p, .hero-note', {opacity:0, y:20, duration:.9, delay:.45, stagger:.08, ease:'power2.out'});
  }

  // Text sections reveal without ScrollTrigger: keeps the editorial motion light.
  const revealTargets = document.querySelectorAll('.editorial-copy, .text-columns > div, .section-heading, .journal-grid article, .agenda-list a, .statement h2, .closing-copy');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (hasGSAP) gsap.fromTo(el, {y:30, opacity:0}, {y:0, opacity:1, duration:.85, ease:'power3.out'});
      else el.style.opacity = '1';
      observer.unobserve(el);
    });
  }, {threshold:.14});
  revealTargets.forEach(el => observer.observe(el));

  // ScrollTrigger is intentionally used only for the two feature cards:
  // 1) Repertoire, 2) Programs.
  if (hasGSAP && hasST) {
    document.querySelectorAll('.feature-card').forEach((card) => {
      const img = card.querySelector('img');
      const copy = card.querySelector('.feature-copy');
      const tl = gsap.timeline({
        scrollTrigger:{trigger:card,start:'top 72%',end:'bottom 40%',scrub:.6}
      });
      tl.fromTo(img,{scale:1.055},{scale:1,ease:'none'},0)
        .fromTo(copy,{y:70,opacity:0},{y:0,opacity:1,ease:'power2.out'},0);
    });
  }
})();
