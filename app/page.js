'use client';

import { useState, useEffect } from 'react';

// ─── Product Data ────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    title: 'Apple MacBook Pro M3 14" (16GB / 512GB)',
    price: 159900,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    category: 'Laptops',
    condition: 'Like New',
    type: 'sale',
    location: 'Bengaluru, KA',
    description: 'Space Gray M3 MacBook Pro. Original box, MagSafe charger, AppleCare until 2026.',
  },
  {
    id: 2,
    title: 'Sony PlayStation 5 Disc Edition + 2 Controllers',
    price: 42500,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    category: 'Gaming',
    condition: 'Like New',
    type: 'sale',
    location: 'Mumbai, MH',
    description: 'Barely used PS5 with two DualSense controllers and Spider-Man 2.',
  },
  {
    id: 3,
    title: 'Samsung Galaxy S24 Ultra 256GB (Titanium Gray)',
    price: 109999,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
    category: 'Phones',
    condition: 'Brand New',
    type: 'sale',
    location: 'Delhi, NCR',
    description: 'Factory sealed. Snapdragon 8 Gen 3, 200MP camera, S-Pen included.',
  },
  {
    id: 4,
    title: 'Apple iPad Pro 12.9" M2 Wi-Fi 256GB',
    price: 89900,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    category: 'Tablets',
    condition: 'Like New',
    type: 'sale',
    location: 'Hyderabad, TS',
    description: 'Liquid Retina XDR display, M2 chip. Includes Apple Pencil 2 and Smart Folio.',
  },
  {
    id: 5,
    title: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    price: 22990,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    category: 'Audio',
    condition: 'Brand New',
    type: 'sale',
    location: 'Pune, MH',
    description: 'Industry-leading ANC. 30hr battery, multipoint Bluetooth, Hi-Res audio.',
  },
  {
    id: 6,
    title: 'LG 55" C3 OLED 4K Smart TV (2023)',
    price: 99990,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
    category: 'TVs',
    condition: 'Brand New',
    type: 'sale',
    location: 'Chennai, TN',
    description: 'Self-lit OLED pixels, Dolby Vision & Atmos, 120Hz, webOS 23, wall-mount included.',
  },
  {
    id: 7,
    title: 'Canon EOS R6 Mark II Mirrorless Camera Body',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    category: 'Cameras',
    condition: 'Good',
    type: 'wtb',
    location: 'Kolkata, WB',
    description: 'LOOKING TO BUY: Canon R6 II body under 20k shutter count. Cash ready.',
  },
  {
    id: 8,
    title: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    price: 52900,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80',
    category: 'Home Appliances',
    condition: 'Like New',
    type: 'sale',
    location: 'Gurugram, HR',
    description: 'Laser dust detection, LCD screen, 60min runtime. All attachments included.',
  },
];

const CATEGORIES = ['All', 'Laptops', 'Phones', 'Gaming', 'Tablets', 'Audio', 'TVs', 'Cameras', 'Home Appliances'];

const STRIPE_LINK = 'https://buy.stripe.com/test_3cI14p3t068k04z8qA?client_reference_id=user_123';

// ─── Helper ──────────────────────────────────────────────────────
function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

// ─── Components ──────────────────────────────────────────────────

function Header({ cartCount, onCartClick, onVipClick }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-md">O</div>
          <span className="text-xl font-extrabold text-gray-900">OmniExchange</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={onVipClick} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold text-sm shadow hover:shadow-lg transition cursor-pointer">
            👑 VIP Pro
          </button>
          <button onClick={onCartClick} className="relative p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition cursor-pointer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroBanner({ onVipClick }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-emerald-500 text-white p-8 md:p-10 mb-8 shadow-lg">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Buy, Sell & Trade Electronics</h1>
      <p className="text-white/90 mb-5 max-w-xl">Discover verified gadgets, laptops, phones, cameras & more. Pay securely with Stripe — scan QR or click to pay.</p>
      <div className="flex gap-3 flex-wrap">
        <button onClick={onVipClick} className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow transition cursor-pointer">👑 Upgrade to VIP Pro</button>
      </div>
    </div>
  );
}

