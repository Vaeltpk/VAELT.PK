// Product data array
const products = [
  {
    code: "VA001",
    name: "Adidas Samba OG",
    brand: "Adidas",
    size: "42",
    price: 4200,
    condition: "Excellent",
    image: "images/product-1.jpg",
    description: "Clean pre-owned pair in excellent condition."
  },
  {
    code: "VA002",
    name: "New Balance 530",
    brand: "New Balance",
    size: "43",
    price: 5500,
    condition: "Good",
    image: "images/product-2.jpg",
    description: "Pre-loved pair with minimal wear."
  },
  {
    code: "VA003",
    name: "Converse Chuck 70",
    brand: "Converse",
    size: "42",
    price: 3800,
    condition: "Very Good",
    image: "images/product-3.jpg",
    description: "Vintage style, well maintained."
  },
  {
    code: "VA004",
    name: "Nike Air Force 1 '07",
    brand: "Nike",
    size: "43",
    price: 5200,
    condition: "Excellent",
    image: "images/product-4.jpg",
    description: "Classic white sneakers, pre-owned."
  },
  {
    code: "VA005",
    name: "Vans Old Skool",
    brand: "Vans",
    size: "42",
    price: 3200,
    condition: "Good",
    image: "images/product-5.jpg",
    description: "Casual vintage sneakers."
  }
];

// Generate product cards
const productGrid = document.getElementById('product-grid');

function renderProducts() {
  productGrid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.code = product.code;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" />
      <div class="product-info">
        <div><strong>${product.name}</strong></div>
        <div>Size: ${product.size}</div>
        <div>Code: ${product.code}</div>
        <div class="product-price">Rs. ${product.price.toLocaleString()}</div>
      </div>
    `;
    card.addEventListener('click', () => openProductModal(product));
    productGrid.appendChild(card);
  });
}

// Open modal with product details
const modal = document.getElementById('product-modal');
const modalBody = modal.querySelector('.modal-body');

function openProductModal(product) {
  modal.classList.remove('hidden');
  modalBody.innerHTML = `
    <img src="${product.image}" alt="${product.name}" style="width:100%; max-height:400px; object-fit:cover; border-radius:4px;" />
    <h2 style="margin-top:1rem;">${product.name}</h2>
    <p><strong>Brand:</strong> ${product.brand}</p>
    <p><strong>Size:</strong> ${product.size}</p>
    <p><strong>Code:</strong> ${product.code}</p>
    <p><strong>Condition:</strong> ${product.condition}</p>
    <p><strong>Price:</strong> Rs. ${product.price.toLocaleString()}</p>
    <p><strong>Description:</strong> ${product.description}</p>
    <button class="btn btn-primary" id="ask-instagram" data-code="${product.code}" data-name="${product.name}">ASK ON INSTAGRAM</button>
  `;
  document.getElementById('ask-instagram').addEventListener('click', () => {
    const msg = `Hi VAELT, I'm interested in product ${product.code} — ${product.name}. Is it still available?`;
    window.open(`https://www.instagram.com/vaelt.pk/`, '_blank', 'noopener noreferrer');
  });
}

// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
  modal.classList.add('hidden');
});
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

// Scroll buttons
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.scroll);
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Search functionality
const searchInput = document.getElementById('search-input');
const searchResultsContainer = document.getElementById('search-results');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    searchResultsContainer.innerHTML = '';
    return;
  }
  const results = products.filter(p => 
    p.name.toLowerCase().includes(query) || p.code.toLowerCase().includes(query)
  );
  if (results.length === 0) {
    searchResultsContainer.innerHTML = '<p>No product found. Please check the product code.</p>';
  } else {
    searchResultsContainer.innerHTML = results.map(p => `
      <div class="search-result" data-code="${p.code}">${p.name} (${p.code})</div>
    `).join('');
    document.querySelectorAll('.search-result').forEach(item => {
      item.addEventListener('click', () => {
        const code = item.dataset.code;
        const product = products.find(p => p.code === code);
        if (product) {
          openProductModal(product);
        }
      });
    });
  }
});

// "Learn More" button
document.getElementById('learn-more-btn').addEventListener('click', () => {
  document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

// Sticky nav background change
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    document.querySelector('.header').style.backgroundColor = 'rgba(0,0,0,1)';
  } else {
    document.querySelector('.header').style.backgroundColor = 'rgba(0,0,0,0.9)';
  }
});

// Hamburger menu for mobile
// (Optional: can be added for full mobile responsiveness. Omitted for brevity here, but can be added if needed)

// Animations on scroll (fade-in)
const faders = document.querySelectorAll('.benefits, .products-section, .about-section, .how-section, .contact-section, footer');
const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -50px 0px"
};
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => {
  fader.classList.add('hidden');
  appearOnScroll.observe(fader);
});

// Animate benefit items
document.querySelectorAll('.benefit').forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.2}s`;
});
