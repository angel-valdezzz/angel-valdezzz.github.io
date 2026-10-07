import {useEffect, useRef, useState} from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  return reduced;
}

// Native scroll drives both the atmosphere and the navigation state.
export function useScrollScene(site, moving, lang) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const node = site.current;
    const header = node.querySelector('.header');
    const sections = ['projects', 'experience', 'contact'].map(id => document.getElementById(id));
    let frame = 0;
    const clamp = value => Math.max(0, Math.min(1, value));
    const mix = (a, b, t) => a.map((value, i) => Math.round(value + (b[i] - value) * t));
    function paint() {
      frame = 0;
      const top = window.scrollY;
      const headerHeight = header.getBoundingClientRect().height;
      const starts = sections.map(section => section.getBoundingClientRect().top + top);
      const point = top + headerHeight + Math.min(140, window.innerHeight * .18);
      const atEnd = top > 0 && top + window.innerHeight >= document.documentElement.scrollHeight - 4;
      let current = null;
      sections.forEach((section, index) => { if (starts[index] <= point) current = section.id; });
      setActive(atEnd ? 'contact' : current);
      document.documentElement.style.setProperty('--scroll-offset', `${headerHeight + 16}px`);
      if (!moving) { node.style.removeProperty('--ink'); return; }
      const [work, , contact] = starts, center = top + window.innerHeight * .38;
      const color = center < work + 200
        ? mix([18, 35, 52], [22, 25, 33], clamp(top / Math.max(1, work)))
        : mix([22, 25, 33], [41, 30, 26], clamp((center - work - 200) / Math.max(1, contact - work - 200)));
      node.style.setProperty('--ink', `rgb(${color.join(',')})`);
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const observer = new ResizeObserver(schedule);
    observer.observe(node); observer.observe(header);
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    paint();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
    };
  }, [site, moving, lang]);
  return active;
}

// Everything is visible by default. Motion never gates access to content.
export function useScrollReveals(site, moving) {
  const seen = useRef(new WeakSet());
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
      const entering = entries.filter(entry => entry.isIntersecting);
      entering.forEach((entry, index) => {
        const node = entry.target;
        if (seen.current.has(node)) return;
        seen.current.add(node);
        node.dataset.entered = 'true';
        if (moving && typeof node.animate === 'function' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const animation = node.animate([
            {opacity: 0, transform: 'translateY(18px)'},
            {opacity: 1, transform: 'translateY(0)'}
          ], {duration: 520, delay: Math.min(index * 80, 160), easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'backwards'});
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
        observer.unobserve(node);
      });
    }, {threshold: .08, rootMargin: '0px 0px -24px 0px'});
    site.current.querySelectorAll('.hero-copy, .focus, .section-heading, .project, .job, .contact').forEach(node => {
      if (!seen.current.has(node)) observer.observe(node);
    });
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); };
  }, [site, moving]);
}