function CategoryPills({ active, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition cursor-pointer ${
            active === cat
              ? 'bg-indigo-600 text-white border-indigo-600 shadow'
              : 'bg-white text-gray-500 border-gray-200 hover:bg-indigo-50 hover:border-indigo-300'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function ProductCard({ product, onBuy, onAddCart, isFav, onToggleFav }) {
  const tagColor = product.type === 'wtb' ? 'from-cyan-500 to-blue-600' : product.type === 'trade' ? 'from-purple-500 to-violet-700' : 'from-emerald-500 to-emerald-700';
  const tagLabel = product.type === 'wtb' ? 'BUYING (ISO)' : product.type === 'trade' ? 'TRADE' : 'FOR SALE';

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-white text-[11px] font-bold uppercase tracking-wide bg-gradient-to-r ${tagColor} shadow`}>{tagLabel}</span>
        <button onClick={() => onToggleFav(product.id)} className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow cursor-pointer transition hover:scale-110 ${isFav ? 'text-red-500' : 'text-gray-400'}`}>
          ♥
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xl font-extrabold text-indigo-600">{formatINR(product.price)}</span>
          <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{product.condition}</span>
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">{product.title}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
          <span>📍 {product.location}</span>
          <span>{product.category}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          <button onClick={() => onBuy(product)} className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition cursor-pointer">Buy Now</button>
          <button onClick={() => onAddCart(product)} className="flex-1 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl transition cursor-pointer">+ Cart</button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onRemove, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="fixed inset-0 z-[1000] flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-slide-in" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-extrabold">Your Cart ({cart.length})</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-red-50 text-red-500 font-bold flex items-center justify-center hover:bg-red-500 hover:text-white transition cursor-pointer">✕</button>
        </div>
        <div className="flex-1 p-5 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <div className="text-5xl mb-3">🛒</div>
              <p className="font-semibold">Cart is empty</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="flex gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl mb-3">
              <img src={item.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{item.title}</p>
                <p className="text-indigo-600 font-extrabold text-sm">{formatINR(item.price)} × {item.qty}</p>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600 font-bold cursor-pointer">✕</button>
            </div>
          ))}
        </div>
        <div className="p-5 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between font-extrabold text-lg mb-4">
            <span>Total:</span>
            <span className="text-indigo-600">{formatINR(total)}</span>
          </div>
          <button onClick={onCheckout} disabled={cart.length === 0} className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-bold rounded-xl transition cursor-pointer">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckoutModal({ cart, onClose }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-extrabold">💳 Secure Checkout</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-red-50 text-red-500 font-bold flex items-center justify-center hover:bg-red-500 hover:text-white transition cursor-pointer">✕</button>
        </div>
        <div className="p-5">
          {/* Order Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-5">
            <h4 className="font-extrabold mb-3">Order Summary</h4>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span className="truncate mr-2">{item.title} (×{item.qty})</span>
                <span className="font-bold whitespace-nowrap">{formatINR(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between font-extrabold text-indigo-600 text-lg mt-3 pt-3 border-t border-dashed border-gray-300">
              <span>Total:</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>

          {/* Stripe Pay Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-emerald-50 border-2 border-indigo-500 rounded-xl p-5 text-center mb-5">
            <h4 className="font-extrabold text-indigo-600 text-lg mb-1">Stripe Secure Express Pay</h4>
            <p className="text-sm text-gray-500 mb-4">Credit/Debit Card • Apple Pay • Google Pay • UPI</p>
            
            {/* QR Code */}
            <div className="inline-block bg-white border-2 border-gray-200 rounded-xl p-3 shadow-sm mb-4">
              <p className="text-xs font-bold text-gray-400 mb-2">Scan with Mobile Camera:</p>
              <img src={`${STRIPE_LINK.split('?')[0]}/qr`} alt="Stripe QR Code" width={200} height={200} className="mx-auto rounded" />
              <p className="text-[10px] text-gray-400 mt-1">Powered by Stripe</p>
            </div>

            <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition text-center">
              Pay with Stripe Link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function VipModal({ onClose, isVip, onActivate }) {
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl text-center" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-extrabold">👑 VIP Pro Subscription</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-red-50 text-red-500 font-bold flex items-center justify-center hover:bg-red-500 hover:text-white transition cursor-pointer">✕</button>
        </div>
        <div className="p-6">
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-extrabold text-xs px-3 py-1 rounded-full mb-3">✨ Stripe Verified</span>
          
          {isVip ? (
            <div>
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-extrabold text-emerald-600 mb-2">VIP Pro Active!</h2>
              <p className="text-gray-500">You have unlimited listings, zero fees, and a verified badge.</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-1">$15.00 <span className="text-base font-normal text-gray-400">/ month</span></h2>
              <p className="text-sm text-gray-500 mb-5">Unlimited listings, zero fees, verified badge, priority chat.</p>

              {/* QR Code */}
              <div className="inline-block bg-white border-2 border-gray-200 rounded-xl p-3 shadow-sm mb-5">
                <p className="text-xs font-bold text-gray-400 mb-2">Scan QR to Subscribe:</p>
                <img src={`${STRIPE_LINK.split('?')[0]}/qr`} alt="Stripe QR" width={200} height={200} className="mx-auto rounded" />
                <p className="text-[10px] text-gray-400 mt-1">Powered by Stripe Secure Checkout</p>
              </div>

              <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition mb-4">
                Pay $15/mo with Stripe
              </a>

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-700">Already paid?</p>
                  <p className="text-[10px] text-gray-400">Backend verifies via webhook</p>
                </div>
                <button onClick={onActivate} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition cursor-pointer">
                  ✓ Activate
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Toast({ message, type }) {
  const borderColor = type === 'success' ? 'border-l-emerald-500' : type === 'danger' ? 'border-l-red-500' : 'border-l-indigo-500';
  return (
    <div className={`bg-white border-l-4 ${borderColor} rounded-xl shadow-xl px-5 py-3 text-sm font-semibold text-gray-800 animate-slide-in min-w-[280px]`}>
      {message}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function Home() {
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showVip, setShowVip] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsVip(localStorage.getItem('omni_vip') === 'true');
    }
  }, []);

  const toast = (msg, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const filtered = PRODUCTS.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    toast(`Added "${product.title.slice(0, 25)}…" to cart`, 'success');
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const buyNow = (product) => {
    addToCart(product);
    setShowCheckout(true);
  };

  const toggleFav = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const activateVip = () => {
    setIsVip(true);
    localStorage.setItem('omni_vip', 'true');
    setShowVip(false);
    toast('🎉 VIP Pro Activated! Welcome aboard!', 'success');
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setShowCart(true)} onVipClick={() => setShowVip(true)} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <HeroBanner onVipClick={() => setShowVip(true)} />

        {/* Search */}
        <div className="relative max-w-md mb-5">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            placeholder="Search electronics…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
          />
        </div>

        <CategoryPills active={category} onSelect={setCategory} />

        <p className="text-sm font-bold text-gray-500 mb-4">Showing {filtered.length} listings</p>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-bold text-lg">No items found</h3>
            <p className="text-sm">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onBuy={buyNow}
                onAddCart={addToCart}
                isFav={favorites.has(p.id)}
                onToggleFav={toggleFav}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-400">
        <p>© 2026 OmniExchange. Payments secured by <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-indigo-500 font-semibold hover:underline">Stripe</a>.</p>
      </footer>

      {/* Cart Drawer */}
      {showCart && (
        <CartDrawer cart={cart} onClose={() => setShowCart(false)} onRemove={removeFromCart} onCheckout={() => { setShowCart(false); setShowCheckout(true); }} />
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal cart={cart} onClose={() => setShowCheckout(false)} />
      )}

      {/* VIP Modal */}
      {showVip && (
        <VipModal onClose={() => setShowVip(false)} isVip={isVip} onActivate={activateVip} />
      )}

      {/* Toasts */}
      <div className="fixed bottom-5 right-5 z-[2000] flex flex-col gap-3">
        {toasts.map(t => <Toast key={t.id} message={t.msg} type={t.type} />)}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
