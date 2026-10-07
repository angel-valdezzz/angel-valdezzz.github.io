import {useEffect,useRef} from 'react';

// A live 3D line field: trajectories evolve independently of pointer input.
// Canvas is deliberate: the selected visual's lines are the animation itself.
export function FlowField({moving}) {
 const canvas=useRef(null),elapsed=useRef(0);
 useEffect(()=>{
  const el=canvas.current,ctx=el.getContext('2d');
  if(!ctx)return;
  let width=1,height=1,frame,last=0,time=elapsed.current,visible=true;
  const pointer={x:0,y:0},smooth={x:0,y:0};
  const trajectories=Array.from({length:78},(_,j)=>{
   let x=.15+j*.014,y=.1,z=22+j*.045;const points=[];
   for(let k=0;k<2500;k++){
    const dt=.006;const dx=10*(y-x),dy=x*(28-z)-y,dz=x*y-8/3*z;
    x+=dx*dt;y+=dy*dt;z+=dz*dt;
    if(k>500)points.push([x,y,z-25]);
   }
   return points;
  });
  const resize=()=>{const box=el.getBoundingClientRect();width=box.width;height=box.height;const dpr=Math.min(devicePixelRatio,1.5);el.width=width*dpr;el.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);if(!moving)draw()};
  const draw=()=>{
   ctx.clearRect(0,0,width,height);smooth.x+=(pointer.x-smooth.x)*.035;smooth.y+=(pointer.y-smooth.y)*.035;
   const yaw=.28+Math.sin(time*.13)*.4+smooth.x*.24,pitch=-.1+Math.sin(time*.11)*.12+smooth.y*.14;
   const cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
   const scale=Math.min(width/45,height/49);const start=Math.floor(time*35)%1200;
   const ink=ctx.createLinearGradient(width*.2,height*.15,width*.8,height*.8);ink.addColorStop(0,'#70f5cb');ink.addColorStop(.35,'#36daed');ink.addColorStop(.55,'#5376fa');ink.addColorStop(.8,'#9869ff');ink.addColorStop(1,'#c16aff');
   trajectories.slice(0,width<600?48:78).forEach((points,j)=>{
    ctx.beginPath();const hue=155+j/77*112;
    ctx.strokeStyle=ink;ctx.globalAlpha=.62;ctx.lineWidth=.75;
    for(let k=0;k<620;k+=2){
     const p=points[(start+k+j*7)%points.length];
     const rx=p[0]*cy+p[1]*sy,rz=-p[0]*sy+p[1]*cy;
     const ry=p[2]*cp-rz*sp,depth=p[2]*sp+rz*cp;
     const perspective=80/(80+depth);
     const px=width*.54+rx*scale*perspective,py=height*.5-ry*scale*perspective;
     k===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    }
    ctx.stroke();
   });
   el.dataset.frame=String(Math.floor(time*30));
  };
  const tick=now=>{frame=requestAnimationFrame(tick);if(now-last<32||!visible||document.hidden)return;time+=Math.min((now-last)/1000,.05);last=now;draw()};
  const move=e=>{const b=el.getBoundingClientRect();pointer.x=Math.max(-1,Math.min(1,(e.clientX-b.left)/b.width*2-1));pointer.y=Math.max(-1,Math.min(1,(e.clientY-b.top)/b.height*2-1))};
  const leave=()=>{pointer.x=pointer.y=0};
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(el);
  const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;last=performance.now()});intersection.observe(el);
  window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',leave);
  resize();draw();if(moving)frame=requestAnimationFrame(tick);
  return()=>{elapsed.current=time;cancelAnimationFrame(frame);resizeObserver.disconnect();intersection.disconnect();window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave)};
 },[moving]);
 return <canvas ref={canvas} className="flow-field" aria-hidden="true"/>;
}
export function useReveal(moving,lang){
 useEffect(()=>{
  const nodes=document.querySelectorAll('.section-intro,.timeline article,.project,.craft,.contact');
  if(!moving){nodes.forEach(n=>n.classList.add('revealed'));return}
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target)}}),{threshold:.08});
  nodes.forEach(n=>{n.classList.add('reveal');observer.observe(n)});
  return()=>observer.disconnect();
 },[moving,lang]);
}
