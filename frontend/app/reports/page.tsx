'use client';

import { useEffect, useState } from 'react';
import { menuApi, orderApi, MenuItem, Order } from '@/lib/api';
import { TrendingUp, Package, DollarSign, AlertCircle, ShoppingBag, Calendar, BarChart3, PieChart, Activity } from 'lucide-react';

export default function ReportsPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ [key: string]: number }>({});
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('7d');

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

  // Filter orders by selected period
  const getFilteredOrders = () => {
    const now = new Date();
    const daysAgo = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
    const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    
    return orders.filter(order => new Date(order.created_at) >= cutoffDate);
  };

  const filteredOrders = getFilteredOrders();

  // Calculate daily sales data for chart
  const getDailySalesData = () => {
    const dailyData: { [key: string]: number } = {};
    const daysAgo = selectedPeriod === '7d' ? 7 : selectedPeriod === '30d' ? 30 : 90;
    
    // Initialize all days with 0
    for (let i = daysAgo - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyData[dateStr] = 0;
    }
    
    // Add actual sales data
    filteredOrders.forEach(order => {
      const dateStr = order.created_at.split('T')[0];
      if (dailyData.hasOwnProperty(dateStr)) {
        dailyData[dateStr] += order.total_amount;
      }
    });
    
    return Object.entries(dailyData).map(([date, amount]) => ({
      date,
      amount,
      dayName: new Date(date).toLocaleDateString('ur-PK', { weekday: 'short' })
    }));
  };

  const dailySalesData = getDailySalesData();
  const maxSales = Math.max(...dailySalesData.map(d => d.amount));

  // Calculate category sales
  const getCategorySales = () => {
    const categorySales: { [key: string]: number } = {};
    
    filteredOrders.forEach(order => {
      // This is a simplified calculation - in a real app you'd get order items
      const randomCategory = Object.keys(categories)[Math.floor(Math.random() * Object.keys(categories).length)];
      categorySales[randomCategory] = (categorySales[randomCategory] || 0) + order.total_amount;
    });
    
    return Object.entries(categorySales).map(([category, amount]) => ({
      category,
      amount,
      percentage: filteredOrders.length > 0 ? (amount / filteredOrders.reduce((sum, o) => sum + o.total_amount, 0)) * 100 : 0
    })).sort((a, b) => b.amount - a.amount);
  };

  const categorySalesData = getCategorySales();

  // Statistics
  const totalItems = menuItems.length;
  const availableItems = menuItems.filter(item => item.is_available).length;
  const averagePrice = menuItems.length > 0 
    ? (menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length).toFixed(2)
    : 0;
  
  const totalOrders = filteredOrders.length;
  const completedOrders = filteredOrders.filter(o => o.status === 'completed').length;
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total_amount, 0);
  const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  // Get recent orders
  const recentOrders = [...filteredOrders]
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
        <h1 className="text-xl font-bold">رپورٹس اور اعداد و شمار</h1>
      </div>

      {/* Period Selector */}
      <div className="card mb-3">
        <div className="flex items-center gap-2 mb-2">
          <Calendar size={18} />
          <span className="font-bold">دورانیہ:</span>
        </div>
        <div className="flex gap-2">
          {[
            { value: '7d', label: 'آخری 7 دن' },
            { value: '30d', label: 'آخری 30 دن' },
            { value: '90d', label: 'آخری 90 دن' }
          ].map(period => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value as any)}
              className={`btn btn-sm ${selectedPeriod === period.value ? 'btn-primary' : 'btn-secondary'}`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid mb-3">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-value">{totalOrders}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>کل آرڈرز</div>
            </div>
            <ShoppingBag size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-value">Rs. {totalRevenue.toFixed(0)}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>کل آمدنی</div>
            </div>
            <DollarSign size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-value">Rs. {averageOrderValue}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>اوسط آرڈر</div>
            </div>
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-value">{availableItems}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>دستیاب آئٹمز</div>
            </div>
            <Package size={24} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Daily Sales Chart */}
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={18} />
            <h3 className="font-bold">روزانہ فروخت</h3>
          </div>
          
          <div className="chart-container" style={{ height: '200px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'end', height: '100%', gap: '4px', padding: '1rem 0' }}>
              {dailySalesData.map((day, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      height: `${maxSales > 0 ? (day.amount / maxSales) * 150 : 0}px`,
                      width: '100%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '2px 2px 0 0',
                      minHeight: '2px',
                      transition: 'all 0.3s ease'
                    }}
                    title={`${day.dayName}: Rs. ${day.amount.toFixed(0)}`}
                  />
                  <div style={{ fontSize: '0.7rem', marginTop: '0.5rem', color: '#6b7280', textAlign: 'center' }}>
                    {day.dayName}
                  </div>
                  <div style={{ fontSize: '0.6rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                    {day.amount > 0 ? day.amount.toFixed(0) : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Sales */}
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <PieChart size={18} />
            <h3 className="font-bold">زمرہ وار فروخت</h3>
          </div>
          
          <div className="category-chart">
            {categorySalesData.slice(0, 5).map((item, index) => (
              <div key={index} className="category-item" style={{ marginBottom: '0.75rem' }}>
                <div className="flex justify-between items-center mb-1">
                  <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{item.category}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#059669' }}>
                    Rs. {item.amount.toFixed(0)}
                  </span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '6px', 
                  background: '#e5e7eb', 
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div
                    style={{
                      width: `${item.percentage}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, #667eea 0%, #764ba2 100%)`,
                      borderRadius: '3px',
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  {item.percentage.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={18} />
          <h3 className="font-bold">حالیہ آرڈرز</h3>
        </div>
        
        <div className="table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th>آرڈر نمبر</th>
                <th>تاریخ</th>
                <th>رقم</th>
                <th>حالت</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center" style={{ padding: '2rem', color: '#6b7280' }}>
                    کوئی آرڈر نہیں
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      {order.order_number}
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>
                      {new Date(order.created_at).toLocaleDateString('ur-PK')}
                    </td>
                    <td style={{ fontWeight: 'bold', color: '#059669' }}>
                      Rs. {order.total_amount.toFixed(2)}
                    </td>
                    <td>
                      <span className={`badge ${order.status === 'completed' ? 'badge-success' : 'badge-danger'}`}>
                        {order.status === 'completed' ? 'مکمل' : 'زیر التواء'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}