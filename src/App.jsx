import React, {useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore} from 'react';
import {motion, MotionConfig, useMotionValue, useSpring} from 'motion/react';
import {ArrowUpRight, ArrowUp, BracketsCurly, Browser, Code, DownloadSimple, EnvelopeSimple, FileText, GithubLogo, Pause, Play, Table, TerminalWindow, X} from '@phosphor-icons/react';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import {projects} from './gallery/projects.js';
import {copy} from './gallery/copy.js';
import {AmbientBackground, HeroMotif} from './gallery/Scene.jsx';
import {SectionNavigation, useSectionNavigation} from './gallery/Navigation.jsx';
import {Technologies} from './gallery/Technologies.jsx';

const github = 'https://github.com/angel-valdezzz';
const email = 'angelgerardomolinavaldez@gmail.com';
const assetUrl = path => window.__PORTFOLIO_ASSETS__?.[path] || path;
const sectionIds = ['projects', 'technologies', 'about'];
const iconMap = {browser: Browser, braces: BracketsCurly, file: FileText, table: Table, terminal: TerminalWindow, code: Code};
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
function subscribeReducedMotion(notify) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
}
function reducedMotionSnapshot() { return window.matchMedia(reducedMotionQuery).matches; }
function readPreference(key, fallback) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
function savePreference(key, value) {
  try { localStorage.setItem(key, value); } catch { /* Private browsing still works. */ }
}
function languageFromUrl() {
  const query = new URLSearchParams(location.search).get('lang');
  if (query === 'es' || query === 'en') return query;
  if (/^\/es(?:\/|$)/.test(location.pathname)) return 'es';
  return 'en';
}
function External({href, children, label, c, ...props}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label ? label + ' — ' + c.external : undefined} {...props}>{children}<ArrowUpRight size={16} aria-hidden="true"/>{!label && <span className="sr-only"> ({c.external})</span>}</a>;
}
function SourceCode({code, compact = false, label}) {
  return <pre className={compact ? 'source-code compact-code' : 'source-code'} tabIndex={compact ? undefined : 0} aria-hidden={compact || undefined} aria-label={compact ? undefined : label}><code>{code.split('\n').map((line, i) => <span className="code-line" key={i}><span className="line-number" aria-hidden="true">{i + 1}</span><span>{line || ' '}</span></span>)}</code></pre>;
}
function Preview({project: p, lang, c, full = false}) {
  const [failed, setFailed] = useState(false);
  const Icon = iconMap[p.icon] || Code;
  if (p.image && !failed) return <figure className={'output-preview' + (full ? ' full-output' : '')}>
    <img src={assetUrl(p.image)} alt={full ? p.imageAlt[lang] : ''} width={p.imageSize[0]} height={p.imageSize[1]} loading="lazy" decoding="async" onError={() => setFailed(true)}/>
    {full && <figcaption>{c.imageNote}</figcaption>}
  </figure>;
  if (p.code) {
    const excerpt = p.previewCode || p.previewLines.map(i => p.code.split('\n')[i]).join('\n');
    return <div className={'code-preview' + (full ? ' full-code' : '')}>
      <div className="preview-heading"><Icon size={19} aria-hidden="true"/><span>{p.previewLabel}</span></div>
      <SourceCode code={full ? p.code : excerpt} compact={!full} label={p.name[lang] + ' — ' + c.source}/>
      {full && <p className="source-note">{c.codeNote}</p>}
    </div>;
  }
  return <p className="preview-error">{c.failedImage}</p>;
}
function ProjectCard({project: p, index, lang, c, moving, onOpen}) {
  const pointerX = useMotionValue(0), pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerY, {stiffness: 200, damping: 24});
  const rotateY = useSpring(pointerX, {stiffness: 200, damping: 24});
  function reset() { pointerX.set(0); pointerY.set(0); }
  useEffect(() => { if (!moving) reset(); }, [moving]);
  function track(event) {
    if (!moving || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    pointerX.set((x - .5) * 9);
    pointerY.set((.5 - y) * 7);
    event.currentTarget.style.setProperty('--pointer-x', (x * 100) + '%');
    event.currentTarget.style.setProperty('--pointer-y', (y * 100) + '%');
  }
  return <motion.article className="project-card" aria-labelledby={'title-' + p.id}
    style={{'--project-color': p.color, '--project-surface': p.surface}}
    onPointerMove={track} onPointerLeave={reset}
    initial={moving ? {opacity: 0, y: 30} : false}
    animate={!moving ? {opacity: 1, y: 0} : undefined}
    whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: .12}}
    transition={{duration: moving ? .65 : 0, delay: moving ? (index % 3) * .08 : 0, ease: [.22, 1, .36, 1]}}
    whileHover={moving ? {y: -6, transition: {duration: .25, delay: 0}} : {y: 0}}>
    <motion.div className="project-visual" style={{rotateX: moving ? rotateX : 0, rotateY: moving ? rotateY : 0, transformPerspective: 900}}>
      <Preview project={p} lang={lang} c={c}/><div className="project-glow" aria-hidden="true"/>
      <span className="preview-kind">{p.image ? c.output : c.source}</span>
    </motion.div>
    <div className="project-title-row"><h3 id={'title-' + p.id}>{p.name[lang]}</h3><span className={'project-kind ' + (p.kind === 'practice' ? 'practice-kind' : '')}>{c[p.kind]}</span></div>
    <p className="project-description" id={'description-' + p.id}>{p.description[lang]}</p>
    <button className="explore" type="button" aria-label={c.explore + ' ' + p.name[lang]} aria-haspopup="dialog" aria-describedby={'description-' + p.id}
      onClick={event => {reset(); onOpen(p, event.currentTarget);}}>{c.explore}<ArrowUpRight size={18} aria-hidden="true"/></button>
  </motion.article>;
}
function ProjectDialog({project: p, lang, c, moving, onClose, returnFocus}) {
  const dialog = useRef(null), animation = useRef(null), closing = useRef(false);
  function cardFrame(node) {
    const source = returnFocus?.closest('.project-card')?.querySelector('.project-visual');
    if (!source) return {transform: 'translateY(24px) scale(.94)', opacity: 0};
    const from = source.getBoundingClientRect(), to = node.getBoundingClientRect();
    return {
      transform: 'translate(' + (from.left-to.left) + 'px,' + (from.top-to.top) + 'px) scale(' + (from.width/to.width) + ',' + (from.height/to.height) + ')',
      opacity: 0, borderRadius: '5px'
    };
  }
  useLayoutEffect(() => {
    const node = dialog.current;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = 'hidden';
    if (moving && node.animate) {
      animation.current = node.animate([cardFrame(node), {transform: 'none', opacity: 1, borderRadius: '12px'}],
        {duration: 460, easing: 'cubic-bezier(.22,1,.36,1)'});
    }
    return () => {
      animation.current?.cancel();
      node.close();
      document.body.style.overflow = overflow;
      if (returnFocus?.isConnected) returnFocus.focus({preventScroll: true});
    };
  }, [returnFocus]);
  useEffect(() => {if (!moving) animation.current?.finish();}, [moving]);
  function requestClose() {
    if (closing.current) return;
    closing.current = true;
    const node = dialog.current;
    animation.current?.cancel();
    if (!moving || !node.animate) {onClose(); return;}
    node.dataset.closing = 'true';
    animation.current = node.animate([{transform: 'none', opacity: 1, borderRadius: '12px'}, cardFrame(node)],
      {duration: 280, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards'});
    animation.current.finished.then(onClose).catch(() => {});
  }
  function backdropClick(event) {
    if (event.target !== dialog.current) return;
    const rect = dialog.current.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) requestClose();
  }
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="detail-title" aria-describedby="detail-overview"
    style={{'--project-color': p.color, '--project-surface': p.surface}}
    onCancel={event => {event.preventDefault(); requestClose();}} onClick={backdropClick}>
    <div className="dialog-toolbar"><span>{c.details}</span><button autoFocus type="button" className="icon-button" aria-label={c.close} onClick={requestClose}><X size={22}/></button></div>
    <motion.div className="dialog-content" initial={moving ? {opacity: 0, y: 16} : false} animate={{opacity: 1, y: 0}}
      transition={{duration: moving ? .35 : 0, delay: moving ? .12 : 0}}>
      <span className="detail-kind">{c[p.kind]}</span>
      <h2 id="detail-title">{p.name[lang]}</h2>
      <p id="detail-overview" className="detail-overview">{p.overview[lang]}</p>
      <ul className="tech-list" aria-label={lang === 'es' ? 'Tecnologías' : 'Technologies'}>{p.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
      <div className="detail-preview"><Preview project={p} lang={lang} c={c} full/></div>
      <div className="detail-sections">{p.sections.map((section, i) => <section key={i}><h3>{section.title[lang]}</h3><p>{section.body[lang]}</p></section>)}</div>
      <nav className="detail-links" aria-label={lang === 'es' ? 'Enlaces del proyecto' : 'Project links'}>
        {p.links.map(link => <External key={link.kind} c={c} href={lang === 'es' && link.es ? link.es : link.url}>{link.kind === 'repo' && <GithubLogo size={19} aria-hidden="true"/>}{c.links[link.kind]}</External>)}
      </nav>
    </motion.div>
  </dialog>;
}
export function App() {
  const [lang, setLang] = useState(languageFromUrl);
  const [paused, setPaused] = useState(() => readPreference('angel-gallery-motion', 'on') === 'off');
  const [selected, setSelected] = useState(null);
  const trigger = useRef(null);
  const reduced = useSyncExternalStore(subscribeReducedMotion, reducedMotionSnapshot, () => true);
  const moving = !paused && !reduced;
  const c = copy[lang];
  const {active, scrolled, headerRef, navigate} = useSectionNavigation(sectionIds, moving, lang);
  useEffect(() => {
    const update = () => setLang(languageFromUrl());
    addEventListener('popstate', update);
    return () => removeEventListener('popstate', update);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.motion = moving ? 'on' : 'off';
    document.title = lang === 'es' ? 'Angel · Automatización de pruebas y desarrollo' : 'Angel · QA Automation & Development';
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.lead);
  }, [lang, moving, c.lead]);
  function switchLanguage(value) {
    if (value === lang) return;
    const url = new URL(location.href);
    url.pathname = value === 'es' ? '/es/' : '/en/';
    url.searchParams.delete('lang');
    if (location.protocol === 'file:' || window.__PORTFOLIO_ASSETS__) {
      url.pathname = location.pathname;
      url.searchParams.set('lang', value);
    }
    try { history.pushState({}, '', url.href); } catch { /* Sandboxed previews can still change language. */ }
    setLang(value);
  }
  function toggleMotion() {
    setPaused(value => {savePreference('angel-gallery-motion', value ? 'on' : 'off'); return !value;});
  }
  const motionLabel = reduced ? c.reduced : moving ? c.pause : c.resume;
  return <MotionConfig reducedMotion={moving ? "user" : "always"}><div className="site" id="top" data-demo-version="focus-and-links-1">
    <AmbientBackground moving={moving}/>
    <a href="#main" className="skip-link">{c.skip}</a>
    <motion.header ref={headerRef} layoutRoot className="site-header" data-scrolled={scrolled}><div className="header-inner">
      <a className="brand" href="#top" aria-label={'Angel — ' + c.back}>Angel<span>.</span></a>
      <SectionNavigation ids={sectionIds} labels={c.nav} label={c.navLabel} active={active} moving={moving} navigate={navigate}/>
      <div className="header-actions">
        <a className="github-link" href={github} target="_blank" rel="noopener noreferrer" aria-label={'GitHub — ' + c.external}><GithubLogo size={21} aria-hidden="true"/><span>GitHub</span></a>
        <a className="cv-link" href={assetUrl('/cv/angel-' + lang + '.pdf')} download={'angel-' + lang + '.pdf'} aria-label={c.cv}><DownloadSimple size={20} aria-hidden="true"/><span className="cv-full">{c.cv}</span><span className="cv-short" aria-hidden="true">CV</span></a>
        <div className="language-switch" role="group" aria-label={c.language}><button type="button" lang="en" aria-label="English" aria-pressed={lang === 'en'} onClick={() => switchLanguage('en')}>EN</button><span aria-hidden="true">/</span><button type="button" lang="es" aria-label="Español" aria-pressed={lang === 'es'} onClick={() => switchLanguage('es')}>ES</button></div>
        <button className="icon-button motion-toggle" type="button" aria-label={motionLabel} title={motionLabel} aria-pressed={!moving} disabled={!!reduced} onClick={toggleMotion}>{moving ? <Pause size={18}/> : <Play size={18}/>}</button>
      </div>
    </div></motion.header>
    <main id="main" className="container">
      <section className="hero" aria-labelledby="intro-title"><div className="hero-copy">
        <p className="eyebrow">{c.eyebrow}</p>
        <motion.h1 id="intro-title" initial={moving ? {opacity: 0, y: 14} : false} animate={{opacity: 1, y: 0}} transition={{duration: moving ? .7 : 0, ease: [.22,1,.36,1]}}>
          {c.greeting.slice(0,-1).replace('Angel','')}<span className="name-gradient">Angel</span><span>.</span></motion.h1>
        <p className="lead">{c.lead}</p>
      </div><HeroMotif moving={moving} c={c}/></section>
      <section id="projects" className="projects" tabIndex={-1} data-active={active === 'projects'} aria-labelledby="projects-title">
        <motion.div className="section-heading" initial={moving ? {opacity: 0, y: 18} : false}
          animate={!moving ? {opacity: 1, y: 0} : undefined} whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
          transition={{duration: moving ? .6 : 0}}>
          <h2 id="projects-title">{c.projectTitle}<span className="project-count" aria-label={lang === 'es' ? '9 proyectos' : '9 projects'}>09</span></h2><p>{c.projectLead}</p>
          <motion.div className="section-draw" aria-hidden="true" initial={moving ? {scaleX: 0} : false} animate={!moving ? {scaleX: 1} : undefined}
            whileInView={{scaleX: 1}} viewport={{once: true}} transition={{duration: moving ? 1 : 0}}/>
        </motion.div>
        <div className="project-grid">{projects.map((p, index) => <ProjectCard key={p.id} project={p} index={index} lang={lang} c={c} moving={moving} onOpen={(project, element) => {trigger.current = element; setSelected(project);}}/>)}</div>
      </section>
      <Technologies c={c} lang={lang} moving={moving} active={active === 'technologies'}/>
      <section id="about" className="personal-footer" tabIndex={-1} data-active={active === 'about'} aria-labelledby="about-title">
        <div className="personal-section" data-active={active === 'about'}>
          <div className="personal-section-heading"><span className="section-number" aria-hidden="true">03</span><h2 id="about-title">{c.about}</h2></div>
          <div className="personal-section-body"><p>{c.aboutBody}</p><p className="role-context">{c.role}</p><p className="interests">{c.interests}</p></div>
        </div>
        <section id="contact" className="personal-section" aria-labelledby="contact-title">
          <div className="personal-section-heading"><h3 id="contact-title">{c.contact}</h3></div>
          <div className="personal-section-body"><a className="email-link" href={'mailto:' + email}><EnvelopeSimple size={23} aria-hidden="true"/><span>{email}</span></a><External c={c} href={github}><GithubLogo size={21} aria-hidden="true"/>GitHub</External></div>
        </section>
      </section>
    </main>
    <footer className="site-footer container"><span>Angel Gerardo Molina Valdez</span><a href="#top">{c.back}<ArrowUp size={16} aria-hidden="true"/></a></footer>
    {selected && <ProjectDialog project={selected} lang={lang} c={c} moving={moving} returnFocus={trigger.current} onClose={() => setSelected(null)}/>}
  </div></MotionConfig>;
}
