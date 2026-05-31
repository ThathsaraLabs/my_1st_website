// Global JavaScript for Sri Lankan Modern Clothing Store

// Cart State (Initialized from LocalStorage or empty array)
let cart = JSON.parse(localStorage.getItem('srilankan_clothing_cart')) || [];

// Initialize Page Elements once DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  injectGlobalUI();
  setupEventListeners();
  updateCartUI();
});

// 1. Inject Global Header, Footer, Cart Drawer, and Toaster into pages dynamically
function injectGlobalUI() {
  // Inject Header (if element #global-header exists or at the start of body)
  let headerContainer = document.getElementById('global-header');
  if (!headerContainer) {
    headerContainer = document.createElement('header');
    headerContainer.id = 'global-header';
    headerContainer.className = 'sticky top-0 z-40 transition-all duration-300 glass-header';
    document.body.insertBefore(headerContainer, document.body.firstChild);
  }

  // Detect relative paths based on current page
  const isSubPage = window.location.pathname.includes('shop.html') || window.location.pathname.includes('product.html');
  const homePath = isSubPage ? 'index.html' : '#';
  const shopPath = isSubPage ? 'shop.html' : 'shop.html';

  headerContainer.innerHTML = `
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="${homePath}" class="font-heading text-2xl font-bold tracking-wider text-[#0A4D42] hover:text-[#C85A32] transition-colors flex items-center gap-2">
          <span class="text-3xl">🌴</span> LANKA<span class="text-[#C85A32]">MODERN</span>
        </a>
      </div>

      <!-- Navigation links (Desktop) -->
      <div class="hidden md:flex items-center space-x-8">
        <a href="${homePath}" class="font-body text-sm font-semibold tracking-wide text-gray-700 hover:text-[#C85A32] transition-colors duration-200 uppercase">Home</a>
        <a href="${shopPath}" class="font-body text-sm font-semibold tracking-wide text-gray-700 hover:text-[#C85A32] transition-colors duration-200 uppercase">Shop Collection</a>
        <a href="${homePath}#philosophy" class="font-body text-sm font-semibold tracking-wide text-gray-700 hover:text-[#C85A32] transition-colors duration-200 uppercase">Our Story</a>
        <a href="#footer" class="font-body text-sm font-semibold tracking-wide text-gray-700 hover:text-[#C85A32] transition-colors duration-200 uppercase">Contact</a>
      </div>

      <!-- User actions (Search, Wishlist, Cart, Mobile Menu button) -->
      <div class="flex items-center space-x-6">
        <!-- Search bar input toggle (Decorative) -->
        <button id="search-btn" class="text-gray-700 hover:text-[#C85A32] transition-colors" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <!-- Wishlist -->
        <a href="#" class="text-gray-700 hover:text-[#C85A32] transition-colors relative" aria-label="Wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C85A32] text-white text-[9px] flex items-center justify-center rounded-full font-bold">2</span>
        </a>

        <!-- Cart Button -->
        <button id="cart-toggle-btn" class="text-gray-700 hover:text-[#C85A32] transition-colors relative flex items-center" aria-label="Open Cart">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span id="cart-badge" class="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-[#0A4D42] text-white text-[9px] flex items-center justify-center rounded-full font-bold transition-all duration-300">0</span>
        </button>

        <!-- Mobile Menu Burger Button -->
        <button id="mobile-menu-btn" class="md:hidden text-gray-700 hover:text-[#C85A32] transition-colors" aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  `;

  // Inject Slide-Out Cart Drawer
  let cartDrawer = document.getElementById('cart-drawer');
  if (!cartDrawer) {
    cartDrawer = document.createElement('div');
    cartDrawer.id = 'cart-drawer';
    cartDrawer.className = 'fixed inset-0 z-50 pointer-events-none';
    document.body.appendChild(cartDrawer);
  }

  cartDrawer.innerHTML = `
    <!-- Dark overlay backdrop -->
    <div id="cart-backdrop" class="fixed inset-0 bg-black bg-opacity-50 opacity-0 drawer-backdrop pointer-events-none transition-opacity duration-300"></div>
    
    <!-- Drawer side-panel -->
    <div id="cart-panel" class="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col translate-x-full drawer-content transition-transform duration-300 pointer-events-auto h-full z-10">
      <!-- Header -->
      <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h2 class="font-heading text-xl font-bold text-[#0A4D42] flex items-center gap-2">
          <span>🛒</span> Shopping Bag (<span id="cart-drawer-count">0</span>)
        </h2>
        <button id="cart-close-btn" class="text-gray-400 hover:text-gray-600 transition-colors p-1" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Cart Item list (Scrollable) -->
      <div id="cart-items-container" class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        <!-- Injected via JavaScript -->
      </div>

      <!-- Checkout Footer -->
      <div class="border-t border-gray-200 px-6 py-6 bg-white space-y-4">
        <div class="flex justify-between text-base font-semibold text-gray-900">
          <span class="font-body">Subtotal</span>
          <span id="cart-subtotal" class="font-heading text-lg text-[#8D4024]">Rs. 0.00</span>
        </div>
        <p class="text-xs text-gray-500 font-body">Shipping and taxes calculated at checkout. Easy local returns within 14 days.</p>
        <div>
          <button onclick="checkout()" class="w-full py-3 bg-[#0A4D42] hover:bg-[#083E35] text-white font-body font-semibold rounded-md shadow-md btn-haptic flex items-center justify-center gap-2 transition-all">
            <span>Proceed to Checkout</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        <!-- Local Trust Badges -->
        <div class="flex items-center justify-center gap-4 pt-2 text-[10px] text-gray-400 font-medium font-body">
          <span class="flex items-center gap-1">🛡️ Secured Payment</span>
          <span class="flex items-center gap-1">📦 Cash on Delivery</span>
        </div>
      </div>
    </div>
  `;

  // Inject Mobile Menu Drawer
  let mobileDrawer = document.getElementById('mobile-drawer');
  if (!mobileDrawer) {
    mobileDrawer = document.createElement('div');
    mobileDrawer.id = 'mobile-drawer';
    mobileDrawer.className = 'fixed inset-0 z-50 pointer-events-none';
    document.body.appendChild(mobileDrawer);
  }

  mobileDrawer.innerHTML = `
    <!-- Dark overlay backdrop -->
    <div id="mobile-backdrop" class="fixed inset-0 bg-black bg-opacity-50 opacity-0 drawer-backdrop pointer-events-none transition-opacity duration-300"></div>
    
    <!-- Drawer panel -->
    <div id="mobile-panel" class="fixed left-0 top-0 bottom-0 w-80 bg-[#FAF9F6] shadow-2xl flex flex-col -translate-x-full drawer-content transition-transform duration-300 pointer-events-auto h-full z-10">
      <div class="px-6 py-6 border-b border-gray-200 flex items-center justify-between">
        <span class="font-heading text-lg font-bold text-[#0A4D42]">Menu</span>
        <button id="mobile-close-btn" class="text-gray-400 hover:text-gray-600 transition-colors p-1" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 px-6 py-6 flex flex-col space-y-6">
        <a href="${homePath}" class="font-body text-lg font-medium text-gray-800 hover:text-[#C85A32] uppercase">Home</a>
        <a href="${shopPath}" class="font-body text-lg font-medium text-gray-800 hover:text-[#C85A32] uppercase">Shop Collection</a>
        <a href="${homePath}#philosophy" class="font-body text-lg font-medium text-gray-800 hover:text-[#C85A32] uppercase">Our Story</a>
        <a href="#footer" class="font-body text-lg font-medium text-gray-800 hover:text-[#C85A32] uppercase">Contact</a>
        <hr class="border-gray-200">
        <!-- Extra local connections -->
        <div class="space-y-4 pt-4">
          <p class="text-xs font-semibold text-[#8D4024] tracking-wider uppercase font-body">Sri Lankan Support</p>
          <p class="text-sm text-gray-600 font-body">📍 Colombo, Sri Lanka</p>
          <p class="text-sm text-gray-600 font-body">📞 +94 77 123 4567</p>
        </div>
      </div>
    </div>
  `;

  // Inject Footer (if #global-footer exists)
  let footerContainer = document.getElementById('global-footer');
  if (!footerContainer) {
    footerContainer = document.createElement('footer');
    footerContainer.id = 'global-footer';
    footerContainer.className = 'bg-[#0A4D42] text-white py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-[#C85A32]';
    document.body.appendChild(footerContainer);
  }

  footerContainer.innerHTML = `
    <div id="footer" class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 font-body">
      <!-- Brand & Philosophy -->
      <div class="space-y-4">
        <h3 class="font-heading text-2xl font-bold tracking-wider text-white">LANKA<span class="text-[#F2BB16]">MODERN</span></h3>
        <p class="text-sm text-gray-300 leading-relaxed">Blending centuries-old island heritage and traditional batik craft with high-quality modern silhouettes. Designed for the fashion-forward Sri Lankan.</p>
        <div class="flex space-x-4 pt-2">
          <!-- Social Icons (Insta, FB) -->
          <a href="#" class="w-8 h-8 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all text-white" aria-label="Instagram">
            📸
          </a>
          <a href="#" class="w-8 h-8 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center transition-all text-white" aria-label="Facebook">
            👍
          </a>
        </div>
      </div>

      <!-- Links -->
      <div class="space-y-4">
        <h4 class="font-heading text-lg font-bold text-[#F2BB16] uppercase tracking-wider">Explore</h4>
        <ul class="space-y-2 text-sm text-gray-300">
          <li><a href="${homePath}" class="hover:text-[#F2BB16] transition-colors">Home Experience</a></li>
          <li><a href="${shopPath}" class="hover:text-[#F2BB16] transition-colors">Shop Catalog</a></li>
          <li><a href="${homePath}#philosophy" class="hover:text-[#F2BB16] transition-colors">Island Heritage</a></li>
          <li><a href="#" class="hover:text-[#F2BB16] transition-colors">Careers</a></li>
        </ul>
      </div>

      <!-- Customer Care -->
      <div class="space-y-4">
        <h4 class="font-heading text-lg font-bold text-[#F2BB16] uppercase tracking-wider">Support</h4>
        <ul class="space-y-2 text-sm text-gray-300">
          <li><a href="#" class="hover:text-[#F2BB16] transition-colors">Size Guide</a></li>
          <li><a href="#" class="hover:text-[#F2BB16] transition-colors">Island-wide Shipping</a></li>
          <li><a href="#" class="hover:text-[#F2BB16] transition-colors">Returns & Exchanges</a></li>
          <li><a href="#" class="hover:text-[#F2BB16] transition-colors">FAQ</a></li>
        </ul>
      </div>

      <!-- Newsletter -->
      <div class="space-y-4">
        <h4 class="font-heading text-lg font-bold text-[#F2BB16] uppercase tracking-wider">Join our Family</h4>
        <p class="text-sm text-gray-300">Stay updated on our newest collections, exclusive drops, and artisan stories.</p>
        <form class="flex flex-col sm:flex-row gap-2" onsubmit="event.preventDefault(); showToast('Thank you for subscribing to our mailing list!', 'success');">
          <input type="email" placeholder="Your email address" required class="flex-1 px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 rounded focus:outline-none focus:border-[#F2BB16] text-sm">
          <button type="submit" class="px-4 py-2 bg-[#C85A32] hover:bg-[#8D4024] text-white font-semibold rounded text-sm transition-colors">Subscribe</button>
        </form>
      </div>
    </div>

    <!-- Copyright and payments -->
    <div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-white border-opacity-10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-body gap-4">
      <p>&copy; 2026 LankaModern Clothing. Developed for high fashion & heritage. All Rights Reserved.</p>
      <div class="flex items-center gap-3">
        <span>Payment options:</span>
        <span class="px-2 py-0.5 bg-white bg-opacity-5 rounded text-gray-300 font-semibold uppercase tracking-wider">Visa</span>
        <span class="px-2 py-0.5 bg-white bg-opacity-5 rounded text-gray-300 font-semibold uppercase tracking-wider">Mastercard</span>
        <span class="px-2 py-0.5 bg-white bg-opacity-5 rounded text-gray-300 font-semibold uppercase tracking-wider">Koko Pay</span>
      </div>
    </div>
  `;

  // Inject Toast Container
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none';
    document.body.appendChild(toastContainer);
  }
}

