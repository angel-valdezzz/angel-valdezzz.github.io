import {softwareUniverse} from './softwareUniverse.js';
import React,{useEffect,useRef} from 'react';

const vertex=`attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment=`
precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float attraction;
uniform float time;
uniform float light;
uniform float travel;
uniform sampler2D cloudTexture;
uniform sampler2D surfaceTexture;
float hash(vec3 p){p=fract(p*.3183099+vec3(.1,.2,.3));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float n=0.,a=.5;for(int i=0;i<5;i++){n+=a*noise(p);p=p*2.03+vec3(7.1,3.4,1.2);a*=.5;}return n;}
vec3 sphere(vec2 p,vec2 center,float radius,vec3 tint,float seed,float earth,vec3 background){
 vec2 q=(p-center)/radius;float r2=dot(q,q);if(r2>1.13)return background;
 float rim=exp(-abs(sqrt(r2)-1.)*75.);vec3 glow=mix(vec3(.13,.52,.86),vec3(.12,.4,.56),light);
 if(r2>=1.)return background+glow*rim*.6;
 vec3 normal=vec3(q,sqrt(1.-r2));vec3 sun=normalize(vec3(-.9,.6,.65));float daylight=max(dot(normal,sun),0.);
 float angle=atan(normal.x,normal.z)+time*(earth>.5?.075:.12)+seed;
 vec3 samplePoint=vec3(sin(angle)*sqrt(1.-q.y*q.y),q.y,cos(angle)*sqrt(1.-q.y*q.y));
 float terrain=fbm(samplePoint*5.+seed);
 vec3 ground=tint*(.35+terrain*1.2);
 if(earth>.5){
  float land=smoothstep(.47,.54,terrain);ground=texture2D(surfaceTexture,vec2(fract(angle/6.2831853+.58),.5-asin(q.y)/3.14159265)).rgb;
  float cloud=smoothstep(.56,.72,fbm(samplePoint*11.+vec3(time*.023,0.,0.)));
  ground=mix(ground,vec3(.78,.84,.88),cloud*.8);
  float cities=pow(noise(samplePoint*150.),26.)*land*(1.-smoothstep(.05,.3,daylight));ground+=vec3(1.,.54,.13)*cities*1.8;
 }
 float bands=sin(samplePoint.y*23.+terrain*9.)*.045;
 vec3 color=ground*(.08+daylight*1.35)+bands*tint;
 color+=glow*pow(1.-normal.z,3.)*(.12+daylight)*.8;
 if(earth>.5&&light>.5)color=mix(background,color,.18);
 return mix(color+glow*rim*.45,background,smoothstep(.992,1.,sqrt(r2)));
}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;float aspect=resolution.x/resolution.y;
 vec2 p=(uv-.5)*vec2(aspect,1.);
 vec2 mouse=(pointer-.5)*vec2(aspect,1.);vec2 delta=p-mouse;float dist=length(delta);
 float influence=exp(-dist*dist*13.)*attraction;
 float bend=influence*.13;
 vec2 warped=p+delta*bend/max(dist,.055)+vec2(-delta.y,delta.x)*influence*.30;
 float t=time*.07;
 vec3 domain=vec3(warped*3.6,t*.5);
 vec2 swirl=vec2(fbm(domain+vec3(0,0,t)),fbm(domain+vec3(5,3,-t)));
 float clouds=fbm(domain+vec3(swirl*2.8,t));
 float filaments=pow(fbm(domain*2.+vec3(swirl*4.,-t)),3.);
 float sides=smoothstep(.09,.55,abs(warped.x)/max(aspect,.7));
 float density=pow(clouds,2.4)*sides;
 vec3 teal=vec3(.05,.85,.67),blue=vec3(.03,.38,1.),violet=vec3(.58,.16,.95);
 vec3 hue=mix(teal,violet,smoothstep(-aspect*.3,aspect*.4,warped.x));hue=mix(hue,blue,swirl.y*.55);
 vec3 color=mix(vec3(.008,.023,.048),vec3(.93,.96,.96),light);
 vec2 cloudUV=vec2(uv.x+(warped.x-p.x)/aspect+sin(uv.y*6.+time*.43)*.012,1.-uv.y+sin(time*.20+uv.y*3.)*.012);
 vec3 art=texture2D(cloudTexture,cloudUV).rgb;
 color=light>.5?vec3(.94,.97,.97)-art*.24:art*(.85+clouds*.6);
 color+=hue*filaments*sides*.12;
 if(light>.5)color-=density*.18;
 // Independent star layers with different drift velocities.
 for(int layer=0;layer<3;layer++){
  float scale=75.+float(layer)*45.;vec2 starUV=warped*scale+vec2(time*(.18+float(layer)*.12),time*.07);
  vec2 cell=floor(starUV),local=fract(starUV)-.5;float chance=hash(vec3(cell,float(layer)));
  float star=exp(-dot(local,local)*850.)*step(.985,chance);
  float twinkle=.65+.35*sin(time*1.4+chance*123.);color+=vec3(.6,.84,1.)*star*twinkle*(1.-light*.8);
 }
 vec2 depth=(pointer-.5)*attraction;
 // Orbital positions advance independently from the clouds.
 vec2 large=vec2(aspect*.36+sin(time*.15)*.035,.29+cos(time*.15)*.025)+depth*.035;
 color=sphere(p,large,aspect<.7?.045:.105,vec3(.18,.32,.55),4.,0.,color);
 color=sphere(p,vec2(-aspect*.38+cos(time*.23)*.04,.31+sin(time*.23)*.035)+depth*.07,.039,vec3(.25,.41,.42),7.,0.,color);
 color=sphere(p,vec2(aspect*.40+sin(time*.30)*.028,(aspect<.7?-.32:-.01)+cos(time*.30)*.06)+depth*.05,.022,vec3(.40,.26,.48),2.,0.,color);
 // Earth is a lit sphere: rotating terrain, separate drifting clouds and atmosphere.
 color=sphere(p,vec2(depth.x*.015,(aspect<.7?-1.21:-1.13)-travel*.045),.98,vec3(.1,.3,.5),0.,1.,color);
 float ring=exp(-abs(dist-.075)*170.)*attraction;
 float eventHorizon=exp(-dist*dist*950.)*attraction*.88;
 color*=1.-eventHorizon;color+=mix(teal,violet,.65)*ring*.52;
 gl_FragColor=vec4(color,1.);
}`;

export function Universe({moving,theme}){
 const canvas=useRef(null),state=useRef({moving,theme});state.current={moving,theme};
 useEffect(()=>{
  const c=canvas.current;const gl=c.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});if(!gl)return softwareUniverse(c,state);
  let program,buffer,frame,observer;const shaders=[];const textures=[];const images=[];let destroyed=false,visible=true,lost=false;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  try{
   program=gl.createProgram();for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){const shader=gl.createShader(type);shaders.push(shader);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));gl.attachShader(program,shader)}
   gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);
   buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
   const attribute=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(attribute);gl.vertexAttribPointer(attribute,2,gl.FLOAT,false,0,0);
   const uniforms=Object.fromEntries(['resolution','pointer','attraction','time','light','travel'].map(name=>[name,gl.getUniformLocation(program,name)]));
   for(const [unit,url] of [[0,'/assets/nebula-clouds.webp'],[1,'/assets/earth-surface.webp']]){
    const texture=gl.createTexture();textures.push(texture);gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([3,11,22,255]));
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program,unit===0?'cloudTexture':'surfaceTexture'),unit);
    const image=new Image();images.push(image);image.onload=()=>{if(destroyed)return;gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);};image.src=url;
   }
   const target={x:.5,y:.55,strength:0},current={...target};let elapsed=0,last=0,lastDraw=0;
   const stage=c.parentElement;
   const pointer=e=>{if(reduced.matches||!state.current.moving)return;const r=c.getBoundingClientRect();target.x=(e.clientX-r.left)/r.width;target.y=1-(e.clientY-r.top)/r.height;target.strength=1;};
   const leave=()=>{target.strength=0};stage.addEventListener('pointermove',pointer);stage.addEventListener('pointerdown',pointer);stage.addEventListener('pointerleave',leave);
   observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;},{threshold:0});observer.observe(c);
   const render=now=>{
    if(destroyed||lost)return;frame=requestAnimationFrame(render);
    const delta=last?Math.min((now-last)/1000,.25):0;last=now;
    if(!visible||document.hidden){lastDraw=0;return;}
    const motion=state.current.moving&&!reduced.matches;if(motion)elapsed+=delta;
    if(now-lastDraw<33)return;lastDraw=now;
    const mobile=c.clientWidth<761;const ratio=Math.min(devicePixelRatio,mobile?.7:1);
    const w=Math.round(c.clientWidth*ratio),h=Math.round(c.clientHeight*ratio);if(c.width!==w||c.height!==h){c.width=w;c.height=h;gl.viewport(0,0,w,h)}
    const ease=1-Math.exp(-delta*8);current.x+=(target.x-current.x)*ease;current.y+=(target.y-current.y)*ease;current.strength+=((motion?target.strength:0)-current.strength)*ease;
    const activeTheme=state.current.theme==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):state.current.theme;
    gl.uniform2f(uniforms.resolution,w,h);gl.uniform2f(uniforms.pointer,current.x,current.y);gl.uniform1f(uniforms.attraction,current.strength);gl.uniform1f(uniforms.time,elapsed);gl.uniform1f(uniforms.light,activeTheme==='light'?1:0);gl.uniform1f(uniforms.travel,motion?Math.min(scrollY/700,1):0);gl.drawArrays(gl.TRIANGLES,0,6);
    c.dataset.renderer='webgl';c.dataset.elapsed=elapsed.toFixed(2);
   };
   const contextLost=e=>{e.preventDefault();lost=true;c.dataset.renderer='fallback';};c.addEventListener('webglcontextlost',contextLost);
   frame=requestAnimationFrame(render);
   return()=>{destroyed=true;cancelAnimationFrame(frame);observer.disconnect();stage.removeEventListener('pointermove',pointer);stage.removeEventListener('pointerdown',pointer);stage.removeEventListener('pointerleave',leave);c.removeEventListener('webglcontextlost',contextLost);images.forEach(i=>i.onload=null);textures.forEach(t=>gl.deleteTexture(t));gl.deleteBuffer(buffer);gl.deleteProgram(program);shaders.forEach(s=>gl.deleteShader(s));};
  }catch(error){console.warn('Universe uses static fallback:',error.message);if(program)gl.deleteProgram(program);shaders.forEach(s=>gl.deleteShader(s));}
 },[]);
 return <canvas className="universe" ref={canvas} aria-hidden="true" data-renderer="fallback"/>;
}

export function usePageMotion(enabled,language){
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const elements=[...document.querySelectorAll('.about>*,.section-intro,.timeline article,.craft,.project,.other-projects,.contact')];
  if(!enabled||reduced.matches){elements.forEach(el=>{el.classList.remove('reveal');el.classList.add('revealed')});return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  elements.forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--reveal-delay',(i%3)*75+'ms');observer.observe(el)});
  const buttons=[...document.querySelectorAll('.button')];
  const move=e=>{if(e.pointerType!=='mouse'||reduced.matches)return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--mag-x',(e.clientX-r.left-r.width/2)*.18+'px');e.currentTarget.style.setProperty('--mag-y',(e.clientY-r.top-r.height/2)*.24+'px')};
  const reset=e=>{e.currentTarget.style.setProperty('--mag-x','0px');e.currentTarget.style.setProperty('--mag-y','0px')};
  buttons.forEach(el=>{el.addEventListener('pointermove',move);el.addEventListener('pointerleave',reset)});
  const projects=[...document.querySelectorAll('.project')];
  const tilt=e=>{if(e.pointerType!=='mouse'||reduced.matches)return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--card-x',(e.clientX-r.left)/r.width*100+'%');e.currentTarget.style.setProperty('--card-y',(e.clientY-r.top)/r.height*100+'%');e.currentTarget.style.setProperty('--tilt-x',(-(e.clientY-r.top-r.height/2)/r.height*5)+'deg');e.currentTarget.style.setProperty('--tilt-y',((e.clientX-r.left-r.width/2)/r.width*5)+'deg')};
  const untilt=e=>{e.currentTarget.style.setProperty('--tilt-x','0deg');e.currentTarget.style.setProperty('--tilt-y','0deg')};
  projects.forEach(el=>{el.addEventListener('pointermove',tilt);el.addEventListener('pointerleave',untilt)});
  return()=>{observer.disconnect();buttons.forEach(el=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);el.style.removeProperty('--mag-x');el.style.removeProperty('--mag-y')});projects.forEach(el=>{el.removeEventListener('pointermove',tilt);el.removeEventListener('pointerleave',untilt);el.style.removeProperty('--tilt-x');el.style.removeProperty('--tilt-y')})};
 },[enabled,language]);
}
