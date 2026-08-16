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
    const p = findCode(document.getElementById("codeInput").value);
    const msg = document.getElementById("searchMessage");
    if (p) {
      msg.textContent = `Found ${p.brand} ${p.name} — ${p.code}`;
      window.location.href = `product.html?code=${encodeURIComponent(p.code)}`;
    } else {
      msg.textContent = "No product matches that code. Check the code and try again.";
    }
  });
}

// NEW: make the header search button functional by scrolling to the code search
// section and focusing the input. This fixes the "upper search button not working" issue.
function setupTopSearch() {
  const btn = document.getElementById('searchToggle');
  const codeSection = document.querySelector('.code-search');
  const input = document.getElementById('codeInput');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // If code search is hidden via CSS, remove a 'hidden' class (no-op if not used)
    if (codeSection && codeSection.classList.contains('hidden')) {
      codeSection.classList.remove('hidden');
    }
    if (codeSection) {
      codeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (input) {
      // Small timeout to ensure scroll finished on some browsers before focusing
      setTimeout(() => {
        try { input.focus(); input.select && input.select(); } catch (err) {}
      }, 200);
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
        <a class="order-btn" href="https://wa.me/${STORE.phone}?text=${encodeURIComponent(`Hi VAELT, I am interested in ${p.brand} ${p.name} (${p.code}). Is it available?`)}" target="_blank">Ask a[...]
        <p class="no-payment">No online payment required. Contact VAELT to order.</p>
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

setupContact();
setupCodeSearch();
setupTopSearch();
setupFilters();
renderProducts();
renderProductPage();
