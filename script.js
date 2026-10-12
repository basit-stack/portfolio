// Skills
// ===== EDIT YOUR DETAILS HERE (leave "" to hide an item) =====
const CONFIG={email:"",linkedin:"",github:"",college:"",cgpa:"",resume:"",certifications:[],achievements:[]};
// certifications: [{title:"Name",issuer:"Issuer",year:"2026"}]  achievements: [{title:"Name",detail:"Details"}]
const skills=[["🐍","Python","Programming"],["⚙️","C","Programming"],["☕","Java","Programming"],["🌐","HTML","Web"],["🎨","CSS","Web"],["⚡","JavaScript","Web"],["🗄️","SQL","Database"],["🤖","Machine Learning","AI / ML"],["📊","Data Science","AI / ML"]];
document.getElementById('skillgrid').innerHTML=skills.map(s=>`<div class="glass skill"><i>${s[0]}</i><h3>${s[1]}</h3><span class="tag" style="margin:.5rem 0 0">${s[2]}</span></div>`).join('');
const card=(t,d)=>`<div class="glass"><h3>${t}</h3><p class="sub">${d}</p></div>`;
CONFIG.achievements.forEach(a=>document.getElementById('achgrid').insertAdjacentHTML('beforeend',card('🏆 '+a.title,a.detail||'')));
document.getElementById('certgrid').innerHTML=CONFIG.certifications.length?CONFIG.certifications.map(c=>card('📜 '+c.title,[c.issuer,c.year].filter(Boolean).join(' · '))).join(''):card('📜 Certifications','Always learning. Certificates will be added here as I earn them.');
document.querySelectorAll('[data-link]').forEach(el=>{const k=el.dataset.link,v=CONFIG[k];if(v){el.href=(k==='email'?'mailto:':'')+v;if(k!=='email')el.target='_blank';el.rel='noopener'}else el.style.display='none'});
document.querySelectorAll('[data-hide]').forEach(el=>{if(CONFIG[el.dataset.hide])el.style.display='none'});
document.querySelectorAll('[data-show]').forEach(el=>{if(!CONFIG[el.dataset.show])el.style.display='none'});
document.querySelectorAll('[data-text]').forEach(el=>el.textContent=CONFIG[el.dataset.text]||'');
const rb=document.getElementById('rbtn');
if(CONFIG.resume){rb.href=CONFIG.resume;rb.setAttribute('download','')}else rb.onclick=e=>{e.preventDefault();print()};
// Reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('.bar b').forEach(b=>b.style.width=b.dataset.level+'%')}}),{threshold:.15});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));
// Project cards
document.querySelectorAll('.proj').forEach(c=>c.addEventListener('click',e=>{if(e.target.closest('a'))return;c.classList.toggle('open')}));
// Nav
const menu=document.getElementById('menu'),links=document.getElementById('links');
menu.onclick=()=>links.classList.toggle('show');
links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('show'));
const secs=[...document.querySelectorAll('section')];
addEventListener('scroll',()=>{let cur='';secs.forEach(s=>{if(scrollY>=s.offsetTop-140)cur=s.id});links.querySelectorAll('a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur))});
// Typed
const words=["AI & ML Enthusiast","Computer Vision Builder","Python Developer"];let wi=0,ci=0,del=false;const t=document.getElementById('typed');
(function type(){const w=words[wi];t.textContent=w.slice(0,ci)+'▌';if(!del&&ci++===w.length){del=true;return setTimeout(type,1400)}if(del&&--ci<0){del=false;ci=0;wi=(wi+1)%words.length}setTimeout(type,del?40:80)})();
// Theme
const root=document.documentElement;
document.getElementById('theme').onclick=()=>{const dark=getComputedStyle(root).getPropertyValue('--bg').trim()==='#07070d';root.dataset.theme=dark?'light':'dark'};
// Form
document.getElementById('cform').onsubmit=e=>{e.preventDefault();const f=e.target,n=f.elements,note=document.getElementById('note');
if(CONFIG.email){location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent('Portfolio message from '+n[0].value)}&body=${encodeURIComponent(n[2].value+'\n\n'+n[0].value+' ('+n[1].value+')')}`;note.textContent='Opening your email app...'}else note.textContent='Thanks! (Demo form: set CONFIG.email in the script to enable sending.)';f.reset()};
// Polish: progress, glow, spotlight, tilt, stagger
const prog=document.getElementById('prog'),cg=document.getElementById('cg');
addEventListener('scroll',()=>prog.style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%');
addEventListener('mousemove',e=>{cg.style.left=e.clientX+'px';cg.style.top=e.clientY+'px'});
document.querySelectorAll('.glass').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');
if(c.classList.contains('proj')&&!c.classList.contains('feat')){const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateY(-6px)`}});
c.addEventListener('mouseleave',()=>c.style.transform='')});
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.grid').forEach(g=>[...g.children].forEach((c,i)=>{c.classList.add('rv');c.style.setProperty('--d',(i%4)*90+'ms');io2.observe(c)}));
document.getElementById('yr').textContent=new Date().getFullYear();
// Animated background: neural-network particles
const cv=document.getElementById('bg'),cx=cv.getContext('2d');let P=[],W,H,m={x:-999,y:-999};
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;P=Array.from({length:Math.min(90,W/16)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))}
addEventListener('resize',size);addEventListener('mousemove',e=>{m.x=e.clientX;m.y=e.clientY});size();
(function draw(){cx.clearRect(0,0,W,H);
const g=cx.createRadialGradient(W*.8,H*.1,0,W*.8,H*.1,W*.6);g.addColorStop(0,'rgba(155,92,255,.18)');g.addColorStop(1,'transparent');cx.fillStyle=g;cx.fillRect(0,0,W,H);
const g2=cx.createRadialGradient(W*.1,H*.9,0,W*.1,H*.9,W*.5);g2.addColorStop(0,'rgba(79,140,255,.16)');g2.addColorStop(1,'transparent');cx.fillStyle=g2;cx.fillRect(0,0,W,H);
P.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
cx.fillStyle='rgba(120,140,255,.7)';cx.beginPath();cx.arc(p.x,p.y,1.8,0,7);cx.fill();
for(let j=i+1;j<P.length;j++){const q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<130){cx.strokeStyle=`rgba(130,120,255,${.25*(1-d/130)})`;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}
const dm=Math.hypot(p.x-m.x,p.y-m.y);if(dm<160){cx.strokeStyle=`rgba(79,140,255,${.5*(1-dm/160)})`;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(m.x,m.y);cx.stroke()}});
requestAnimationFrame(draw)})();