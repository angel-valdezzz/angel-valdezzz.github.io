import React, {useEffect, useRef, useState} from 'react';
import {ArrowRight, ArrowUpRight, ArrowUp, DownloadSimple, EnvelopeSimple, GithubLogo, Pause, Play, CaretDown} from '@phosphor-icons/react';
import {Demo, External, extras, projects, text} from './PortfolioContent.jsx';

const github='https://github.com/angel-valdezzz', email='angelgerardomolinavaldez@gmail.com';
const copy={
 es:{nav:['Proyectos','Experiencia','Contacto'],eyebrow:'INGENIERÍA DE CALIDAD Y AUTOMATIZACIÓN',lead:'Diseño frameworks de automatización y desarrollo herramientas Python para hacer las pruebas más claras y mantenibles.',work:'Ver proyectos',contact:'Contactar',focus:'ENFOQUE',principles:['Automatización mantenible.','Evidencia clara.','Herramientas reutilizables.'],location:'Ingeniero en Sistemas · México',workEyebrow:'TRABAJO SELECCIONADO',workTitle:'Proyectos destacados',workLead:'Herramientas nacidas de problemas reales de testing.',contribution:'Diseño y desarrollo',more:'Más de mi trabajo',career:'TRAYECTORIA PROFESIONAL',experience:'Experiencia',contactTitle:'Hablemos de tu próximo proyecto.',contactLead:'Desarrollo, automatización y calidad, con soluciones claras y mantenibles.',footer:'Hecho con criterio, desde México.',motionOn:'Pausar efectos',motionOff:'Activar efectos'},
 en:{nav:['Projects','Experience','Contact'],eyebrow:'QUALITY ENGINEERING & AUTOMATION',lead:'I design automation frameworks and build Python tools to make testing clearer and easier to maintain.',work:'View projects',contact:'Contact me',focus:'FOCUS',principles:['Maintainable automation.','Clear evidence.','Reusable tools.'],location:'Computer Systems Engineer · Mexico',workEyebrow:'SELECTED WORK',workTitle:'Featured projects',workLead:'Tools built to solve real testing problems.',contribution:'Design & development',more:'More of my work',career:'PROFESSIONAL EXPERIENCE',experience:'Experience',contactTitle:'Let’s talk about your next project.',contactLead:'Development, automation, and quality, with clear and maintainable solutions.',footer:'Made with care, from Mexico.',motionOn:'Pause effects',motionOff:'Enable effects'}
};

function useScrollAtmosphere(site,moving,lang){
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)'),node=site.current;
  let frame=0;
  const clamp=v=>Math.max(0,Math.min(1,v)),mix=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
  function paint(){
   frame=0;
   if(!moving||media.matches){node.style.removeProperty('--ink');return;}
   const top=scrollY,work=document.getElementById('projects').getBoundingClientRect().top+top,contact=document.getElementById('contact').getBoundingClientRect().top+top,center=top+innerHeight*.38;
   const color=center<work+200?mix([20,33,46],[22,25,32],clamp(top/Math.max(1,work))):mix([22,25,32],[36,29,29],clamp((center-work-200)/Math.max(1,contact-work-200)));
   node.style.setProperty('--ink',`rgb(${color.join(',')})`);
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(paint);}
  const observer=new ResizeObserver(schedule);observer.observe(node);
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);paint();
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
 },[site,moving,lang]);
}

