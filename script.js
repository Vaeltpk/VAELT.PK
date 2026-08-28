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
    <article class="product-card reveal" data-code="${product.code}" tabindex="0" role="button" aria-label="Open ${product.name}">
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


/* =========================================================
   VAELT MOTION CONTROLLER
   ========================================================= */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupMotion() {
  const revealTargets = document.querySelectorAll(
    ".benefits, .products-section, .search-section, .about-section, .how-section, .contact-section, .footer"
  );
  const staggerTargets = document.querySelectorAll(".product-grid, .benefits, .how-grid, .contact-buttons, .about-small");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(el => el.classList.add("is-visible"));
    staggerTargets.forEach(el => el.classList.add("is-visible"));
  } else {
    revealTargets.forEach(el => el.classList.add("reveal"));
    staggerTargets.forEach(el => el.classList.add("reveal-stagger"));

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => observer.observe(el));
  }
}

function setupSearchMotion() {
  const toggle = document.getElementById("search-toggle");
  const section = document.getElementById("all-products");
  const input = document.getElementById("search-input");
  if (!toggle || !section) return;

  const close = document.createElement("button");
  close.className = "search-close";
  close.type = "button";
  close.setAttribute("aria-label", "Close search");
  close.textContent = "×";
  section.appendChild(close);

  const setOpen = open => {
    document.body.classList.toggle("search-open", open);
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      setTimeout(() => input?.focus(), prefersReducedMotion ? 0 : 180);
    }
  };

  toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("search-open")));
  close.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.body.classList.contains("search-open")) setOpen(false);
  });
}

function setupProductReveal() {
  if (!grid) return;
  const cards = grid.querySelectorAll(".product-card");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    cards.forEach(card => card.classList.add("is-visible"));
    return;
  }
  cards.forEach((card, index) => {
    card.classList.add("reveal");
    card.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
  });
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:.08, rootMargin:"0px 0px -30px 0px"});
  cards.forEach(card => observer.observe(card));
}

setupMotion();
setupSearchMotion();
setupProductReveal();
