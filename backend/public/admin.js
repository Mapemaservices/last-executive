const API = '/api';
let token = localStorage.getItem('adminToken') || '';

const loginDiv = document.getElementById('login');
const dashboardDiv = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const adminSections = document.getElementById('adminSections');

function showDashboard() {
  loginDiv.classList.add('hidden');
  dashboardDiv.classList.remove('hidden');
  loadAllSections();
}
function showLogin() {
  dashboardDiv.classList.add('hidden');
  loginDiv.classList.remove('hidden');
}

if (token) showDashboard();
else showLogin();

loginForm && loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (res.ok) {
    const data = await res.json();
    token = data.token;
    localStorage.setItem('adminToken', token);
    showDashboard();
  } else {
    loginError.classList.remove('hidden');
  }
});

logoutBtn && logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('adminToken');
  token = '';
  showLogin();
});

const sections = [
  { name: 'Services', key: 'services', fields: ['name', 'price', 'description', 'category'] },
  { name: 'Gallery', key: 'gallery', fields: ['src', 'alt'] },
  { name: 'Employees', key: 'employees', fields: ['name', 'image', 'bio'] },
  { name: 'Testimonials', key: 'testimonials', fields: ['author', 'text'] },
  { name: 'Contact', key: 'contact', fields: ['location', 'phone', 'email', 'hours'] },
  { name: 'Packages', key: 'packages', fields: ['name', 'price', 'description'] },
  { name: 'Settings', key: 'settings', fields: ['heroTitle', 'heroSubtitle'] }
];

async function loadAllSections() {
  adminSections.innerHTML = '';
  for (const section of sections) {
    const data = await fetch(`${API}/${section.key}`).then(r => r.json());
    adminSections.appendChild(renderSection(section, data));
  }
}

function renderSection(section, data) {
  const div = document.createElement('div');
  div.className = 'bg-white p-6 rounded shadow';
  div.innerHTML = `<h2 class="text-xl font-bold mb-4">${section.name}</h2>`;
  if (Array.isArray(data)) {
    div.appendChild(renderTable(section, data));
    div.appendChild(renderAddForm(section));
  } else {
    div.appendChild(renderEditForm(section, data));
  }
  return div;
}

function renderTable(section, items) {
  const table = document.createElement('table');
  table.className = 'min-w-full mb-4';
  table.innerHTML = `<thead><tr>${section.fields.map(f => `<th class='border px-2 py-1'>${f}</th>`).join('')}<th></th></tr></thead>`;
  const tbody = document.createElement('tbody');
  items.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = section.fields.map(f => `<td class='border px-2 py-1'>${item[f] || ''}</td>`).join('') +
      `<td class='border px-2 py-1'><button class='bg-red-500 text-white px-2 py-1 rounded' onclick='deleteItem("${section.key}",${idx})'>Delete</button></td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}

function renderAddForm(section) {
  const form = document.createElement('form');
  form.className = 'flex flex-wrap gap-2 mb-2';
  form.innerHTML = section.fields.map(f => `<input name='${f}' placeholder='${f}' class='border p-1 rounded' required>`).join('') +
    `<button class='bg-green-500 text-white px-3 py-1 rounded' type='submit'>Add</button>`;
  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    const items = await fetch(`${API}/${section.key}`).then(r => r.json());
    items.push(formData);
    await fetch(`${API}/${section.key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    });
    loadAllSections();
  };
  return form;
}

function renderEditForm(section, data) {
  const form = document.createElement('form');
  form.className = 'flex flex-wrap gap-2 mb-2';
  form.innerHTML = section.fields.map(f => `<input name='${f}' value='${data[f] || ''}' placeholder='${f}' class='border p-1 rounded' required>`).join('') +
    `<button class='bg-blue-500 text-white px-3 py-1 rounded' type='submit'>Save</button>`;
  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    await fetch(`${API}/${section.key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    loadAllSections();
  };
  return form;
}

window.deleteItem = async function(section, idx) {
  const items = await fetch(`${API}/${section}`).then(r => r.json());
  items.splice(idx, 1);
  await fetch(`${API}/${section}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items)
  });
  loadAllSections();
};
