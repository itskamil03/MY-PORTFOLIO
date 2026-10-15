const D=window.PORTFOLIO,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const R=(h,d=0)=>`<div class="rv" style="--d:${d*90}ms">${h}</div>`;
const li=a=>`<ul>${a.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const secs=['about','skills','experience','projects','education','contact'];
$('#links').innerHTML=secs.map(s=>`<a href="#${s}">${s[0].toUpperCase()+s.slice(1)}</a>`).join('');
$('#name').innerHTML=D.name.split(' ').map((w,j)=>`<span class="wd">${[...w].map((c,i)=>`<span class="ch" style="--i:${i+j*3}">${c}</span>`).join('')}</span>`).join(' ');
$('#tag').textContent=D.tagline;$('#status').textContent=D.status;$('#cv').href=D.resume;
$('#soc').innerHTML=Object.entries(D.social).map(([k,u])=>`<a href="${u}" target="_blank" rel="noopener">${k}</a>`).join('')+`<a href="mailto:${D.email}">Email</a>`;
$('#marq').innerHTML=[...D.marquee,...D.marquee].map(t=>`<span>${t}</span>`).join('');
$('#about-t').innerHTML=D.about.map((t,i)=>R(`<p>${t}</p>`,i)).join('');
$('#stats').innerHTML=D.stats.map(([n,l,s=''],i)=>R(`<div class="stat"><b data-n="${n}" data-s="${s}">0</b><span>${l}</span></div>`,i)).join('');
$('#skills-g').innerHTML=Object.entries(D.skills).map(([k,v],i)=>R(`<div class="sk"><h3>${k}</h3>${li(v)}</div>`,i)).join('');
$('#tl').innerHTML=D.experience.map((e,i)=>R(`<div class="it"><div class="when">${e.time}<small>${e.place}</small></div><div><h3>${e.role}</h3><p class="org">${e.org}</p>${li(e.points)}</div></div>`,i)).join('');
$('#proj').innerHTML=D.projects.map(p=>`<article class="pj rv"><div class="pt"><h3>${p.title}</h3><span>${p.type}</span></div><div class="pb"><p>${p.desc}</p><div class="tags">${p.tech.map(t=>`<i>${t}</i>`).join('')}</div><div class="lk">${p.links.map(([l,u])=>`<a href="${u}" target="_blank" rel="noopener">${l}</a>`).join('')}</div></div></article>`).join('');
$('#edu').innerHTML=D.education.map((e,i)=>R(`<div class="it"><div class="when">${e.time}</div><div><h3>${e.deg}</h3><p class="org">${e.org}</p><p style="color:var(--mut)">${e.note}</p></div></div>`,i)).join('');
$('#cmail').textContent=D.email;$('#cmail').href='mailto:'+D.email;
$('#cinfo').textContent=D.phone+'\n'+D.location;$('#yr').textContent=new Date().getFullYear();

// role typing
let ri=0,ci=0,del=0;const T=$('#typed');
(function tick(){const w=D.roles[ri];ci+=del?-1:1;T.textContent=w.slice(0,ci);let t=del?35:80;
if(!del&&ci===w.length){del=1;t=1500}else if(del&&!ci){del=0;ri=(ri+1)%D.roles.length;t=300}setTimeout(tick,t)})();

// reveal on scroll, counters, nav highlight, progress
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach(n=>io.observe(n));
const count=b=>{const n=+b.dataset.n,s=b.dataset.s||'',t0=performance.now();(function f(t){const p=Math.min((t-t0)/1400,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(f)})(t0)};
const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){count(e.target);co.unobserve(e.target)}}));
$$('[data-n]').forEach(b=>co.observe(b));
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('section[id]').forEach(s=>so.observe(s));
addEventListener('scroll',()=>{const h=document.documentElement;$('#progress').style.transform=`scaleX(${scrollY/(h.scrollHeight-innerHeight)})`;$('#nav').classList.toggle('s',scrollY>30)},{passive:true});

// pointer: blueprint grid follows cursor, name letters lift, buttons pull toward cursor
const chs=$$('.ch'),mags=$$('.mag');
addEventListener('pointermove',e=>{
document.body.style.setProperty('--px',e.clientX+'px');document.body.style.setProperty('--py',e.clientY+'px');
if(scrollY<innerHeight)chs.forEach(c=>{const r=c.getBoundingClientRect(),d=Math.hypot(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2);c.style.setProperty('--k',Math.max(0,1-d/150).toFixed(2))});
mags.forEach(b=>{const r=b.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2;b.style.translate=Math.hypot(dx,dy)<90?`${dx*.25}px ${dy*.35}px`:'0 0'})});

// contact form opens the visitor's email app (swap for your API when the admin panel exists)
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);
location.href=`mailto:${D.email}?subject=${encodeURIComponent('Portfolio message from '+f.get('name'))}&body=${encodeURIComponent(f.get('message')+'\n\nReply to: '+f.get('email'))}`;
const b=e.target.querySelector('button');b.textContent='Opening your email app';setTimeout(()=>b.textContent='Send message',3000)});
