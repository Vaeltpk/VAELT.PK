const INSTAGRAM = "https://www.instagram.com/vaelt.pk/";
const WHATSAPP_NUMBER = "923351295731";

const grid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

function money(value) {
  return "Rs. " + Number(value).toLocaleString("en-PK");
}

function productCard(product) {
  return `
    <article class="product-card" data-code="${product.code}" tabindex="0" role="button" aria-label="Open ${product.name}">
      <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy"
           onerror="this.onerror=null;this.src='images/hero.jpg';">
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-meta">Size: ${product.size} · Code: ${product.code}</div>
        <div class="product-price">${money(product.price)}</div>
      </div>
    </article>
  `;
}

function renderProducts(list = products) {
  if (!grid) return;
  grid.innerHTML = list.map(productCard).join("");
  grid.querySelectorAll(".product-card").forEach(card => {
    const open = () => {
      window.location.href = `product.html?code=${encodeURIComponent(card.dataset.code)}`;
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") open();
    });
  });
}

function renderSearch(list) {
  if (!searchResults) return;
  if (!list.length) {
    searchResults.innerHTML = "<p>No product found. Please check the product name or code.</p>";
    return;
  }
  searchResults.innerHTML = list.map(p => `
    <div class="search-result" data-code="${p.code}">
      <strong>${p.name}</strong>
      <span> — ${p.code} · Size ${p.size} · ${money(p.price)}</span>
    </div>
  `).join("");
  searchResults.querySelectorAll(".search-result").forEach(item => {
    item.addEventListener("click", () => {
      window.location.href = `product.html?code=${encodeURIComponent(item.dataset.code)}`;
    });
  });
}

searchInput?.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    searchResults.innerHTML = "";
    return;
  }
  const matches = products.filter(p =>
    [p.code, p.name, p.brand, p.size].some(v => String(v).toLowerCase().includes(q))
  );
  renderSearch(matches);
});

renderProducts();

document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  });
});

const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 30);
});

const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");
menuBtn?.addEventListener("click", () => navMenu?.classList.toggle("open"));
navMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navMenu.classList.remove("open")));
