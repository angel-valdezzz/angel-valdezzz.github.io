import React, {useEffect, useRef} from 'react';
import {motion, useScroll, useSpring, useTransform} from 'motion/react';

export function AmbientBackground({moving}) {
  const {scrollYProgress} = useScroll();
  const drift = useSpring(useTransform(scrollYProgress, [0, 1], [0, -180]), {stiffness: 65, damping: 30});
  const blue = useTransform(scrollYProgress, [0, .5, 1], [.15, .6, .25]);
  return <div className="ambient-background" aria-hidden="true">
    <motion.div className="ambient-scroll" style={{y: moving ? drift : 0}}>
      <div className="ambient-wash ambient-violet"/>
      <div className="ambient-wash ambient-teal"/>
      <motion.div className="ambient-wash ambient-blue" style={{opacity: moving ? blue : .3}}/>
    </motion.div>
    <div className="ambient-veil"/>
  </div>;
}

const vertices = [
  [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1],
  [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]
];
const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
const faces = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[1,2,6,5],[0,3,7,4]];

export function HeroMotif({moving, c}) {
  const canvas = useRef(null);
  const scene = useRef({time: 0, x: 0, y: 0, targetX: 0, targetY: 0});
  useEffect(() => {
    const element = canvas.current;
    const context = element.getContext('2d');
    if (!context) return;
    let frame = 0, last = 0, alive = true, visible = true;
    let width = 220, height = 180, ratio = 1;
    const state = scene.current;
    function render() {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const t = state.time;
      state.x += (state.targetX - state.x) * .07;
      state.y += (state.targetY - state.y) * .07;
      const rx = .48 + Math.sin(t * .00023) * .2 + (moving ? state.y * .32 : 0);
      const ry = .62 + t * .00038 + (moving ? state.x * .46 : 0);
      const rz = Math.sin(t * .00016) * .13;
      const size = Math.min(width, height) * .28;
      function project(vertex, scale = 1, offset = 0) {
        let [x,y,z] = vertex.map(value => value * scale);
        const cx = Math.cos(rx), sx = Math.sin(rx);
        [y,z] = [y*cx-z*sx, y*sx+z*cx];
        const cy = Math.cos(ry + offset), sy = Math.sin(ry + offset);
        [x,z] = [x*cy+z*sy, -x*sy+z*cy];
        const cz = Math.cos(rz), sz = Math.sin(rz);
        [x,y] = [x*cz-y*sz, x*sz+y*cz];
        const perspective = 4.8 / (4.8 + z);
        return {x: width/2 + x*size*perspective, y: height/2 + y*size*perspective, z};
      }
      const points = vertices.map(vertex => project(vertex));
      faces.map(face => ({face, depth: face.reduce((sum,i) => sum+points[i].z,0)/4}))
        .sort((a,b) => b.depth-a.depth).forEach(({face,depth}) => {
          context.beginPath();
          face.forEach((index,i) => context[i ? 'lineTo' : 'moveTo'](points[index].x, points[index].y));
          context.closePath();
          context.fillStyle = depth > 0 ? 'rgba(129, 159, 255, .025)' : 'rgba(181, 154, 255, .055)';
          context.fill();
        });
      function drawEdges(points, alpha, thickness) {
        edges.forEach(([a,b]) => {
          const start = points[a], end = points[b];
          const gradient = context.createLinearGradient(start.x,start.y,end.x,end.y);
          gradient.addColorStop(0, '#bda2ff');
          gradient.addColorStop(1, '#72ddce');
          context.globalAlpha = alpha * (.72 - (start.z + end.z) * .08);
          context.strokeStyle = gradient;
          context.lineWidth = thickness;
          context.beginPath(); context.moveTo(start.x,start.y); context.lineTo(end.x,end.y); context.stroke();
        });
        context.globalAlpha = 1;
      }
      drawEdges(points, 1, 1.75);
      const inner = vertices.map(vertex => project(vertex, .42, -t * .00048));
      drawEdges(inner, .65, 1.1);
      points.forEach(point => {
        context.beginPath(); context.arc(point.x, point.y, 2.15, 0, Math.PI*2);
        context.fillStyle = '#e1d7ff'; context.fill();
      });
    }
    function tick(now) {
      frame = 0;
      if (!alive) return;
      if (moving && visible && !document.hidden) {
        if (last) state.time += Math.min(now - last, 64);
        last = now;
        render();
        frame = requestAnimationFrame(tick);
      } else { last = 0; render(); }
    }
    function sync() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0; last = 0;
      if (moving && visible && !document.hidden) frame = requestAnimationFrame(tick);
      else render();
    }
    function resize() {
      const rect = element.getBoundingClientRect();
      width = rect.width; height = rect.height;
      ratio = Math.min(devicePixelRatio || 1, 2);
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      render();
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);
    const intersection = new IntersectionObserver(entries => {visible = entries[0].isIntersecting; sync();});
    intersection.observe(element);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect(); intersection.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [moving]);
  function track(event) {
    if (!moving || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    scene.current.targetX = (event.clientX - rect.left) / rect.width - .5;
    scene.current.targetY = (event.clientY - rect.top) / rect.height - .5;
  }
  return <div className="hero-motif" aria-hidden="true" onPointerMove={track}
    onPointerLeave={() => {scene.current.targetX=0; scene.current.targetY=0;}}>
    <div className="motif-halo"/>
    <canvas ref={canvas} className="hero-canvas" width="440" height="360"/>
    <span>{c.work}</span>
  </div>;
}
