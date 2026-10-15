import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist/client');
const toData = (file, type) => 'data:' + type + ';base64,' + fs.readFileSync(file).toString('base64');
const mime = file => ({'.woff2':'font/woff2','.woff':'font/woff','.webp':'image/webp','.pdf':'application/pdf','.ico':'image/x-icon','.png':'image/png','.svg':'image/svg+xml'}[path.extname(file)] || 'application/octet-stream');
function localAsset(url) {
  const resolved=path.resolve(root, '.'+url.split('?')[0]);
  if(!resolved.startsWith(root+path.sep)) throw new Error('Asset outside build directory: '+url);
  return resolved;
}
let html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const assetMap = {};
for (const url of ['/assets/projects/evidence-reporter.webp','/assets/projects/marka.webp','/assets/projects/request-reporter.webp','/cv/angel-en.pdf','/cv/angel-es.pdf']) {
  const file=localAsset(url); assetMap[url]=toData(file,mime(file));
}
html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, tag => {
  const url=tag.match(/href="([^"]+)"/)?.[1];
  if(!url) throw new Error('Stylesheet without href');
  let css=fs.readFileSync(localAsset(url),'utf8');
  css=css.replace(/url\((['"]?)(\/assets\/[^)'"]+)\1\)/g,(_,q,asset)=>'url("'+toData(localAsset(asset),mime(asset))+'")');
  return '<style>'+css+'</style>';
});
html=html.replace(/<link\b[^>]*rel="icon"[^>]*>/g,tag=>tag.replace(/href="([^"]+)"/,(_,url)=>'href="'+toData(localAsset(url),mime(url))+'"'));
html = html.replace(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g, (_,url) => {
  const js=fs.readFileSync(localAsset(url),'utf8');
  if (/\bimport\s*\(/.test(js)) throw new Error('Demo needs a single static JS bundle');
  return '<script type="module">'+js.replace(/<\/script/gi,'<\\/script')+'</script>';
});
html=html.replace('</head>','<script>window.__PORTFOLIO_ASSETS__='+JSON.stringify(assetMap)+'</script></head>');
html=html.replace(/<link rel="canonical"[^>]*>/g,'').replace(/<link rel="alternate"[^>]*>/g,'');
fs.writeFileSync(path.join(root,'angel-gallery-demo.html'),html);
console.log('Standalone gallery demo: '+Buffer.byteLength(html)+' bytes; assets and CVs embedded.');
