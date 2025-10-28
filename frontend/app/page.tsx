export default function Home() {
  return (
    <div className="container">
      <div className="hero">
        <h1>
          کوئٹہ ارسلان کیفے
        </h1>
        <p>
          Point of Sale System
        </p>
        
        <div className="nav-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <a 
            href="/pos" 
            className="nav-card card" 
            style={{ 
              textDecoration: 'none',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              color: '#333',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
            <h3>
              POS System
            </h3>
            <p>
              آرڈر لینے کے لیے
            </p>
          </a>

          <a 
            href="/pos/menu-management" 
            className="nav-card card" 
            style={{ 
              textDecoration: 'none',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              color: '#333',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3>
              مینیو کا انتظام
            </h3>
            <p>
              آئٹمز اور قیمتیں
            </p>
          </a>

          <a 
            href="/reports" 
            className="nav-card card" 
            style={{ 
              textDecoration: 'none',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              color: '#333',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3>
              رپورٹس
            </h3>
            <p>
              فروخت کی تفصیلات
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}
