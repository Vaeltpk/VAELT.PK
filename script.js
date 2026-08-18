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
        <img src="${p.image}" alt="${p.brand} ${p.name}" loading="lazy">
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
  const clean = (code || "").trim().toUpperCase();
  return products.find(p => p.code.toUpperCase() === clean);
}

function setupCodeSearch() {
  const form = document.getElementById("codeForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const inputEl = document.getElementById("codeInput");
    const msg = document.getElementById("searchMessage");
    const term = ((inputEl && inputEl.value) || "").trim();

    if (!/^VAELT-\d+/i.test(term)) {
      if (msg) msg.textContent = "Enter a valid VAELT code, e.g. VAELT-001.";
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
  const p = findCode(code);

  if (!p) {
    box.innerHTML = `
      <div class="not-found">
        <h1>Product not found</h1>
        <p>Check the VAELT product code and try again.</p>
        <a class="hero-btn" href="index.html#shop">Back to shop</a>
      </div>`;
    return;
  }

  const gallery = Array.isArray(p.gallery) && p.gallery.length ? p.gallery : [p.image];
  const message = `Hi VAELT 👋 I'm interested in ${p.brand} ${p.name}. Product Code: ${p.code}. Is it still available?`;

  box.innerHTML = `
    <div class="breadcrumbs">
      <a href="index.html">Home</a> / <a href="index.html#shop">Shop</a> / ${p.code}
    </div>

    <div class="product-layout">
      <div class="gallery">
        <div class="main-photo">
          <img id="mainPhoto" src="${gallery[0]}" alt="${p.brand} ${p.name}">
        </div>
        <div class="thumbs">
          ${gallery.map((img, i) => `
            <button type="button" class="${i === 0 ? "selected" : ""}" data-img="${img}">
              <img src="${img}" alt="${p.name} view ${i + 1}" loading="lazy">
            </button>
          `).join("")}
        </div>
      </div>

      <div class="product-info">
        <span>${p.brand} • ${p.code}</span>
        <h1>${p.name}</h1>
        <div class="big-price">${money(p.price)}</div>

        <div class="specs">
          <div><span>SIZE</span><strong>${p.size}</strong></div>
          <div><span>CONDITION</span><strong>${p.condition}</strong></div>
          <div><span>CODE</span><strong>${p.code}</strong></div>
        </div>

        <div class="product-description-label">PRODUCT DETAILS</div>
        <p>${p.description}</p>

        <div class="action-buttons">
          <a class="order-btn instagram-btn"
             href="https://www.instagram.com/vaelt.pk/"
             target="_blank" rel="noopener">
             ASK ON INSTAGRAM
          </a>

          <a class="order-btn whatsapp-btn"
             href="https://wa.me/${STORE.phone}?text=${encodeURIComponent(message)}"
             target="_blank" rel="noopener">
             MESSAGE ON WHATSAPP
          </a>
        </div>

        <div class="product-note">
          Product code <strong>${p.code}</strong> is automatically included in the WhatsApp message.
          Please mention this code when contacting VAELT on Instagram.
        </div>
      </div>
    </div>`;

  document.querySelectorAll(".thumbs button").forEach(btn => {
    btn.addEventListener("click", () => {
      const main = document.getElementById("mainPhoto");
      if (main) main.src = btn.dataset.img;
      document.querySelectorAll(".thumbs button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });

  document.title = `VAELT — ${p.brand} ${p.name}`;
}

function setupReturnPolicy() {
  const link = document.getElementById("returnPolicyLink");
  const modal = document.getElementById("returnPolicyModal");
  if (!link || !modal) return;

  const body = modal.querySelector(".modal-body");
  const closeButtons = modal.querySelectorAll("#returnPolicyClose, #returnPolicyClose2");

  const policyHtml = `
    <p><strong>All sales are final.</strong></p>
    <p>VAELT is a thrift store offering pre-owned and carefully inspected footwear. Due to the nature of thrifted products, we do not accept returns or exchanges once an order has been confirmed.</p>
    <p>Please carefully check the product details, size, condition, and photos before placing your order. If you have any questions about a product, contact us before purchasing.</p>
  `;

  function openModal() {
    if (body) body.innerHTML = policyHtml;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const first = modal.querySelector(".close-btn");
    if (first) first.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    link.focus();
  }

  link.addEventListener("click", e => {
    e.preventDefault();
    openModal();
  });

  closeButtons.forEach(b => b.addEventListener("click", closeModal));
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
}

setupContact();
setupCodeSearch();
setupReturnPolicy();
setupFilters();
renderProducts();
renderProductPage();
