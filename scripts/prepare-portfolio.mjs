import fs from 'node:fs';
const root='dist/client',origin='https://angel-valdezzz.github.io';
const base=fs.readFileSync(root+'/index.html','utf8');
for(const lang of ['es','en']){
 const title='Angel Molina · QA Automation Engineer / SDET';
 const description=lang==='es'?'Frameworks de automatización y herramientas Python para pruebas claras y mantenibles.':'Automation frameworks and Python tools for clear, maintainable software testing.';
 const html=base.replace(/<html lang="[^"]*"/,'<html lang="'+lang+'"').replace(/<title>.*?<\/title>/,'<title>'+title+'</title>').replace(/(<meta name="description" content=")[^"]*/,'$1'+description).replace(/(<meta property="og:title" content=")[^"]*/,'$1'+title).replace(/(<meta property="og:description" content=")[^"]*/,'$1'+description).replace(/content="\/assets\/social.jpg"/,'content="'+origin+'/assets/social.jpg"').replace('</head>','<link rel="canonical" href="'+origin+'/'+lang+'/"/><link rel="alternate" hreflang="es" href="'+origin+'/es/"/><link rel="alternate" hreflang="en" href="'+origin+'/en/"/><link rel="alternate" hreflang="x-default" href="'+origin+'/"/></head>');
 fs.mkdirSync(root+'/'+lang,{recursive:true});fs.writeFileSync(root+'/'+lang+'/index.html',html);
 if(lang==='en')fs.writeFileSync(root+'/index.html',html.replace(origin+'/en/"',origin+'/"'));
}
fs.writeFileSync(root+'/.nojekyll','');
fs.writeFileSync(root+'/robots.txt','User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n');
fs.writeFileSync(root+'/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+origin+'/es/</loc></url><url><loc>'+origin+'/en/</loc></url></urlset>');
