'use client';

import { useEffect, useState } from 'react';
import { menuApi, orderApi, MenuItem } from '@/lib/api';
import { ShoppingCart, Plus, Minus, Trash2, Search, CheckCircle, X, AlertCircle } from 'lucide-react';

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [processingOrder, setProcessingOrder] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ orderNumber: string; totalAmount: number } | null>(null);

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
      setErrorMessage('ڈیٹا لوڈ کرنے میں ناکامی');
      setShowErrorModal(true);
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
    if (cart.length > 0) {
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
      const orderData = {
        items: cart.map(item => ({
          menu_item_id: item.id,
          quantity: item.quantity,
        })),
      };

      console.log('Creating order with data:', orderData);
      const order = await orderApi.createOrder(orderData);
      console.log('Order created successfully:', order);
      
      // Set completed order data
      setCompletedOrder({
        orderNumber: order.order_number,
        totalAmount: order.total_amount,
      });
      
      // Clear cart and close checkout modal
      setCart([]);
      setShowCheckoutModal(false);
      
      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Failed to create order:', error);
      setErrorMessage('آرڈر بنانے میں ناکامی۔ براہ کرم یقینی بنائیں کہ بیک اینڈ چل رہا ہے۔');
      setShowCheckoutModal(false);
      setShowErrorModal(true);
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
        <h1 className="text-xl font-bold">POS سسٹم</h1>
      </div>

      <div className="pos-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '0.75rem' }}>
        {/* Menu Section */}
        <div>
          <div className="filter-controls">
            <div className="search-container">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="تلاش..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">تمام</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <div style={{ marginRight: 'auto', color: 'white', fontSize: '0.8rem', padding: '0.4rem' }}>
              {filteredItems.length} آئٹمز
            </div>
          </div>

          <div className="menu-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="menu-item" onClick={() => addToCart(item)}>
                <h3>{item.name_ur}</h3>
                <div className="price">Rs. {item.price}</div>
                {item.category && <div className="category">{item.category}</div>}
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="card text-center" style={{ padding: '2rem' }}>
              <p className="text-gray-600">کوئی آئٹم نہیں</p>
            </div>
          )}
        </div>

        {/* Cart Section */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '1rem' }}>
            <div className="flex items-center justify-between mb-2">
              <button onClick={clearCart} className="btn btn-danger btn-xs" disabled={cart.length === 0}>
                <Trash2 size={12} />
              </button>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingCart size={18} />
                کارٹ ({cart.length})
              </h2>
            </div>

            <div className="cart-container" style={{ maxHeight: 'calc(100vh - 280px)', overflowY: 'auto', marginBottom: '0.75rem' }}>
              {cart.length === 0 ? (
                <p className="text-center text-gray-600" style={{ padding: '1.5rem', fontSize: '0.8rem' }}>خالی کارٹ</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="flex justify-between items-start mb-1">
                        <button onClick={() => updateQuantity(item.id, 0)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: '0' }}>
                          <Trash2 size={12} />
                        </button>
                        <div style={{ flex: 1, textAlign: 'right' }}>
                          <p className="font-bold" style={{ fontSize: '0.8rem' }}>{item.name_ur}</p>
                          <p style={{ fontSize: '0.7rem', color: '#6b7280' }}>Rs. {item.price}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="font-bold" style={{ color: '#059669', fontSize: '0.8rem' }}>Rs. {(item.price * item.quantity).toFixed(2)}</p>
                        <div className="cart-controls flex items-center gap-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '20px', height: '20px', borderRadius: '0.25rem', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Minus size={10} />
                          </button>
                          <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '20px', height: '20px', borderRadius: '0.25rem', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="cart-summary">
              <div className="cart-total">
                <p className="font-bold">کل:</p>
                <p className="amount">Rs. {calculateTotal().toFixed(2)}</p>
              </div>
              <button 
                onClick={() => setShowCheckoutModal(true)} 
                className="btn btn-success" 
                style={{ width: '100%' }} 
                disabled={cart.length === 0}
              >
                <CheckCircle size={16} />
                مکمل کریں
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Confirmation Modal */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget && !processingOrder) setShowCheckoutModal(false); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="order-confirmation">
              <div className="confirmation-icon">
                <CheckCircle size={32} color="white" />
              </div>

              <h2 className="text-lg font-bold mb-2">آرڈر کی تصدیق</h2>
              
              <div className="order-summary">
                <div className="order-summary-item">
                  <span>کل آئٹمز</span>
                  <span className="font-bold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                
                <div className="order-summary-item">
                  <span>کل رقم</span>
                  <span className="font-bold" style={{ color: '#059669' }}>
                    Rs. {calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <div style={{ 
                background: '#fef3c7', 
                border: '2px solid #f59e0b',
                borderRadius: '0.4rem',
                padding: '0.6rem',
                marginBottom: '1rem',
                fontSize: '0.8rem'
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
                    <span className="flex items-center gap-2" style={{ justifyContent: 'center' }}>
                      <span className="loading" style={{ width: '14px', height: '14px', borderWidth: '2px' }}></span>
                      جاری ہے...
                    </span>
                  ) : (
                    <>
                      <CheckCircle size={14} />
                      تصدیق کریں
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && completedOrder && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowSuccessModal(false); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="order-confirmation">
              <button 
                onClick={() => setShowSuccessModal(false)}
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                <X size={20} color="#6b7280" />
              </button>

              <div style={{ 
                width: '80px', 
                height: '80px', 
                margin: '0 auto 1rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle size={48} color="white" strokeWidth={3} />
              </div>

              <h2 className="text-xl font-bold mb-1" style={{ color: '#059669' }}>آرڈر مکمل!</h2>
              <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.8rem' }}>آپ کا آرڈر کامیابی سے محفوظ ہو گیا</p>
              
              <div style={{ 
                background: '#f9fafb', 
                borderRadius: '0.5rem', 
                padding: '1rem',
                marginBottom: '1rem',
                border: '2px solid #10b981'
              }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>آرڈر نمبر</p>
                  <p className="font-bold" style={{ 
                    fontFamily: 'monospace',
                    background: 'white',
                    padding: '0.4rem',
                    borderRadius: '0.4rem',
                    fontSize: '0.9rem'
                  }}>
                    {completedOrder.orderNumber}
                  </p>
                </div>
                
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem' }}>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>کل رقم</p>
                  <p className="text-xl font-bold" style={{ color: '#059669' }}>
                    Rs. {completedOrder.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <a 
                  href="/reports"
                  className="btn btn-secondary" 
                  style={{ flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  رپورٹس دیکھیں
                </a>
                <button 
                  onClick={() => setShowSuccessModal(false)} 
                  className="btn btn-success" 
                  style={{ flex: 1 }}
                >
                  نیا آرڈر
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowErrorModal(false); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="order-confirmation">
              <button 
                onClick={() => setShowErrorModal(false)}
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                <X size={20} color="#6b7280" />
              </button>

              <div style={{ 
                width: '60px', 
                height: '60px', 
                margin: '0 auto 1rem',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertCircle size={32} color="white" />
              </div>

              <h2 className="text-lg font-bold mb-1" style={{ color: '#dc2626' }}>خرابی!</h2>
              <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.8rem' }}>
                {errorMessage}
              </p>

              <div style={{ 
                background: '#fee2e2', 
                border: '2px solid #dc2626',
                borderRadius: '0.4rem',
                padding: '0.6rem',
                marginBottom: '1rem',
                fontSize: '0.75rem',
                textAlign: 'right'
              }}>
                <p className="font-bold" style={{ marginBottom: '0.25rem' }}>چیک کریں:</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li>✓ بیک اینڈ چل رہا ہے (http://localhost:8000)</li>
                  <li>✓ انٹرنیٹ کنکشن فعال ہے</li>
                </ul>
              </div>

              <button 
                onClick={() => setShowErrorModal(false)} 
                className="btn btn-danger" 
                style={{ width: '100%' }}
              >
                بند کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
