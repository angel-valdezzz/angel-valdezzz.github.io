import React, {useRef, useState} from 'react';
import {motion} from 'motion/react';
import {ArrowUpRight, Browser, BracketsCurly, Code, GitBranch, Plus, Table, TreeStructure, X} from '@phosphor-icons/react';
import {technologies, technologyGroups} from './technologies.js';
import {projects, automationExamples} from './projects.js';

const assetUrl = path => window.__PORTFOLIO_ASSETS__?.[path] || path;
const capabilityIcons = [Browser, BracketsCurly, TreeStructure, Table, Code, GitBranch];

export function Technologies({c, lang, moving, active}) {
  const [selected, setSelected] = useState(null);
  const triggers = useRef(new Map());
  function close() {
    const trigger = triggers.current.get(selected);
    setSelected(null);
    trigger?.focus({preventScroll:true});
  }
  function escape(event) {
    if (event.key === 'Escape' && selected) {
      event.preventDefault();
      event.stopPropagation();
      close();
    }
  }
  return <section id="technologies" className="technologies-section" tabIndex={-1}
    data-active={active} aria-labelledby="technologies-title" onKeyDown={escape}>
    <div className="technologies-heading">
      <div className="personal-section-heading"><span className="section-number" aria-hidden="true">02</span>
        <h2 id="technologies-title">{c.technologiesTitle}</h2>
      </div>
      <div className="technologies-introduction"><p className="technologies-intro">{c.technologiesLead}</p>
        <p className="technologies-hint">{c.technologyHint}</p></div>
    </div>
    <div className="technologies-body">
      <div className="technology-groups">
        {technologyGroups.map(group => {
          const items = group.items.map(id => technologies.find(item => item.id === id));
          const current = items.find(item => item.id === selected);
          const panelId = 'technology-panel-' + group.id;
          return <div className="technology-group" key={group.id} data-group={group.id}>
            <h3 id={'technology-group-' + group.id}>{group.label[lang]}</h3>
            <ul className="technology-list" aria-labelledby={'technology-group-' + group.id}>
              {items.map((technology,index) => <motion.li className="technology-item" key={technology.id}
                initial={moving ? {opacity:0,y:10} : false} animate={!moving ? {opacity:1,y:0} : undefined}
                whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}}
                transition={{duration:moving ? .4 : 0,delay:moving ? index*.035 : 0}}>
                <button className="technology-button" type="button"
                  ref={node => {if(node) triggers.current.set(technology.id,node); else triggers.current.delete(technology.id);}}
                  aria-expanded={selected === technology.id} aria-controls={panelId}
                  onClick={() => setSelected(value => value === technology.id ? null : technology.id)}>
                  <img className={'technology-icon'+(technology.mono?' monochrome':'')+(technology.paper?' on-paper':'')}
                    src={assetUrl('/assets/technologies/'+technology.file)} alt="" width="32" height="32" loading="lazy"/>
                  <span className="technology-name">{technology.name}</span><Plus className="technology-toggle" size={15} aria-hidden="true"/>
                </button>
              </motion.li>)}
            </ul>
            <div id={panelId} className="technology-panel" hidden={!current} role={current ? 'region' : undefined}
              aria-labelledby={current ? 'technology-detail-' + current.id : undefined}>
              {current && <motion.div key={current.id} className="technology-panel-content"
                initial={moving ? {opacity:0,y:8} : false} animate={{opacity:1,y:0}}
                transition={{duration:moving ? .24 : 0}}>
                <div className="technology-detail-heading"><h4 id={'technology-detail-' + current.id}>{current.name}</h4>
                  <button className="icon-button" type="button" aria-label={c.closeTechnology} onClick={close}><X size={19} aria-hidden="true"/></button></div>
                <p className="technology-description">{current.description[lang]}</p>
                <h5>{c.technologyUses}</h5>
                <ul className="technology-uses">{current.uses[lang].map(use => <li key={use}>{use}</li>)}</ul>
                {current.projects.length > 0 && <div className="technology-projects"><h5>{c.technologyProjects}</h5>
                  <ul>{current.projects.map(id => {
                    const project = [...projects, ...automationExamples].find(item => item.id === id);
                    const href = project.links.find(link => link.kind === 'repo').url;
                    return <li key={id}><a href={href} target="_blank" rel="noopener noreferrer">{project.name[lang]}
                      <ArrowUpRight size={14} aria-hidden="true"/><span className="sr-only"> ({c.external})</span></a></li>;
                  })}</ul>
                </div>}
              </motion.div>}
            </div>
          </div>;
        })}
      </div>
      <div className="technology-capabilities"><h3 className="capabilities-label">{c.capabilitiesLabel}</h3>
        <ul className="capability-list">{c.capabilities.map((capability,index) => {
          const Icon = capabilityIcons[index];
          return <li key={capability}><Icon size={19} aria-hidden="true"/><span>{capability}</span></li>;
        })}</ul>
      </div>
    </div>
  </section>;
}
