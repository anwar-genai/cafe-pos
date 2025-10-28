'use client';

import { useEffect, useState } from 'react';
import { menuApi, orderApi, MenuItem, Order } from '@/lib/api';
import { TrendingUp, Package, DollarSign, AlertCircle, ShoppingBag, Calendar } from 'lucide-react';

export default function ReportsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [items, ordersList] = await Promise.all([
        menuApi.getMenuItems(),
        orderApi.getOrders(),
      ]);
      setMenuItems(items);
      setOrders(ordersList);
      
      // Count items by category
      const catCount: { [key: string]: number } = {};
      items.forEach(item => {
        const cat = item.category || 'دیگر';
        catCount[cat] = (catCount[cat] || 0) + 1;
      });
      setCategories(catCount);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalItems = menuItems.length;
  const availableItems = menuItems.filter(item => item.is_available).length;
  const averagePrice = menuItems.length > 0 
    ? (menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length).toFixed(2)
    : 0;
  
  // Order statistics
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  // Get top 5 most expensive items
  const topExpensive = [...menuItems]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);

  // Get recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

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
        <h1 className="text-2xl font-bold">رپورٹس اور اعداد و شمار</h1>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div className="stat-card">
          <Package size={28} style={{ margin: '0 auto' }} />
          <div className="stat-value">{totalItems}</div>
          <div style={{ fontSize: '0.85rem' }}>کل آئٹمز</div>
        </div>

        <div className="stat-card">
          <TrendingUp size={28} style={{ margin: '0 auto' }} />
          <div className="stat-value">{availableItems}</div>
          <div style={{ fontSize: '0.85rem' }}>دستیاب آئٹمز</div>
        </div>

        <div className="stat-card">
          <ShoppingBag size={28} style={{ margin: '0 auto' }} />
          <div className="stat-value">{totalOrders}</div>
          <div style={{ fontSize: '0.85rem' }}>کل آرڈرز</div>
        </div>

        <div className="stat-card">
          <DollarSign size={28} style={{ margin: '0 auto' }} />
          <div className="stat-value">Rs. {totalRevenue}</div>
          <div style={{ fontSize: '0.85rem' }}>کل فروخت</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {/* Sales Stats */}
        <div className="card">
          <h2 className="text-lg font-bold mb-3">فروخت کی تفصیلات</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ 
              padding: '0.75rem', 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              borderRadius: '0.5rem'
            }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>اوسط آرڈر ویلیو</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Rs. {averageOrderValue}</div>
            </div>
            <div style={{ 
              padding: '0.75rem', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '0.5rem'
            }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>اوسط قیمت</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Rs. {averagePrice}</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="card">
          <h2 className="text-lg font-bold mb-3">زمروں کے لحاظ سے</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
            {Object.entries(categories)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => (
                <div 
                  key={cat}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    background: '#f9fafb',
                    borderRadius: '0.5rem',
                    alignItems: 'center'
                  }}
                >
                  <span className="font-bold badge-success" style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.8rem'
                  }}>
                    {count}
                  </span>
                  <span className="font-bold">{cat}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Top Expensive Items */}
        <div className="card">
          <h2 className="text-lg font-bold mb-3">مہنگے ترین آئٹمز</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
            {topExpensive.map((item, index) => (
              <div 
                key={item.id}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem',
                  background: index === 0 ? '#fef3c7' : '#f9fafb',
                  borderRadius: '0.5rem',
                  alignItems: 'center',
                  border: index === 0 ? '2px solid #f59e0b' : 'none',
                  fontSize: '0.85rem'
                }}
              >
                <span className="font-bold" style={{ color: '#059669' }}>
                  Rs. {item.price}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{item.name_ur}</span>
                  {index === 0 && <span style={{ fontSize: '1.1rem' }}>👑</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Calendar size={20} />
            حالیہ آرڈرز
          </h2>
          {totalOrders === 0 ? (
            <div className="text-center text-gray-600" style={{ padding: '2rem', fontSize: '0.9rem' }}>
              <p>ابھی تک کوئی آرڈر نہیں</p>
              <a href="/pos" className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }}>
                پہلا آرڈر لیں
              </a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
              {recentOrders.map((order) => (
                <div 
                  key={order.id}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    background: '#f9fafb',
                    borderRadius: '0.5rem',
                    alignItems: 'center',
                    fontSize: '0.85rem'
                  }}
                >
                  <span className="font-bold" style={{ color: '#059669' }}>
                    Rs. {order.total_amount}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <div className="font-bold">{order.order_number}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {new Date(order.created_at).toLocaleDateString('ur-PK')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: '1rem' }}>
        <div className="flex gap-2 flex-wrap">
          <a href="/pos/menu-management" className="btn btn-primary btn-sm">
            مینیو کا انتظام
          </a>
          <a href="/pos" className="btn btn-success btn-sm">
            POS سسٹم
          </a>
          <button onClick={loadData} className="btn btn-secondary btn-sm">
            تازہ کریں
          </button>
        </div>
      </div>
    </div>
  );
}
