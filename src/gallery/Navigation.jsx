import React, {useEffect, useRef, useState} from 'react';
import {LayoutGroup, motion} from 'motion/react';

export function useSectionNavigation(ids, moving, layoutKey) {
  const hashId = location.hash.slice(1) === 'contact' ? 'about' : location.hash.slice(1);
  const initial = ids.includes(hashId) ? hashId : null;
  const [active, setActive] = useState(initial || ids[0]);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null), selected = useRef(initial), queueUpdate = useRef(() => {});
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      setScrolled(window.scrollY > 24);
      if (selected.current) {setActive(selected.current); return;}
      const maxScroll = document.documentElement.scrollHeight - innerHeight;
      if (maxScroll > 0 && window.scrollY >= maxScroll - 3) {setActive(ids[ids.length-1]); return;}
      const marker = Math.max((headerRef.current?.offsetHeight || 88) + 24, innerHeight * .66);
      let current = ids[0];
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) current = id;
      }
      setActive(current);
    }
    function queue() {if (!frame) frame = requestAnimationFrame(update);}
    function release() {selected.current = null; queue();}
    function key(event) {
      if (['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key)) release();
    }
    function history() {
      const id = location.hash.slice(1) === 'contact' ? 'about' : location.hash.slice(1);
      selected.current = ids.includes(id) ? id : null;
      queue();
    }
    queueUpdate.current = queue;
    const observer = new ResizeObserver(queue);
    if (headerRef.current) observer.observe(headerRef.current);
    const main = document.querySelector('main');
    if (main) observer.observe(main);
    window.addEventListener('scroll', queue, {passive: true});
    window.addEventListener('resize', queue, {passive: true});
    window.addEventListener('wheel', release, {passive: true});
    window.addEventListener('touchstart', release, {passive: true});
    window.addEventListener('keydown', key);
    window.addEventListener('hashchange', history);
    window.addEventListener('popstate', history);
    queue();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); queueUpdate.current = () => {};
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      window.removeEventListener('wheel', release);
      window.removeEventListener('touchstart', release);
      window.removeEventListener('keydown', key);
      window.removeEventListener('hashchange', history);
      window.removeEventListener('popstate', history);
    };
  }, [ids]);
  useEffect(() => {queueUpdate.current();}, [layoutKey]);
  function navigate(event, id) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    selected.current = id; setActive(id);
    const url = new URL(location.href);
    if (url.hash !== '#' + id) {
      url.hash = id;
      try {window.history.pushState({}, '', url);} catch { /* Sandboxed demos can still scroll. */ }
    }
    const top = target.getBoundingClientRect().top + window.scrollY - (headerRef.current?.offsetHeight || 88) - 28;
    window.scrollTo({top: Math.max(0, top), behavior: moving ? 'smooth' : 'instant'});
    target.focus({preventScroll: true});
  }
  return {active, scrolled, headerRef, navigate};
}

export function SectionNavigation({ids, labels, label, active, moving, navigate}) {
  return <LayoutGroup id="gallery-navigation"><nav className="main-nav" aria-label={label}>
    {ids.map((id, i) => <a href={'#' + id} key={id} aria-current={active === id ? 'location' : undefined}
      onClick={event => navigate(event,id)}>
      {active === id && <motion.span className="nav-indicator" aria-hidden="true"
        layoutId={moving ? 'active-section' : undefined} initial={false} style={{borderRadius: 0}}
        transition={moving ? {type:'spring',stiffness:420,damping:34} : {duration:0}}/>}
      <span className="nav-label">{labels[i]}</span>
    </a>)}
  </nav></LayoutGroup>;
}