// 2. Set up Event Listeners
function setupEventListeners() {
  // Sticky glass navbar shadow change on scroll
  window.addEventListener('scroll', () => {
    const header = document.getElementById('global-header');
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    }
  });

  // Toggle Cart Drawer opening
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartBackdrop = document.getElementById('cart-backdrop');

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', toggleCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', toggleCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', toggleCart);

  // Toggle Mobile Menu Drawer opening
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', toggleMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', toggleMobileMenu);

  // Bind key escapes to close drawers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const cartPanel = document.getElementById('cart-panel');
      if (cartPanel && !cartPanel.classList.contains('translate-x-full')) {
        toggleCart();
      }
      const mobilePanel = document.getElementById('mobile-panel');
      if (mobilePanel && !mobilePanel.classList.contains('-translate-x-full')) {
        toggleMobileMenu();
      }
    }
  });
}

// 3. Cart Functions
function toggleCart() {
  const panel = document.getElementById('cart-panel');
  const backdrop = document.getElementById('cart-backdrop');
  const container = document.getElementById('cart-drawer');

  if (panel && backdrop && container) {
    const isOpen = !panel.classList.contains('translate-x-full');
    if (isOpen) {
      // Close
      panel.classList.add('translate-x-full');
      backdrop.classList.add('opacity-0');
      backdrop.classList.add('pointer-events-none');
      setTimeout(() => container.classList.add('pointer-events-none'), 300);
    } else {
      // Open
      container.classList.remove('pointer-events-none');
      backdrop.classList.remove('pointer-events-none');
      setTimeout(() => {
        panel.classList.remove('translate-x-full');
        backdrop.classList.remove('opacity-0');
      }, 50);
      updateCartUI();
    }
  }
}

