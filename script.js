const font=document.createElement('link');font.rel='stylesheet';font.href='https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap';document.head.appendChild(font);document.documentElement.style.setProperty('--sans',"'Be Vietnam Pro',sans-serif");document.querySelectorAll('nav a').forEach((a,i)=>{const labels=['Mặc Đẹp','Review Thật','Cẩm Nang Phối Đồ','Gợi Ý Mua Sắm'];if(labels[i])a.textContent=labels[i]});const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
toggle.setAttribute('aria-expanded','false');
toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'false' : 'true'));
const saleDates=[{day:1,label:'Ngày đôi 1.1'},{day:2,label:'Ngày đôi 2.2'},{day:3,label:'Ngày đôi 3.3'},{day:4,label:'Ngày đôi 4.4'},{day:5,label:'Ngày đôi 5.5'},{day:6,label:'Ngày đôi 6.6'},{day:7,label:'Ngày đôi 7.7'},{day:8,label:'Ngày đôi 8.8'},{day:9,label:'Ngày đôi 9.9'},{day:10,label:'Ngày đôi 10.10'},{day:11,label:'Ngày đôi 11.11'},{day:12,label:'Ngày đôi 12.12'},{day:15,label:'Sale giữa tháng'},{day:25,label:'Sale cuối tháng'}];
function nextSale(){const now=new Date(), candidates=[];for(let m=now.getMonth();m<=now.getMonth()+1;m++){for(const s of saleDates){const d=new Date(now.getFullYear(),m,s.day,0,0,0);if(d>now)candidates.push({...s,date:d})}}return candidates.sort((a,b)=>a.date-b.date)[0]}
const sale=nextSale();if(sale){document.querySelector('#sale-title').textContent=sale.label;document.querySelector('#sale-date').textContent=`Mở deal lúc ${sale.date.toLocaleDateString('vi-VN',{day:'numeric',month:'numeric'})} · Bấm để săn ngay`;
function tick(){let left=Math.max(0,sale.date-new Date()),sec=Math.floor(left/1000);for(const [id,val] of [['days',Math.floor(sec/86400)],['hours',Math.floor(sec%86400/3600)],['minutes',Math.floor(sec%3600/60)],['seconds',sec%60]])document.querySelector('#'+id).textContent=String(val).padStart(2,'0')}tick();setInterval(tick,1000)}
toggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  button.textContent = 'Đã đăng ký ✓';
  button.disabled = true;
});
