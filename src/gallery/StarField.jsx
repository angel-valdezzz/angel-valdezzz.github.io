import React, {useEffect, useRef} from 'react';

function createStars(count) {
  let seed = 16102026;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const colors = ['#edf0ff', '#edf0ff', '#edf0ff', '#c7b9ed', '#aed8ed'];
  return Array.from({length: count}, (_, index) => {
    const depth = .25 + random() * .75;
    return {
      x: random(), y: random(), depth,
      radius: .4 + depth * .65 + (index % 19 === 0 ? .35 : 0),
      brightness: .24 + depth * .37,
      phase: random() * Math.PI * 2,
      frequency: .00035 + random() * .0005,
      speedX: depth * (1.6 + random() * .8),
      speedY: -depth * (.3 + random() * .5),
      color: colors[Math.floor(random() * colors.length)],
      glow: index % 19 === 0
    };
  });
}

function glowSprite() {
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 32;
  const context = sprite.getContext('2d');
  const glow = context.createRadialGradient(16,16,0,16,16,16);
  glow.addColorStop(0, 'rgba(229,223,255,.65)');
  glow.addColorStop(.2, 'rgba(189,175,235,.16)');
  glow.addColorStop(1, 'rgba(189,175,235,0)');
  context.fillStyle = glow; context.fillRect(0,0,32,32);
  return sprite;
}

export function StarField({moving}) {
  const canvas = useRef(null);
  const scene = useRef({time: 0, x: 0, y: 0, targetX: 0, targetY: 0, scroll: 0, targetScroll: 0});
  useEffect(() => {
    const element = canvas.current, context = element.getContext('2d');
    if (!context) return;
    const state = scene.current, sprite = glowSprite();
    let frame = 0, last = 0, alive = true;
    let width = 1, height = 1, ratio = 1, stars = [];
    const margin = 14;
    const wrap = (value, range) => ((value % range) + range) % range;
    function render() {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const seconds = state.time / 1000;
      for (const star of stars) {
        const x = wrap(star.x * (width + margin*2) + seconds * star.speedX + state.x * star.depth * 22, width + margin*2) - margin;
        const y = wrap(star.y * (height + margin*2) + seconds * star.speedY + state.y * star.depth * 16 - state.scroll * star.depth * .025, height + margin*2) - margin;
        context.globalAlpha = star.brightness * (.78 + .22 * Math.sin(state.time * star.frequency + star.phase));
        if (star.glow) {
          const radius = star.radius * 5;
          context.drawImage(sprite, x-radius, y-radius, radius*2, radius*2);
        }
        context.fillStyle = star.color;
        context.beginPath(); context.arc(x, y, star.radius, 0, Math.PI*2); context.fill();
      }
      context.globalAlpha = 1;
    }
    function tick(now) {
      frame = 0;
      if (!alive) return;
      if (moving && !document.hidden) {
        const delta = last ? Math.min(now-last, 64) : 0;
        last = now; state.time += delta;
        const follow = 1 - Math.exp(-delta / 180);
        state.x += (state.targetX-state.x) * follow;
        state.y += (state.targetY-state.y) * follow;
        state.scroll += (state.targetScroll-state.scroll) * follow;
        render();
        frame = requestAnimationFrame(tick);
      } else {last = 0; render();}
    }
    function sync() {
      cancelAnimationFrame(frame); frame = 0; last = 0;
      if (moving && !document.hidden) frame = requestAnimationFrame(tick);
      else render();
    }
    function resize() {
      const rect = element.getBoundingClientRect();
      width = Math.max(1,rect.width); height = Math.max(1,rect.height);
      ratio = Math.min(devicePixelRatio || 1, 2);
      element.width = Math.round(width * ratio); element.height = Math.round(height * ratio);
      stars = createStars(Math.max(55, Math.min(240, Math.round(width*height/6500))));
      render();
    }
    function pointer(event) {
      if (!moving || event.pointerType !== 'mouse') return;
      state.targetX = event.clientX / width - .5;
      state.targetY = event.clientY / height - .5;
    }
    function leave(event) {
      if (!moving || event.relatedTarget) return;
      state.targetX = state.targetY = 0;
    }
    function scroll() {if (moving) state.targetScroll = window.scrollY;}
    resize();
    state.targetScroll = window.scrollY;
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    window.addEventListener('pointermove', pointer, {passive: true});
    window.addEventListener('pointerout', leave, {passive: true});
    window.addEventListener('scroll', scroll, {passive: true});
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      alive = false; cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('pointermove', pointer);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('scroll', scroll);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [moving]);
  return <canvas ref={canvas} className="star-field" aria-hidden="true"/>;
}
