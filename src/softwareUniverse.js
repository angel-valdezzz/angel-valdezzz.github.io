// Canvas renderer for browsers without WebGL. Uses the same independent scene layers.
export function softwareUniverse(canvas,state){
 const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),image=new Image(),earthImage=new Image();
 image.src='/assets/nebula-clouds.webp';earthImage.src='/assets/earth-surface.webp';
 const earthTexture=document.createElement('canvas');earthTexture.width=2048;earthTexture.height=1024;let surface=null;
 earthImage.onload=()=>{const c=earthTexture.getContext('2d',{willReadFrequently:true});c.drawImage(earthImage,0,0,2048,1024);surface=c.getImageData(0,0,2048,1024).data;lastEarth=-1;};
 const planetCanvas=document.createElement('canvas');planetCanvas.width=1024;planetCanvas.height=300;const pc=planetCanvas.getContext('2d');
 const field=document.createElement('canvas');field.width=320;field.height=320;const fc=field.getContext('2d');
 const data=fc.createImageData(320,320);const random=(x,y)=>{const n=Math.sin(x*127.1+y*311.7)*43758.5453;return n-Math.floor(n)};
 const noise=(x,y)=>{const a=Math.floor(x),b=Math.floor(y);let fx=x-a,fy=y-b;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);return (random(a,b)*(1-fx)+random(a+1,b)*fx)*(1-fy)+(random(a,b+1)*(1-fx)+random(a+1,b+1)*fx)*fy};
 for(let y=0;y<320;y++)for(let x=0;x<320;x++){let n=0,amp=.5,scale=.02;for(let k=0;k<5;k++){n+=noise(x*scale,y*scale)*amp;scale*=2;amp*=.5}const i=(y*320+x)*4;data.data[i]=65;data.data[i+1]=200;data.data[i+2]=240;data.data[i+3]=Math.max(0,n-.32)*200;}fc.putImageData(data,0,0);
 let frame,observer,visible=true,last=0,lastDraw=0,time=0,lastEarth=-1;const target={x:.5,y:.4,strength:0},cursor={...target};
 const stage=canvas.parentElement;const move=e=>{if(!state.current.moving||reduced.matches)return;const r=canvas.getBoundingClientRect();target.x=(e.clientX-r.left)/r.width;target.y=(e.clientY-r.top)/r.height;target.strength=1};const leave=()=>target.strength=0;
 stage.addEventListener('pointermove',move);stage.addEventListener('pointerdown',move);stage.addEventListener('pointerleave',leave);observer=new IntersectionObserver(([e])=>visible=e.isIntersecting);observer.observe(canvas);
 const stars=Array.from({length:125},(_,i)=>({x:random(i,1),y:random(i,2),r:i%9===0?1.6:.65,depth:(i%3+1)/3}));
 function planet(x,y,r,color,rotation){
  ctx.save();ctx.translate(x,y);ctx.shadowColor=color;ctx.shadowBlur=15;
  const gradient=ctx.createRadialGradient(-r*.45,-r*.5,r*.05,0,0,r);gradient.addColorStop(0,color);gradient.addColorStop(.5,'#172738');gradient.addColorStop(1,'#030812');ctx.fillStyle=gradient;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.clip();ctx.globalAlpha=.24;ctx.rotate(rotation);ctx.drawImage(field,-r,-r,r*2,r*2);ctx.restore();
 }
 const geometry=[];
 for(let y=0;y<300;y++)for(let x=0;x<1024;x++){const nx=(x-512)/512,ny=(y-512)/512,rr=nx*nx+ny*ny;if(rr>1)continue;const nz=Math.sqrt(1-rr);geometry.push({index:(y*1024+x)*4,u:Math.atan2(nx,nz)/Math.PI/2+.58,v:.5+Math.asin(ny)/Math.PI,illumination:Math.max(.025,-nx*.25-ny*.25+nz*.32),atmosphere:Math.pow(1-nz,5)});}
 function renderEarth(){
  const image=pc.createImageData(1024,300),d=image.data;
  for(const g of geometry){const u=((g.u+time*.011)%1+1)%1,v=g.v,j=(Math.min(1023,Math.floor(v*1024))*2048+Math.floor(u*2048))*4,i=g.index;
   const colors=surface?[surface[j],surface[j+1],surface[j+2]]:[25,65,100];const clouds=Math.max(0,noise(u*32+time*.007,v*23)-.62)*110;
   d[i]=Math.min(255,(colors[0]+clouds)*g.illumination+g.atmosphere*8);d[i+1]=Math.min(255,(colors[1]+clouds)*g.illumination+g.atmosphere*45);d[i+2]=Math.min(255,(colors[2]+clouds)*g.illumination+g.atmosphere*95);d[i+3]=255;
  }pc.putImageData(image,0,0);lastEarth=time;
 }

 function draw(now){
  frame=requestAnimationFrame(draw);const dt=last?Math.min((now-last)/1000,.25):0;last=now;if(!visible||document.hidden)return;
  const moving=state.current.moving&&!reduced.matches;if(moving)time+=dt;if(now-lastDraw<50)return;lastDraw=now;
  const w=canvas.clientWidth,h=canvas.clientHeight,ratio=Math.min(devicePixelRatio,w<761?1:1.2);if(canvas.width!==Math.round(w*ratio)||canvas.height!==Math.round(h*ratio)){canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio)}ctx.setTransform(ratio,0,0,ratio,0,0);
  const light=state.current.theme==='light'||state.current.theme==='system'&&!matchMedia('(prefers-color-scheme: dark)').matches;
  cursor.x+=(target.x-cursor.x)*.12;cursor.y+=(target.y-cursor.y)*.12;cursor.strength+=((moving?target.strength:0)-cursor.strength)*.1;
  ctx.fillStyle=light?'#eff5f5':'#030b16';ctx.fillRect(0,0,w,h);
  if(image.complete&&image.naturalWidth){
   ctx.save();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
   // Smooth overlapping ribbons deform the entire cloud texture without hard panel edges.
   for(let y=0;y<h;y+=4){const flow=Math.sin(y/h*6+time*.43)*18+Math.cos(y/h*4-time*.31)*12;
    const near=Math.exp(-Math.pow((y-cursor.y*h)/(h*.18),2));const pull=(cursor.x-.5)*near*cursor.strength*95;
    const sourceY=Math.max(0,Math.min(image.naturalHeight-7,y/h*image.naturalHeight+Math.sin(time*.20+y/h*3)*12));
    ctx.drawImage(image,0,sourceY,image.naturalWidth,Math.min(image.naturalHeight-sourceY,4.5/h*image.naturalHeight),-45+flow+pull,y,w+90,4.5);
   }ctx.restore();
   if(light){ctx.fillStyle="rgba(239,245,245,.86)";ctx.fillRect(0,0,w,h);}
  }
  // Soft cloud layers rotate and drift independently of the photographic filaments.
  for(let side=0;side<2;side++){ctx.save();ctx.globalCompositeOperation=light?'multiply':'screen';ctx.globalAlpha=light?.13:.28;ctx.translate(side?w*.95:w*.05,h*.32);ctx.rotate((side?1:-1)*time*.025);ctx.drawImage(field,-w*.3,-h*.5,w*.6,h);ctx.restore();}
  const shade=ctx.createLinearGradient(0,0,w,0);shade.addColorStop(0,'transparent');shade.addColorStop(.30,light?'#eff5f5aa':'#030b16b0');shade.addColorStop(.7,light?'#eff5f5aa':'#030b16b0');shade.addColorStop(1,'transparent');ctx.fillStyle=shade;ctx.fillRect(0,0,w,h);
  for(const star of stars){const x=(star.x*w+time*star.depth*3+(cursor.x-.5)*star.depth*22)%w,y=(star.y*h-time*star.depth*1.2+h)%h;ctx.globalAlpha=(.5+.4*Math.sin(time+star.x*32))*(light?.2:1);ctx.fillStyle='#b2dfff';ctx.beginPath();ctx.arc(x,y,star.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
  planet(w*.86+Math.sin(time*.20)*w*.025+(cursor.x-.5)*25,h*(w<761?.12:.18)+Math.cos(time*.20)*h*.025,w<761?38:72,'#87bcff',time*.12);
  planet(w*.13+Math.cos(time*.27)*w*.03,h*.16+Math.sin(time*.27)*h*.025,w<761?17:25,'#80c4c6',time*.18);
  if(w>760)planet(w*.91+Math.sin(time*.34)*w*.024,h*.48+Math.cos(time*.34)*h*.04,w<761?12:19,'#ad85d5',time*.22);
  if(lastEarth<0||time-lastEarth>.16||surface&&lastEarth===0)renderEarth();
  const radius=w<761?w*1.2:w*.85,cx=w*.5+(cursor.x-.5)*8,cy=h*(w<761?.72:.66)+radius+(moving?Math.min(scrollY/700,1)*25:0);
  ctx.save();ctx.globalAlpha=light?.22:1;ctx.shadowColor='#50aaff';ctx.shadowBlur=20;ctx.drawImage(planetCanvas,cx-radius,cy-radius,radius*2,radius*2*300/1024);ctx.shadowBlur=0;ctx.strokeStyle='#73c9ff';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.stroke();ctx.restore();
  const fade=ctx.createLinearGradient(0,h*.75,0,h);fade.addColorStop(0,'transparent');fade.addColorStop(1,light?'#eff5f5':'#030b16');ctx.fillStyle=fade;ctx.fillRect(0,h*.75,w,h*.25);
  if(cursor.strength>.01){const x=cursor.x*w,y=cursor.y*h,r=w<761?40:65;ctx.save();ctx.globalAlpha=cursor.strength*.8;const lens=ctx.createRadialGradient(x,y,0,x,y,r);lens.addColorStop(0,light?'#12304eaa':'#02040ff0');lens.addColorStop(.65,'#01081270');lens.addColorStop(.80,'#889eff77');lens.addColorStop(1,'transparent');ctx.fillStyle=lens;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.translate(x,y);ctx.rotate(time*.9);ctx.strokeStyle='#8be4df';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,0,r*.86,r*.45,-.4,0,Math.PI*1.65);ctx.stroke();ctx.restore();}
  canvas.dataset.renderer=image.complete&&surface?'canvas':'fallback';canvas.dataset.elapsed=time.toFixed(2);
 }
 frame=requestAnimationFrame(draw);
 return()=>{cancelAnimationFrame(frame);observer.disconnect();stage.removeEventListener('pointermove',move);stage.removeEventListener('pointerdown',move);stage.removeEventListener('pointerleave',leave);earthImage.onload=null;};
}
