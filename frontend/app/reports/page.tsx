'use client';

import { useEffect, useState } from 'react';
import { menuApi, MenuItem } from '@/lib/api';
import { TrendingUp, Package, DollarSign, AlertCircle } from 'lucide-react';

export default function ReportsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const items = await menuApi.getMenuItems();
      setMenuItems(items);
      
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
  const highestPrice = menuItems.length > 0
    ? Math.max(...menuItems.map(item => item.price))
    : 0;
  const lowestPrice = menuItems.length > 0
    ? Math.min(...menuItems.map(item => item.price))
    : 0;

  // Get top 5 most expensive items
  const topExpensive = [...menuItems]
    .sort((a, b) => b.price - a.price)
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
      <div className="flex items-center justify-between mb-4" style={{ color: 'white' }}>
        <a href="/" className="btn btn-secondary btn-sm">
          واپس
        </a>
        <h1 className="text-2xl font-bold">رپورٹس اور اعداد و شمار</h1>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div className="stat-card">
          <Package size={32} style={{ margin: '0 auto' }} />
          <div className="stat-value">{totalItems}</div>
          <div style={{ fontSize: '0.9rem' }}>کل آئٹمز</div>
        </div>

        <div className="stat-card">
          <TrendingUp size={32} style={{ margin: '0 auto' }} />
          <div className="stat-value">{availableItems}</div>
          <div style={{ fontSize: '0.9rem' }}>دستیاب آئٹمز</div>
        </div>

        <div className="stat-card">
          <DollarSign size={32} style={{ margin: '0 auto' }} />
          <div className="stat-value">Rs. {averagePrice}</div>
          <div style={{ fontSize: '0.9rem' }}>اوسط قیمت</div>
        </div>

        <div className="stat-card">
          <AlertCircle size={32} style={{ margin: '0 auto' }} />
          <div className="stat-value">{totalItems - availableItems}</div>
          <div style={{ fontSize: '0.9rem' }}>غیر دستیاب</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Price Range */}
        <div className="card">
          <h2 className="text-xl font-bold mb-3">قیمتوں کی حد</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ 
              padding: '0.75rem', 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              borderRadius: '0.5rem'
            }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>زیادہ سے زیادہ</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Rs. {highestPrice}</div>
            </div>
            <div style={{ 
              padding: '0.75rem', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '0.5rem'
            }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>کم سے کم</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Rs. {lowestPrice}</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="card">
          <h2 className="text-xl font-bold mb-3">زمروں کے لحاظ سے</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                  <span className="font-bold" style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem'
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
          <h2 className="text-xl font-bold mb-3">مہنگے ترین آئٹمز</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                  border: index === 0 ? '2px solid #f59e0b' : 'none'
                }}
              >
                <span className="font-bold text-green-600" style={{ color: '#059669' }}>
                  Rs. {item.price}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{item.name_ur}</span>
                  {index === 0 && <span style={{ fontSize: '1.25rem' }}>👑</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2 className="text-xl font-bold mb-3">فوری رسائی</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/pos/menu-management" className="btn btn-primary">
            مینیو کا انتظام
          </a>
          <a href="/pos" className="btn btn-success">
            POS سسٹم
          </a>
          <button 
            onClick={loadData} 
            className="btn btn-secondary"
          >
            تازہ کریں
          </button>
        </div>
      </div>
    </div>
  );
}


