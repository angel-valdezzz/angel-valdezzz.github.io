import fs from 'node:fs';
const root='dist/client',origin='https://angel-valdezzz.github.io';
const revision=process.env.GITHUB_SHA || 'local';
if(!/^(?:[a-f0-9]{40}|local)$/.test(revision)) throw new Error('Invalid build revision');
const base=fs.readFileSync(root+'/index.html','utf8').replace('</head>','<meta name="portfolio-build" content="'+revision+'"/></head>');
for(const lang of ['es','en']){
 const title=lang==='es'?'Angel · Automatización de pruebas y desarrollo':'Angel · QA Automation & Development';
 const description=lang==='es'?'Desarrollo herramientas, automatizo pruebas y sigo aprendiendo mientras construyo.':'I write tools, automate tests, and keep learning by building.';
 const html=base.replace(/<html lang="[^"]*"/,'<html lang="'+lang+'"').replace(/<title>.*?<\/title>/,'<title>'+title+'</title>').replace(/(<meta name="description" content=")[^"]*/,'$1'+description).replace(/(<meta property="og:title" content=")[^"]*/,'$1'+title).replace(/(<meta property="og:description" content=")[^"]*/,'$1'+description).replace(/content="\/assets\/social.jpg"/,'content="'+origin+'/assets/social.jpg"').replace('</head>','<link rel="canonical" href="'+origin+'/'+lang+'/"/><link rel="alternate" hreflang="es" href="'+origin+'/es/"/><link rel="alternate" hreflang="en" href="'+origin+'/en/"/><link rel="alternate" hreflang="x-default" href="'+origin+'/"/></head>');
 fs.mkdirSync(root+'/'+lang,{recursive:true});fs.writeFileSync(root+'/'+lang+'/index.html',html);
 if(lang==='en')fs.writeFileSync(root+'/index.html',html.replace(origin+'/en/"',origin+'/"'));
}
fs.writeFileSync(root+'/.nojekyll','');
fs.writeFileSync(root+'/robots.txt','User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n');
fs.writeFileSync(root+'/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+origin+'/</loc></url><url><loc>'+origin+'/es/</loc></url><url><loc>'+origin+'/en/</loc></url></urlset>');

const demoRedirect='<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex"/><meta name="portfolio-redirect" content="main"/><link rel="canonical" href="'+origin+'/"/><title>Angel · Portfolio</title><script>const lang=new URLSearchParams(location.search).get("lang");const target=new URL(lang==="es"?"/es/":"/",location.origin);target.hash=location.hash;location.replace(target.href);</script></head><body><a href="/">Open portfolio</a></body></html>';
fs.mkdirSync(root+'/demo',{recursive:true});
fs.writeFileSync(root+'/demo/index.html',demoRedirect);