function toggleMobileMenu() {
  const panel = document.getElementById('mobile-panel');
  const backdrop = document.getElementById('mobile-backdrop');
  const container = document.getElementById('mobile-drawer');

  if (panel && backdrop && container) {
    const isOpen = !panel.classList.contains('-translate-x-full');
    if (isOpen) {
      // Close
      panel.classList.add('-translate-x-full');
      backdrop.classList.add('opacity-0');
      backdrop.classList.add('pointer-events-none');
      setTimeout(() => container.classList.add('pointer-events-none'), 300);
    } else {
      // Open
      container.classList.remove('pointer-events-none');
      backdrop.classList.remove('pointer-events-none');
      setTimeout(() => {
        panel.classList.remove('-translate-x-full');
        backdrop.classList.remove('opacity-0');
      }, 50);
    }
  }
}

// Global addToCart accessible across pages
function addToCart(productId, colorName, size, quantity) {
  // Find product from PRODUCTS database loaded globally
  if (typeof PRODUCTS === 'undefined') {
    console.error('Products database not loaded!');
    return;
  }
  
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) {
    showToast('Product not found!', 'error');
    return;
  }

  // Check if same item with same color and size already in cart
  const existingIndex = cart.findIndex(item => item.id === productId && item.color === colorName && item.size === size);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += parseInt(quantity);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price - (product.price * (product.discount || 0) / 100),
      color: colorName,
      size: size,
      image: product.images[0],
      quantity: parseInt(quantity)
    });
  }

  // Save to LocalStorage
  localStorage.setItem('srilankan_clothing_cart', JSON.stringify(cart));
  updateCartUI();

  // Show dynamic notification Toast
  showToast(`Added ${quantity}x ${product.name} (${size}) to your bag.`, 'success');
  
  // Slide open the cart drawer to show progress
  setTimeout(toggleCart, 300);
}

