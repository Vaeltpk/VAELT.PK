const money = n => `Rs. ${Number(n).toLocaleString("en-PK")}`;

function setupContact() {
  const link = `https://wa.me/${STORE.phone}`;
  document.querySelectorAll("#contactTop,#contactFooter").forEach(el => {
    el.href = link;
    if (el.id === "contactFooter") el.textContent = STORE.displayPhone + " / WhatsApp";
  });
}

function productCard(p) {
  return `
    <article class="card">
      <a href="product.html?code=${encodeURIComponent(p.code)}" class="card-image">
        <img src="${p.image}" alt="${p.brand} ${p.name}">
        <span class="condition">${p.condition}</span>
      </a>
      <div class="card-info">
        <div><span class="brand">${p.brand}</span><span class="code">${p.code}</span></div>
        <a href="product.html?code=${encodeURIComponent(p.code)}"><h3>${p.name}</h3></a>
        <div class="meta"><span>${p.size}</span><strong>${money(p.price)}</strong></div>
      </div>
    </article>`;
}

function renderProducts(list = products) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;
  grid.innerHTML = list.length ? list.map(productCard).join("") :
    `<div class="empty">No product found.</div>`;
  const count = document.getElementById("count");
  if (count) count.textContent = `${list.length} products`;
}

function findCode(code) {
  const clean = code.trim().toUpperCase();
  return products.find(p => p.code.toUpperCase() === clean);
}

function setupCodeSearch() {
  const form = document.getElementById("codeForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const inputEl = document.getElementById("codeInput");
    const msg = document.getElementById("searchMessage");
    const raw = (inputEl && inputEl.value) || "";
    const term = raw.trim();

    // Only proceed if the input looks like a VAELT code (e.g. VAELT-001)
    if (!/^VAELT-\d+/i.test(term)) {
      // Clear any previous messages and do nothing for non-code terms
      if (msg) msg.textContent = "";
      return;
    }

    const p = findCode(term);
    if (p) {
      if (msg) msg.textContent = `Found ${p.brand} ${p.name} — ${p.code}`;
      window.location.href = `product.html?code=${encodeURIComponent(p.code)}`;
    } else {
      if (msg) msg.textContent = "No product matches that code. Check the code and try again.";
    }
  });
}

function setupFilters() {
  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.category;
      renderProducts(cat === "all" ? products : products.filter(p => p.category === cat));
    });
  });
}

function renderProductPage() {
  const box = document.getElementById("productPage");
  if (!box) return;
  const code = new URLSearchParams(location.search).get("code");
  const p = findCode(code || "");
  if (!p) {
    box.innerHTML = `<div class="not-found"><h1>Product not found</h1><p>Check the VAELT code.</p><a class="hero-btn" href="index.html">Back to shop</a></div>`;
    return;
  }

  box.innerHTML = `
    <div class="breadcrumbs"><a href="index.html">Home</a> / ${p.code}</div>
    <div class="product-layout">
      <div class="gallery">
        <div class="main-photo"><img id="mainPhoto" src="${p.gallery[0]}" alt="${p.name}"></div>
        <div class="thumbs">${p.gallery.map((img,i)=>`<button class="${i===0?'selected':''}" data-img="${img}"><img src="${img}" alt=""></button>`).join("")}</div>
      </div>
      <div class="product-info">
        <span class="eyebrow">${p.brand} • ${p.code}</span>
        <h1>${p.name}</h1>
        <div class="big-price">${money(p.price)}</div>
        <div class="specs">
          <div><span>SIZE</span><strong>${p.size}</strong></div>
          <div><span>CONDITION</span><strong>${p.condition}</strong></div>
          <div><span>CODE</span><strong>${p.code}</strong></div>
        </div>
        <p>${p.description}</p>
        <div class="action-buttons">
          <a class="order-btn instagram-btn" href="https://www.instagram.com/direct/t/18085834331276429/" target="_blank" onclick="alert('Hi VAELT 👋 I\'m interested in this pair. Is it still available? 👟\n\nProduct: ${p.brand} ${p.name}\nCode: ${p.code}')">Ask on Instagram 📸</a>
          <a class="order-btn whatsapp-btn" href="https://wa.me/${STORE.phone}?text=${encodeURIComponent(`Hi VAELT, I am interested in ${p.brand} ${p.name} (${p.code}). Is it available?`)}" target="_blank">Ask on WhatsApp</a>
        </div>
        <p class="no-payment">Contact VAELT to order.</p>
      </div>
    </div>`;

  document.querySelectorAll(".thumbs button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("mainPhoto").src = btn.dataset.img;
      document.querySelectorAll(".thumbs button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
}

// Return Policy modal setup — ensure policy text is injected when opening so it always appears
function setupReturnPolicy() {
  const link = document.getElementById('returnPolicyLink');
  const modal = document.getElementById('returnPolicyModal');
  if (!link || !modal) return;

  const body = modal.querySelector('.modal-body');
  const closeButtons = modal.querySelectorAll('#returnPolicyClose, #returnPolicyClose2');

  const policyHtml = `
    <p>All sales are final.</p>
    <p>VAELT is a thrift store offering pre-owned and carefully inspected footwear. Due to the nature of thrifted products, we do not accept returns or exchanges once an order has been confirmed.[...]
    <p>Please carefully check the product details, size, condition, and photos before placing your order. If you have any questions about a product, feel free to contact us before purchasing.</p>
  `;

  function openModal() {
    if (body) body.innerHTML = policyHtml; // inject exact wording
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scroll
    const first = modal.querySelector('.close-btn');
    if (first) first.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    link.focus();
  }

  link.addEventListener('click', e => { e.preventDefault(); openModal(); });
  closeButtons.forEach(b => b.addEventListener('click', closeModal));
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
}

setupContact();
setupCodeSearch();
setupReturnPolicy();
setupFilters();
renderProducts();
renderProductPage();
