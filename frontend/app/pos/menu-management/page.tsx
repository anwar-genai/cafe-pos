'use client';

import { useEffect, useState } from 'react';
import { menuApi, MenuItem, MenuItemCreate, MenuItemUpdate } from '@/lib/api';
import { Plus, Edit2, Trash2, X, Filter } from 'lucide-react';

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuItemCreate>({
    name_ur: '',
    name_en: '',
    price: 0,
    category: '',
    is_available: true,
  });

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
      setMenuItems(items);
      setCategories(cats);
    } catch (error) {
      console.error('Failed to load data:', error);
      alert('ڈیٹا لوڈ کرنے میں ناکامی');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await menuApi.createMenuItem(formData);
      setShowAddModal(false);
      setFormData({ name_ur: '', name_en: '', price: 0, category: '', is_available: true });
      loadData();
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('آئٹم شامل کرنے میں ناکامی');
    }
  };

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      const updateData: MenuItemUpdate = {
        name_ur: formData.name_ur,
        name_en: formData.name_en,
        price: formData.price,
        category: formData.category,
        is_available: formData.is_available,
      };
      await menuApi.updateMenuItem(editingItem.id, updateData);
      setShowEditModal(false);
      setEditingItem(null);
      setFormData({ name_ur: '', name_en: '', price: 0, category: '', is_available: true });
      loadData();
    } catch (error) {
      console.error('Failed to update item:', error);
      alert('آئٹم اپڈیٹ کرنے میں ناکامی');
    }
  };

  const handleDeleteItem = async (id: number, name: string) => {
    if (!confirm(`حذف: "${name}"؟`)) return;
    try {
      await menuApi.deleteMenuItem(id);
      loadData();
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('آئٹم حذف کرنے میں ناکامی');
    }
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name_ur: item.name_ur,
      name_en: item.name_en || '',
      price: item.price,
      category: item.category || '',
      is_available: item.is_available,
    });
    setShowEditModal(true);
  };

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
        <h1 className="text-2xl font-bold">مینیو کا انتظام</h1>
      </div>

      <div className="filter-controls">
        <button onClick={() => { setFormData({ name_ur: '', name_en: '', price: 0, category: '', is_available: true }); setShowAddModal(true); }} className="btn btn-success btn-sm">
          <Plus size={16} />
          نیا آئٹم
        </button>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: 'auto', minWidth: '150px', fontSize: '0.9rem', padding: '0.5rem' }}
        >
          <option value="">تمام ({menuItems.length})</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div style={{ marginRight: 'auto', color: 'white', fontSize: '0.9rem', padding: '0.5rem' }}>
          کل: {menuItems.length} آئٹمز
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '120px' }}>عمل</th>
                <th style={{ width: '80px' }}>دستیاب</th>
                <th style={{ width: '100px' }}>زمرہ</th>
                <th style={{ width: '100px' }}>قیمت</th>
                <th>اردو نام</th>
                <th style={{ width: '50px' }}>#</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(item)} className="btn btn-primary btn-sm">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDeleteItem(item.id, item.name_ur)} className="btn btn-danger btn-sm">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <span className={item.is_available ? 'badge badge-success' : 'badge badge-danger'}>
                      {item.is_available ? '✓' : '✗'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>{item.category || '-'}</td>
                  <td className="font-bold" style={{ color: '#059669' }}>Rs. {item.price}</td>
                  <td className="font-bold">{item.name_ur}</td>
                  <td style={{ color: '#6b7280' }}>{item.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {menuItems.length === 0 && (
            <p className="text-center text-gray-600" style={{ padding: '2rem' }}>کوئی آئٹم نہیں</p>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => setShowAddModal(false)} className="btn btn-sm" style={{ background: 'none', padding: '0.25rem' }}>
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold">نیا آئٹم شامل کریں</h2>
            </div>

            <form onSubmit={handleAddItem}>
              <div className="form-group">
                <label className="form-label">اردو نام *</label>
                <input type="text" value={formData.name_ur} onChange={(e) => setFormData({ ...formData, name_ur: e.target.value })} required />
              </div>

              <div className="form-group">
                <label className="form-label">قیمت (Rs.) *</label>
                <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} required min="0" step="0.01" />
              </div>

              <div className="form-group">
                <label className="form-label">زمرہ</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} list="categories" />
                <datalist id="categories">
                  {categories.map((cat) => <option key={cat} value={cat} />)}
                </datalist>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.is_available} onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })} style={{ width: 'auto' }} />
                  <span className="form-label" style={{ marginBottom: 0 }}>دستیاب ہے</span>
                </label>
              </div>

              <div className="flex gap-2" style={{ marginTop: '1rem' }}>
                <button type="submit" className="btn btn-success" style={{ flex: 1 }}>شامل کریں</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>منسوخ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingItem && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => setShowEditModal(false)} className="btn btn-sm" style={{ background: 'none', padding: '0.25rem' }}>
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold">ترمیم کریں</h2>
            </div>

            <form onSubmit={handleEditItem}>
              <div className="form-group">
                <label className="form-label">اردو نام *</label>
                <input type="text" value={formData.name_ur} onChange={(e) => setFormData({ ...formData, name_ur: e.target.value })} required />
              </div>

              <div className="form-group">
                <label className="form-label">قیمت (Rs.) *</label>
                <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} required min="0" step="0.01" />
              </div>

              <div className="form-group">
                <label className="form-label">زمرہ</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} list="categories" />
                <datalist id="categories">
                  {categories.map((cat) => <option key={cat} value={cat} />)}
                </datalist>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.is_available} onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })} style={{ width: 'auto' }} />
                  <span className="form-label" style={{ marginBottom: 0 }}>دستیاب ہے</span>
                </label>
              </div>

              <div className="flex gap-2" style={{ marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>اپ ڈیٹ</button>
                <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>منسوخ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
