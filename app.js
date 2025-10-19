// Simple frontend fetching from backend API (if running)
const API = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://localhost:3000/api' : '/api';

async function loadServices(){
  try{
    const res = await fetch(API + '/services');
    const list = await res.json();
    const servicesGrid = document.getElementById('servicesGrid');
    servicesGrid.innerHTML = '';
    list.forEach(s => {
      const el = document.createElement('div');
      el.className = 'service-card';
      el.innerHTML = `<img src="${s.image}" style="width:100%;height:140px;object-fit:cover;border-radius:8px" alt="${s.title}"/>
        <h3>${s.title}</h3><p style="color:#6b7280">${s.category} • $${s.price}</p>
        <a href="/static/frontend/service.html?id=${s.id}">View</a>`;
      servicesGrid.appendChild(el);
    });
  }catch(e){
    console.error('Failed to fetch services (running static demo).', e);
    document.getElementById('servicesGrid').innerHTML = `
      <div class="service-card">Demo Service - $10</div>
      <div class="service-card">Demo Service - $8</div>
      <div class="service-card">Demo Service - $5</div>`;
  }
}

function loadCategories(){
  const cats = ['Web Development','Graphic Design','Video Editing','Bots','Content Writing','Marketing','Other'];
  const grid = document.getElementById('catGrid');
  cats.forEach(c=>{
    const card = document.createElement('div');
    card.className='cat-card';
    card.innerHTML = `<strong>${c}</strong><p style="color:#6b7280">Click to view</p>`;
    grid.appendChild(card);
    card.addEventListener('click', ()=>alert('Open category: ' + c));
  });
}

loadCategories();
loadServices();
