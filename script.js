const font=document.createElement('link');font.rel='stylesheet';font.href='https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap';document.head.appendChild(font);document.documentElement.style.setProperty('--sans',"'Be Vietnam Pro',sans-serif");document.querySelectorAll('nav a').forEach((a,i)=>{const labels=['Mặc Đẹp','Review Thật','Cẩm Nang Phối Đồ','Gợi Ý Mua Sắm'];if(labels[i])a.textContent=labels[i]});const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
toggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  button.textContent = 'Đã đăng ký ✓';
  button.disabled = true;
});