function removeFromCart(index) {
  const item = cart[index];
  cart.splice(index, 1);
  localStorage.setItem('srilankan_clothing_cart', JSON.stringify(cart));
  updateCartUI();
  if (item) {
    showToast(`Removed ${item.name} from your bag.`, 'info');
  }
}

function updateCartQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    removeFromCart(index);
  } else {
    localStorage.setItem('srilankan_clothing_cart', JSON.stringify(cart));
    updateCartUI();
  }
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const drawerCount = document.getElementById('cart-drawer-count');
  const itemsContainer = document.getElementById('cart-items-container');
  const subtotalLabel = document.getElementById('cart-subtotal');

  // Count total items
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Update badge and title
  if (badge) {
    badge.innerText = totalCount;
    if (totalCount === 0) {
      badge.classList.add('scale-0');
    } else {
      badge.classList.remove('scale-0');
      badge.classList.add('scale-100');
    }
  }
  if (drawerCount) drawerCount.innerText = totalCount;

  // Render items list
  if (itemsContainer) {
    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="h-64 flex flex-col items-center justify-center text-center space-y-4">
          <span class="text-5xl">🥥</span>
          <div>
            <h3 class="font-heading text-lg font-semibold text-gray-800">Your bag is empty</h3>
            <p class="font-body text-sm text-gray-500 max-w-[240px] mt-1">Fill it with our premium Sri Lankan clothing line.</p>
          </div>
          <a href="shop.html" onclick="toggleCart()" class="px-5 py-2.5 bg-[#C85A32] text-white font-body text-xs font-semibold rounded uppercase tracking-wider hover:bg-[#8D4024] transition-colors btn-haptic">Start Shopping</a>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = cart.map((item, index) => `
        <div class="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-100 relative group animate-fade-in-up">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover rounded-md bg-[#FAF9F6] border border-gray-100">
          <div class="flex-1">
            <h4 class="font-heading text-sm font-semibold text-gray-800 leading-tight">${item.name}</h4>
            <p class="font-body text-xs text-gray-500 mt-1">Size: <span class="font-semibold text-gray-700">${item.size}</span> | Color: <span class="font-semibold text-gray-700">${item.color}</span></p>
            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center border border-gray-200 rounded">
                <button onclick="updateCartQuantity(${index}, -1)" class="px-2 py-0.5 text-gray-500 hover:bg-gray-100 transition-colors font-semibold" aria-label="Decrease quantity">-</button>
                <span class="px-2 text-xs font-body font-semibold text-gray-700">${item.quantity}</span>
                <button onclick="updateCartQuantity(${index}, 1)" class="px-2 py-0.5 text-gray-500 hover:bg-gray-100 transition-colors font-semibold" aria-label="Increase quantity">+</button>
              </div>
              <span class="font-heading text-sm font-semibold text-[#8D4024]">Rs. ${(item.price * item.quantity).toLocaleString()}.00</span>
            </div>
          </div>
          <button onclick="removeFromCart(${index})" class="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors" aria-label="Remove item">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      `).join('');
    }
  }

  // Calculate & Update Subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  if (subtotalLabel) {
    subtotalLabel.innerText = `Rs. ${subtotal.toLocaleString()}.00`;
  }
}

