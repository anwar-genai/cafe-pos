'use client';

import { useEffect, useState } from 'react';
import { menuApi, orderApi, MenuItem } from '@/lib/api';
import { ShoppingCart, Plus, Minus, Trash2, Search, CheckCircle } from 'lucide-react';

interface CartItem extends MenuItem {
  quantity: number;
}

export default function POSPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [items, cats] = await Promise.all([
        menuApi.getMenuItems(selectedCategory || undefined),
        menuApi.getCategories(),
      ]);
      setMenuItems(items.filter(item => item.is_available));
      setCategories(cats);
    } catch (error) {
      console.error('Failed to load data:', error);
      alert('ڈیٹا لوڈ کرنے میں ناکامی');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    }
  };

  const clearCart = () => {
    if (cart.length > 0 && confirm('کارٹ خالی کریں؟')) {
      setCart([]);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (processingOrder) return;
    
    setProcessingOrder(true);
    try {
      // Create order through API
      const orderData = {
        items: cart.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
        })),
      };

      const order = await orderApi.createOrder(orderData);
      
      // Success! Clear cart and close modal
      setCart([]);
      setShowCheckoutModal(false);
      
      // Show success message
      alert(`✅ آرڈر مکمل!\n\nآرڈر نمبر: ${order.order_number}\nکل رقم: Rs. ${order.total_amount}`);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('آرڈر بنانے میں ناکامی۔ دوبارہ کوشش کریں۔');
    } finally {
      setProcessingOrder(false);
    }
  };

  const filteredItems = menuItems.filter(item =>
    item.name_ur.includes(searchTerm) || (item.name_en && item.name_en.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="container">
        <div className="text-center" style={{ paddingTop: '4rem', color: 'white' }}>
          <div className="loading" style={{ margin: '0 auto', borderTopColor: 'white' }}></div>
          <p className="text-xl" style={{ marginTop: '1rem' }}>لوڈ ہو رہا ہے...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-3" style={{ color: 'white' }}>
        <a href="/" className="btn btn-secondary btn-sm">واپس</a>
        <h1 className="text-2xl font-bold">POS سسٹم</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1rem' }}>
        {/* Menu Section */}
        <div>
          <div className="flex gap-2 mb-3 flex-wrap">
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={18} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              <input
                type="text"
                placeholder="تلاش..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingRight: '2.5rem' }}
              />
            </div>
            
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ width: 'auto', minWidth: '120px' }}>
              <option value="">تمام</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="menu-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="menu-item" onClick={() => addToCart(item)}>
                <h3 className="font-bold" style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{item.name_ur}</h3>
                <p className="font-bold" style={{ color: '#059669', fontSize: '1.1rem' }}>Rs. {item.price}</p>
                {item.category && <p style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.25rem' }}>{item.category}</p>}
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="card text-center" style={{ padding: '3rem' }}>
              <p className="text-gray-600">کوئی آئٹم نہیں</p>
            </div>
          )}
        </div>

        {/* Cart Section */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '1rem' }}>
            <div className="flex items-center justify-between mb-3">
              <button onClick={clearCart} className="btn btn-danger btn-sm" disabled={cart.length === 0}>
                <Trash2 size={14} />
              </button>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingCart size={20} />
                کارٹ ({cart.length})
              </h2>
            </div>

            <div style={{ maxHeight: 'calc(100vh - 320px)', overflowY: 'auto', marginBottom: '1rem' }}>
              {cart.length === 0 ? (
                <p className="text-center text-gray-600" style={{ padding: '2rem', fontSize: '0.9rem' }}>خالی کارٹ</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="flex justify-between items-start mb-2">
                        <button onClick={() => updateQuantity(item.id, 0)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '0' }}>
                          <Trash2 size={14} />
                        </button>
                        <div style={{ flex: 1, textAlign: 'right' }}>
                          <p className="font-bold" style={{ fontSize: '0.9rem' }}>{item.name_ur}</p>
                          <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>Rs. {item.price}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="font-bold" style={{ color: '#059669' }}>Rs. {(item.price * item.quantity).toFixed(2)}</p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '24px', height: '24px', borderRadius: '0.25rem', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Minus size={12} />
                          </button>
                          <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '24px', height: '24px', borderRadius: '0.25rem', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '1rem' }}>
              <div className="flex justify-between mb-3">
                <p className="text-xl font-bold" style={{ color: '#059669' }}>Rs. {calculateTotal().toFixed(2)}</p>
                <p className="text-xl font-bold">کل:</p>
              </div>
              <button 
                onClick={() => setShowCheckoutModal(true)} 
                className="btn btn-success" 
                style={{ width: '100%' }} 
                disabled={cart.length === 0}
              >
                <CheckCircle size={18} />
                مکمل کریں
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Confirmation Modal */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={() => !processingOrder && setShowCheckoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle size={48} color="white" />
              </div>

              <h2 className="text-xl font-bold mb-3">آرڈر کی تصدیق</h2>
              
              <div style={{ 
                background: '#f9fafb', 
                borderRadius: '0.75rem', 
                padding: '1rem',
                marginBottom: '1.5rem',
                textAlign: 'right'
              }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>کل آئٹمز</p>
                  <p className="font-bold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                </div>
                
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.25rem' }}>کل رقم</p>
                  <p className="text-2xl font-bold" style={{ color: '#059669' }}>
                    Rs. {calculateTotal().toFixed(2)}
                  </p>
                </div>
              </div>

              <div style={{ 
                background: '#fef3c7', 
                border: '2px solid #f59e0b',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                marginBottom: '1.5rem',
                fontSize: '0.85rem'
              }}>
                <p className="font-bold">کیا آپ یہ آرڈر مکمل کرنا چاہتے ہیں؟</p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setShowCheckoutModal(false)} 
                  className="btn btn-secondary" 
                  style={{ flex: 1 }}
                  disabled={processingOrder}
                >
                  منسوخ
                </button>
                <button 
                  onClick={handleCheckout} 
                  className="btn btn-success" 
                  style={{ flex: 1 }}
                  disabled={processingOrder}
                >
                  {processingOrder ? (
                    <span className="flex items-center gap-2">
                      <span className="loading" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>
                      جاری ہے...
                    </span>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      تصدیق کریں
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
