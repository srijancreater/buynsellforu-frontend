'use client';

import { useState, useEffect } from 'react';

// ─── Product Data ────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    title: 'MacBook Pro M3 14"',
    subtitle: '16GB RAM · 512GB SSD · Space Gray',
    price: 159900,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    category: 'Laptops',
    condition: 'Like New',
  },
  {
    id: 2,
    title: 'PlayStation 5 Disc Edition',
    subtitle: '2 Controllers · Spider-Man 2 included',
    price: 42500,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    category: 'Gaming',
    condition: 'Like New',
  },
  {
    id: 3,
    title: 'Samsung Galaxy S24 Ultra',
    subtitle: '256GB · Titanium Gray · Snapdragon 8 Gen 3',
    price: 109999,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
    category: 'Phones',
    condition: 'Brand New',
  },
  {
    id: 4,
    title: 'iPad Pro 12.9" M2',
    subtitle: 'Wi-Fi 256GB · Apple Pencil 2 · Smart Folio',
    price: 89900,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    category: 'Tablets',
    condition: 'Like New',
  },
  {
    id: 5,
    title: 'Sony WH-1000XM5',
    subtitle: 'Noise Cancelling · 30hr Battery · Hi-Res',
    price: 22990,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    category: 'Audio',
    condition: 'Brand New',
  },
  {
    id: 6,
    title: 'LG C3 55" OLED 4K TV',
    subtitle: 'Dolby Vision · 120Hz · webOS 23',
    price: 99990,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
    category: 'TVs',
    condition: 'Brand New',
  },
  {
    id: 7,
    title: 'Canon EOS R6 Mark II',
    subtitle: 'Mirrorless Camera Body · 24.2MP',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    category: 'Cameras',
    condition: 'Good',
  },
  {
    id: 8,
    title: 'Dyson V15 Detect Vacuum',
    subtitle: 'Cordless · Laser Detection · 60min Runtime',
    price: 52900,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80',
    category: 'Home',
    condition: 'Like New',
  },
];

const CATEGORIES = ['All', 'Laptops', 'Phones', 'Gaming', 'Tablets', 'Audio', 'TVs', 'Cameras', 'Home'];

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