// 4. Toast Notifications System
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'px-4 py-3 rounded-lg shadow-lg border text-sm font-body font-medium flex items-center justify-between transform translate-y-2 opacity-0 transition-all duration-300 pointer-events-auto';

  // Styles based on type
  if (type === 'success') {
    toast.className += ' bg-[#0A4D42] text-white border-transparent';
    message = '🍃 ' + message;
  } else if (type === 'error') {
    toast.className += ' bg-red-50 text-red-800 border-red-200';
    message = '⚠️ ' + message;
  } else {
    toast.className += ' bg-orange-50 text-orange-800 border-orange-200';
    message = 'ℹ️ ' + message;
  }

  toast.innerHTML = `
    <span>${message}</span>
    <button class="ml-4 text-current opacity-70 hover:opacity-100 transition-opacity" onclick="this.parentElement.remove()" aria-label="Close message">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  `;

  container.appendChild(toast);

  // Trigger entering animation
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  // Automatically remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

// 5. Checkout function
function checkout() {
  if (cart.length === 0) {
    showToast('Your cart is empty. Add products to checkout!', 'error');
    return;
  }
  showToast('Connecting with payment gateways (Koko, PayHere)... Thank you for shopping with us!', 'success');
  // Clear cart on successful purchase mockup
  setTimeout(() => {
    cart = [];
    localStorage.removeItem('srilankan_clothing_cart');
    updateCartUI();
    toggleCart();
    showToast('Order successfully placed! Receipt sent to your email.', 'success');
  }, 2000);
}
