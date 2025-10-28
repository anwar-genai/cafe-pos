export default function Home() {
  return (
    <div className="container">
      <div className="hero">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          کوئٹہ ارسلان کیفے
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.95, marginBottom: '2.5rem' }}>
          Point of Sale System
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <a 
            href="/pos" 
            className="card" 
            style={{ 
              textDecoration: 'none',
              minWidth: '200px',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              color: '#333'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              POS System
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              آرڈر لینے کے لیے
            </p>
          </a>

          <a 
            href="/pos/menu-management" 
            className="card" 
            style={{ 
              textDecoration: 'none',
              minWidth: '200px',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              color: '#333'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              مینیو کا انتظام
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              آئٹمز اور قیمتیں
            </p>
          </a>

          <a 
            href="/reports" 
            className="card" 
            style={{ 
              textDecoration: 'none',
              minWidth: '200px',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              color: '#333'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              رپورٹس
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              فروخت کی تفصیلات
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}
