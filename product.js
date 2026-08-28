const params = new URLSearchParams(window.location.search);
const code = params.get("code");
const product = products.find(p => p.code.toLowerCase() === String(code || "").toLowerCase());
const root = document.getElementById("product-detail");

function waLink(p) {
  const message = `Hi VAELT, I'm interested in ${p.code} — ${p.name}. Is it still available?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

if (!product) {
  root.innerHTML = `
    <div style="grid-column:1/-1;text-align:center">
      <h1 style="font-family:var(--heading);font-size:48px">Product not found</h1>
      <p style="color:var(--muted);margin:15px 0 25px">Please check the product code.</p>
      <a class="action" href="index.html#products">BACK TO SHOP</a>
    </div>
  `;
} else {
  document.title = `${product.name} — VAELT`;
  root.innerHTML = `
    <img class="detail-image" src="${product.image}" alt="${product.name}"
         onerror="this.onerror=null;this.src='images/hero.jpg';">

    <section class="detail-copy">
      <span class="eyebrow">VAELT / ${product.code}</span>
      <h1>${product.name}</h1>
      <div class="detail-brand">${product.brand}</div>

      <div class="detail-meta">
        <span>SIZE<br><strong>${product.size}</strong></span>
        <span>CODE<br><strong>${product.code}</strong></span>
        <span>CONDITION<br><strong>${product.condition}</strong></span>
      </div>

      <div class="detail-price">Rs. ${Number(product.price).toLocaleString("en-PK")}</div>
      <div class="detail-condition">THRIFT / PRE-OWNED ITEM</div>
      <p class="detail-description">${product.description}</p>

      <div class="actions">
        <a class="action" href="${waLink(product)}" target="_blank" rel="noopener noreferrer">
          ORDER ON WHATSAPP →
        </a>
        <a class="action" href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer">
          ASK ON INSTAGRAM →
        </a>
      </div>

      <div class="notice">
        Please check the photos, size, condition and product details before ordering.
        Thrift/pre-owned items are final sale and cannot be returned or exchanged.
      </div>
    </section>
  `;
}
