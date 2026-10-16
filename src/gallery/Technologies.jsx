import React from 'react';
import {motion} from 'motion/react';

const technologies = [
  {name:'Python',file:'python.svg'},
  {name:'Java',file:'java.svg'},
  {name:'Robot Framework',file:'robot-framework.svg',mono:true},
  {name:'GitHub Actions',file:'github-actions.svg',mono:true}
];
const assetUrl = path => window.__PORTFOLIO_ASSETS__?.[path] || path;

export function Technologies({c, moving, active}) {
  return <section id="technologies" className="technologies-section" tabIndex={-1}
    data-active={active} aria-labelledby="technologies-title">
    <div className="personal-section-heading"><span className="section-number" aria-hidden="true">02</span>
      <h2 id="technologies-title">{c.technologiesTitle}</h2><p className="technologies-intro">{c.technologiesLead}</p>
    </div>
    <div className="technologies-body">
      <ul className="technology-list" aria-label={c.technologyGroup}>
        {technologies.map((technology,index) => <motion.li className="technology-item" key={technology.name}
          initial={moving ? {opacity:0,y:12} : false} animate={!moving ? {opacity:1,y:0} : undefined}
          whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}}
          transition={{duration:moving ? .45 : 0,delay:moving?index*.06:0}}>
          <img className={'technology-icon'+(technology.mono?' monochrome':'')}
            src={assetUrl('/assets/technologies/'+technology.file)} alt="" width="40" height="40" loading="lazy"/>
          <span>{technology.name}</span>
        </motion.li>)}
      </ul>
      <h3 className="capabilities-label">{c.capabilitiesLabel}</h3>
      <ul className="capability-list">{c.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul>
    </div>
  </section>;
}
