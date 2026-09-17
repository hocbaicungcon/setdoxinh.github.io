const list = document.querySelector('#post-list');
const tagsEl = document.querySelector('#tags');
const params = new URLSearchParams(location.search);
const normalizeCategory = value => (value || '').trim().toLocaleLowerCase('vi').normalize('NFC');
const categories = ['Review Thật', 'Cẩm Nang Phối Đồ', 'Gợi Ý Mua Sắm'];
const requested = params.get('category') || '';
const category = normalizeCategory(requested) === 'review thời trang' ? 'Review Thật' :
  categories.find(name => normalizeCategory(name) === normalizeCategory(requested)) || requested;
let selectedTag = params.get('tag') || '';
let posts = [];
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function filterURL(tag) {
  const query = new URLSearchParams();
  if (category) query.set('category', category);
  if (tag) query.set('tag', tag);
  return 'posts.html' + (query.size ? '?' + query : '');
}
for (const href of ['posts.css', 'ui.css', 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap']) {
  const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; document.head.appendChild(link);
}
document.documentElement.style.setProperty('--sans', "'Be Vietnam Pro',sans-serif");
const saleScript = document.createElement('script'); saleScript.src = 'sale.js'; document.body.appendChild(saleScript);
const nav = document.querySelector('#main-nav');
const toggle = document.querySelector('.menu-toggle');
toggle.setAttribute('aria-expanded', 'false');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => {
  const active = (new URL(link.href).searchParams.get('category') || '') === category;
  link.classList.toggle('active', active);
  if (active) link.setAttribute('aria-current', 'page');
});
const heading = category || 'Mặc Đẹp';
document.querySelector('h1').textContent = heading;
document.title = heading + ' — Set Đồ Xinh';
const descriptions = {
  'Review Thật': 'Các bài viết đánh giá và tiêu chí lựa chọn trang phục.',
  'Cẩm Nang Phối Đồ': 'Hướng dẫn phối đồ, chọn màu và xây dựng tủ đồ dễ ứng dụng.',
  'Gợi Ý Mua Sắm': 'Gợi ý lựa chọn quần áo, túi xách và phụ kiện theo nhu cầu.'
};
if (descriptions[category]) document.querySelector('.page-intro').textContent = descriptions[category];
function render() {
  const scoped = posts.filter(p => !category || normalizeCategory(p.category) === normalizeCategory(category));
  const tags = [...new Set(scoped.flatMap(p => p.tags || []))];
  if (selectedTag && !tags.includes(selectedTag)) tags.push(selectedTag);
  tagsEl.innerHTML = ['', ...tags].map(tag => `<a class="tag-button ${tag === selectedTag ? 'selected' : ''}" href="${escapeHTML(filterURL(tag))}" ${tag === selectedTag ? 'aria-current="true"' : ''}>${escapeHTML(tag || 'Tất cả')}</a>`).join('');
  const items = scoped.filter(p => !selectedTag || (p.tags || []).includes(selectedTag));
  list.innerHTML = items.map(p => {
    const href = 'post.html?slug=' + encodeURIComponent(p.slug);
    return `<article class="post-card"><a class="post-thumbnail" href="${href}" aria-label="${escapeHTML(p.title)}"><img src="${escapeHTML(p.thumbnail)}" alt="${escapeHTML(p.title)}" loading="lazy"></a><div><p class="meta">${escapeHTML(p.category)} · ${escapeHTML(p.date)}</p><h2><a href="${href}">${escapeHTML(p.title)}</a></h2><p>${escapeHTML(p.excerpt || '')}</p><a class="read-more" href="${href}">Đọc bài →</a><div class="post-tags">${(p.tags || []).map(tag => `<a href="${escapeHTML(filterURL(tag))}">#${escapeHTML(tag)}</a>`).join('')}</div></div></article>`;
  }).join('') || '<p>Chưa có bài viết phù hợp trong danh mục này. Bạn có thể chọn tag khác hoặc quay lại Mặc Đẹp.</p>';
}
fetch('posts.json').then(response => {
  if (!response.ok) throw new Error('Không tải được bài viết');
  return response.json();
}).then(data => {
  posts = data.map(p => ({...p, category: normalizeCategory(p.category) === 'review thời trang' ? 'Review Thật' : p.category}));
  render();
}).catch(() => { list.textContent = 'Không tải được danh sách bài viết. Vui lòng tải lại trang.'; });
