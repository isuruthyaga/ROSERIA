// Main JavaScript for ROSERIA Website

// --- State Management ---
let cart = JSON.parse(localStorage.getItem('roseria_cart')) || [];

// --- Config ---
const CURRENCY_FORMAT = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
    renderFeaturedProducts();
    renderShopProducts();
    renderCartItems();

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-black', 'shadow-lg');
                navbar.classList.remove('bg-transparent');
            } else {
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    navbar.classList.remove('bg-black', 'shadow-lg');
                    navbar.classList.add('bg-transparent');
                }
            }
        });
    }
});

// --- Navigation ---
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
}

// --- Product Rendering ---

function formatPrice(price) {
    return CURRENCY_FORMAT.format(price);
}

function createProductCard(product) {
    return `
        <div class="group relative bg-[#111] border border-gray-800 hover:border-gold-400 transition-all duration-300 overflow-hidden">
            <div class="relative h-80 w-full overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                
                <!-- Quick Actions -->
                <button onclick="addToCart(${product.id})" class="absolute bottom-4 right-4 bg-gold-600 text-black px-4 py-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-black shadow-lg">
                    Add to Bag
                </button>
            </div>
            
            <div class="p-6 text-center">
                <p class="text-xs text-gold-600 uppercase tracking-widest mb-2">${product.category}</p>
                <h3 class="text-white text-lg font-serif mb-2 font-medium">${product.name}</h3>
                <p class="text-gray-400 font-serif italic">${formatPrice(product.price)}</p>
            </div>
        </div>
    `;
}

// Render Featured (Home Page)
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    // Get first 3 products
    const featured = products.slice(0, 3);
    container.innerHTML = featured.map(createProductCard).join('');
}

// Render Shop (Shop Page)
function renderShopProducts() {
    const container = document.getElementById('shop-grid');
    if (!container) return; // Not on shop page

    // Initial render
    container.innerHTML = products.map(createProductCard).join('');
}

// Filter Logic
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const container = document.getElementById('shop-grid');
    if (!container) return;

    let filtered = products;
    if (category !== 'all') {
        filtered = products.filter(p => p.category === category);
    }

    // Also respect search if active (simple combination)
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm));
    }

    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-center col-span-full text-gray-500 py-10">No products found.</p>';
        return;
    }

    container.innerHTML = filtered.map(createProductCard).join('');
}

// Search Logic
function searchProducts() {
    filterProducts(); // Reuse filter logic
}

// --- Cart Logic ---

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');

    if (sidebar.classList.contains('translate-x-full')) {
        sidebar.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();

    // Open cart to confirm
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar.classList.contains('translate-x-full')) {
        toggleCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCartItems(); // Re-render cart list immediately
    updateCartIcon();
    updateCartTotal();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        saveCart();
        renderCartItems();
        updateCartIcon();
        updateCartTotal();
    }
}

function saveCart() {
    localStorage.setItem('roseria_cart', JSON.stringify(cart));
}

function updateCartUI() {
    updateCartIcon();
    renderCartItems();
    updateCartTotal();
}

function updateCartIcon() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        if (count > 0) badge.classList.remove('hidden');
        else badge.classList.add('hidden');
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('empty-cart-msg');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '';
        if (emptyMsg) emptyMsg.classList.remove('hidden');
        return;
    }

    if (emptyMsg) emptyMsg.classList.add('hidden');

    container.innerHTML = cart.map(item => `
        <div class="flex gap-4 items-center bg-gray-800 p-3 rounded">
            <img src="${item.image}" class="w-16 h-16 object-cover rounded border border-gray-700">
            <div class="flex-1">
                <h4 class="text-white text-sm font-serif truncate">${item.name}</h4>
                <p class="text-gold-400 text-xs">${formatPrice(item.price)}</p>
                <div class="flex items-center gap-3 mt-2">
                    <button onclick="updateQuantity(${item.id}, -1)" class="text-gray-400 hover:text-white">-</button>
                    <span class="text-white text-xs">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="text-gray-400 hover:text-white">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-gray-500 hover:text-red-400 transition-colors">
                <i class="fas fa-trash text-sm"></i>
            </button>
        </div>
    `).join('');

    updateCartTotal();
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalEl = document.getElementById('cart-total');
    if (totalEl) {
        totalEl.textContent = formatPrice(total);
    }
}

function checkout() {
    if (cart.length === 0) {
        alert("Your bag is empty!");
        return;
    }
    alert("Thank you for your order! This is a demo checkout.");
    cart = [];
    saveCart();
    updateCartUI();
    toggleCart();
}