export function App(){
 const [lang,setLang]=useState(()=>location.pathname.startsWith('/es')?'es':'en'),[moving,setMoving]=useState(()=>!matchMedia('(prefers-reduced-motion: reduce)').matches),[demo,setDemo]=useState(null);
 const site=useRef(null),t=text[lang],c=copy[lang],i=lang==='es'?0:1;
 useScrollAtmosphere(site,moving,lang);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setMoving(!media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dataset.theme='dark';document.title='Angel Molina · QA Automation Engineer / SDET';document.querySelector('meta[name="description"]').content=c.lead;document.documentElement.dataset.motion=moving?'on':'off';},[lang,moving,c.lead]);
 const language=value=>{setLang(value);history.replaceState({},'','/'+value+'/'+location.hash);};
 return <div ref={site} id="top" className={'site '+(moving?'motion':'still')}>
  <a className="skip" href="#main">{t.skip}</a>
  <header className="header"><div className="header-inner">
   <a className="brand" href="#top" aria-label={t.back}>A.M.</a>
   <nav className="navigation" aria-label={lang==='es'?'Navegación principal':'Main navigation'}>{c.nav.map((label,j)=><a key={label} href={['#projects','#experience','#contact'][j]}>{label}</a>)}</nav>
   <div className="controls"><div className="languages" aria-label={lang==='es'?'Idioma':'Language'}><button type="button" onClick={()=>language('es')} aria-pressed={lang==='es'}>ES</button><span>/</span><button type="button" onClick={()=>language('en')} aria-pressed={lang==='en'}>EN</button></div><a className="button ring header-cv" href={'/cv/angel-'+lang+'.pdf'} download><span><DownloadSimple size={17}/><span className="cv-full">{t.cv}</span><span className="cv-short">CV</span></span></a></div>
  </div></header>
  <main className="container" id="main">
   <section className="hero" aria-labelledby="intro-title"><div className="hero-copy"><p className="eyebrow">{c.eyebrow}</p><h1 id="intro-title">Angel Molina</h1><p className="role">QA Automation Engineer <span>· SDET</span></p><p className="lead">{c.lead}</p><div className="actions"><a className="button primary" href="#projects"><span>{c.work}<ArrowRight size={18}/></span></a><a className="button ring" href="#contact"><span>{c.contact}<ArrowUpRight size={18}/></span></a></div></div><aside className="focus"><p className="eyebrow">{c.focus}</p><p>{c.principles.map(value=><React.Fragment key={value}>{value}<br/></React.Fragment>)}</p><p className="location">{c.location}</p></aside></section>
   <section className="section projects" id="projects" aria-labelledby="projects-title"><div className="section-heading"><div><p className="eyebrow">{c.workEyebrow}</p><h2 id="projects-title">{c.workTitle}</h2></div><p>{c.workLead}</p></div><div className="project-list">{projects.slice(0,3).map((p,j)=><article className="project" key={p.name}><span className="project-number" aria-hidden="true">0{j+1}</span><div><div className="project-title"><h3>{p.name}</h3><span className="project-type">{p.type}</span></div><p className="project-description">{p.desc[i]}</p><div className="project-bottom"><span className="contribution">{c.contribution}</span><div className="project-links"><button type="button" className="text-link" onClick={()=>setDemo(j)}>{t.demo}<ArrowRight size={16}/></button><External className="text-link" href={github+'/'+p.slug}>{t.repo}<ArrowUpRight size={16}/></External><External className="text-link" href={'https://angel-valdezzz.github.io/'+p.slug+'/'}>{t.docs}<ArrowUpRight size={16}/></External></div></div>{p.problem&&<details className="case-study"><summary>{t.case}<CaretDown size={16}/></summary><div className="case-content">{[[t.problem,p.problem[i]],[t.solution,p.solution[i]],[t.decisions,p.decisions[i]]].map(([label,value])=><div key={label}><h4>{label}</h4><p>{value}</p></div>)}</div></details>}</div></article>)}</div><details className="other-work"><summary>{c.more}<CaretDown size={18}/></summary><div className="other-links">{[[projects[3].name,projects[3].slug,projects[3].type],...extras].map(([name,slug,type])=><External className="text-link" key={slug} href={github+'/'+slug}><span>{name}<small>{type}</small></span><ArrowUpRight size={17}/></External>)}</div></details><External className="text-link more-github" href={github}>{lang==='es'?'Más proyectos en GitHub':'More projects on GitHub'}<ArrowUpRight size={17}/></External></section>
   <section className="section experience" id="experience" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow">{c.career}</p><h2 id="experience-title">{c.experience}</h2></div></div><div className="jobs">{t.jobs.slice(0,2).map(([title,date,desc])=><article className="job" key={title}><div><h3>{title}</h3><p className="company">{t.company}</p><p className="job-description">{desc}</p></div><span className="date">{date}</span></article>)}</div></section>
   <section className="section contact" id="contact" aria-labelledby="contact-title"><p className="eyebrow">{c.nav[2].toUpperCase()}</p><h2 id="contact-title">{c.contactTitle}</h2><p>{c.contactLead}</p><div className="actions"><a className="button primary" href={'mailto:'+email}><span>{c.contact}<EnvelopeSimple size={19}/></span></a><External className="button ring" href={github}><span>GitHub<GithubLogo size={19}/></span></External></div><a className="email text-link" href={'mailto:'+email}>{email}</a></section>
  </main>
  <footer className="footer container"><span>{c.footer}</span><div><button type="button" className="text-link motion-control" onClick={()=>setMoving(value=>!value)} aria-pressed={!moving}>{moving?<Pause size={15}/>:<Play size={15}/>} {moving?c.motionOn:c.motionOff}</button><a className="text-link" href="#top">{t.back}<ArrowUp size={16}/></a></div></footer>
  {demo!==null&&<Demo t={t} lang={lang} initial={demo} onClose={()=>setDemo(null)}/>}
 </div>;
}
