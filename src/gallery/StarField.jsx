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
      radius: .55 + depth * .75 + (index % 11 === 0 ? .35 : 0),
      brightness: .48 + depth * .44,
      phase: random() * Math.PI * 2,
      frequency: .00035 + random() * .0005,
      speedX: 4 + depth * 8 + random() * 2,
      speedY: -(1 + depth * 2 + random() * .5),
      color: colors[Math.floor(random() * colors.length)],
      glow: index % 11 === 0
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
  const scene = useRef({time: 0});
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
        const x = wrap(star.x * (width + margin*2) + seconds * star.speedX, width + margin*2) - margin;
        const y = wrap(star.y * (height + margin*2) + seconds * star.speedY, height + margin*2) - margin;
        context.globalAlpha = star.brightness * (.86 + .14 * Math.sin(state.time * star.frequency + star.phase));
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
      stars = createStars(Math.max(70, Math.min(280, Math.round(width*height/5200))));
      render();
    }
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      alive = false; cancelAnimationFrame(frame); observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [moving]);
  return <canvas ref={canvas} className="star-field" aria-hidden="true"/>;
}