// ─── Main App ────────────────────────────────────────────────────
export default function Home() {
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [paying, setPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Check URL for payment return
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      setPaymentSuccess(true);
      window.history.replaceState({}, '', '/');
      setTimeout(() => setPaymentSuccess(false), 6000);
    }
  }, []);

  const toast = (msg, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const filtered = PRODUCTS.filter(p => category === 'All' || p.category === category);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    toast(`✓ Added to cart`, 'success');
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const handleStripeCheckout = async (title, amountInPaise) => {
    setPaying(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount: amountInPaise, mode: 'payment' }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast('Payment error: ' + (data.error || 'Unknown'), 'danger');
      }
    } catch (err) {
      toast('Network error. Try again.', 'danger');
    }
    setPaying(false);
  };

  const buyNow = (product) => {
    handleStripeCheckout(product.title, product.price * 100);
  };

  const checkoutCart = () => {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const titles = cart.map(i => i.title).join(', ');
    handleStripeCheckout(`Cart: ${titles}`, total * 100);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f7', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* ─── PAYMENT SUCCESS BANNER ─── */}
      {paymentSuccess && (
        <div style={{ background: '#10b981', color: 'white', textAlign: 'center', padding: '16px 20px', fontSize: '16px', fontWeight: 700 }}>
          🎉 Payment Successful! Your order has been confirmed. Thank you!
        </div>
      )}

      {/* ─── HEADER ─── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e5e5e5',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 14,
              background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 900, fontSize: 20,
            }}>O</div>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e' }}>OmniExchange</span>
          </div>

          <button onClick={() => setShowCart(true)} style={{
            position: 'relative', padding: '10px 14px', borderRadius: 14,
            border: '1px solid #e5e5e5', background: 'white', cursor: 'pointer',
            fontSize: 16,
          }}>
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                background: '#ef4444', color: 'white', fontSize: 11, fontWeight: 800,
                minWidth: 20, height: 20, borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{cartCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5, #10b981)',
          borderRadius: 24, padding: '48px 40px', color: 'white',
        }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>
            Buy & Sell Electronics
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 500, lineHeight: 1.5, marginBottom: 0 }}>
            Verified gadgets with secure Stripe payments. Click "Buy Now" on any item to pay instantly.
          </p>
        </div>
      </div>

      {/* ─── CATEGORIES ─── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{
              padding: '10px 22px', borderRadius: 50, border: 'none',
              background: category === cat ? '#4f46e5' : 'white',
              color: category === cat ? 'white' : '#64748b',
              fontWeight: 700, fontSize: 14, cursor: 'pointer',
              boxShadow: category === cat ? '0 4px 12px rgba(79,70,229,0.3)' : '0 1px 3px rgba(0,0,0,0.08)',
              whiteSpace: 'nowrap', transition: 'all 0.2s',
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* ─── PRODUCTS ─── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 60px' }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#94a3b8', marginBottom: 20 }}>
          {filtered.length} items
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 28,
        }}>
          {filtered.map(p => (
            <div key={p.id} style={{
              background: 'white', borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
            >
              {/* Image */}
              <div style={{ height: 220, background: '#f1f5f9', overflow: 'hidden' }}>
                <img src={p.image} alt={p.title} loading="lazy" style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.5s',
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </div>

              {/* Content */}
              <div style={{ padding: '24px 24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>{p.category}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, background: '#f1f5f9', color: '#64748b', padding: '3px 10px', borderRadius: 6 }}>{p.condition}</span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1a1a2e', marginBottom: 4, lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16, lineHeight: 1.4 }}>{p.subtitle}</p>

                <div style={{ fontSize: 26, fontWeight: 800, color: '#4f46e5', marginBottom: 20 }}>
                  {formatINR(p.price)}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={() => buyNow(p)}
                    disabled={paying}
                    style={{
                      flex: 1, padding: '14px 0', border: 'none', borderRadius: 14,
                      background: '#10b981', color: 'white', fontWeight: 700, fontSize: 15,
                      cursor: paying ? 'wait' : 'pointer', transition: 'all 0.2s',
                      opacity: paying ? 0.6 : 1,
                    }}
                  >
                    {paying ? '...' : 'Buy Now'}
                  </button>
                  <button
                    onClick={() => addToCart(p)}
                    style={{
                      flex: 1, padding: '14px 0', border: '2px solid #e5e5e5', borderRadius: 14,
                      background: 'white', color: '#1a1a2e', fontWeight: 700, fontSize: 15,
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    + Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: '1px solid #e5e5e5', padding: '32px 24px',
        textAlign: 'center', fontSize: 13, color: '#94a3b8',
      }}>
        © 2026 OmniExchange · Payments by <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'none' }}>Stripe</a>
      </footer>

      {/* ─── CART DRAWER ─── */}
      {showCart && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }} onClick={() => setShowCart(false)}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
          <div onClick={e => e.stopPropagation()} style={{
            position: 'absolute', top: 0, right: 0, width: '100%', maxWidth: 420,
            height: '100%', background: 'white', display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.3s ease',
          }}>
            {/* Cart Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 20, fontWeight: 800 }}>Cart ({cartCount})</h3>
              <button onClick={() => setShowCart(false)} style={{
                width: 36, height: 36, borderRadius: 18, border: 'none',
                background: '#fef2f2', color: '#ef4444', fontWeight: 800, cursor: 'pointer', fontSize: 16,
              }}>✕</button>
            </div>

            {/* Cart Items */}
            <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: 80 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
                  <p style={{ fontWeight: 600 }}>Cart is empty</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex', gap: 14, padding: 16, background: '#f8fafc',
                  border: '1px solid #e5e5e5', borderRadius: 16, marginBottom: 14,
                }}>
                  <img src={item.image} alt="" style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.title}</p>
                    <p style={{ fontWeight: 800, color: '#4f46e5', fontSize: 14 }}>{formatINR(item.price)} × {item.qty}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{
                    border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18, fontWeight: 700,
                  }}>✕</button>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div style={{ padding: 24, borderTop: '1px solid #e5e5e5', background: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 20, marginBottom: 20 }}>
                <span>Total</span>
                <span style={{ color: '#4f46e5' }}>{formatINR(cartTotal)}</span>
              </div>
              <button
                onClick={checkoutCart}
                disabled={cart.length === 0 || paying}
                style={{
                  width: '100%', padding: 16, border: 'none', borderRadius: 16,
                  background: cart.length === 0 ? '#cbd5e1' : '#10b981',
                  color: 'white', fontWeight: 800, fontSize: 16,
                  cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                {paying ? 'Redirecting to Stripe...' : 'Pay with Stripe'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TOASTS ─── */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: 'white', borderLeft: `4px solid ${t.type === 'success' ? '#10b981' : t.type === 'danger' ? '#ef4444' : '#4f46e5'}`,
            borderRadius: 14, boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
            padding: '14px 20px', fontSize: 14, fontWeight: 600, color: '#1a1a2e',
            animation: 'slideIn 0.3s ease',
          }}>
            {t.msg}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
