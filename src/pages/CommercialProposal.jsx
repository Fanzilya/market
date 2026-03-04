{
  selectedRequest && (
    <div style={{
      marginBottom: 16,
      padding: '14px 16px',
      backgroundColor: `${PRIMARY}08`,
      borderRadius: 12,
      border: `1px solid ${PRIMARY_BORDER}`,
      fontSize: 13,
      color: '#475569',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="3" stroke={PRIMARY} strokeWidth="2" />
        </svg>
        <b>Объект:</b> {selectedRequest.objectName}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <b>Тип:</b> {selectedRequest.configType}
      </div>
    </div>
  )
}

{
  error && (
    <div style={styles.errorBox}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#fecaca" />
        <path d="M12 7V13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1.5" fill="#dc2626" />
      </svg>
      {error}
    </div>
  )
}

<form onSubmit={submitOffer}>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={styles.label}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle', marginRight: 4 }} xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke={PRIMARY} strokeWidth="2" />
          <path d="M12 6V12L16 14" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" />
        </svg>
        Цена *
      </div>
      <input
        value={offerPrice}
        onChange={(e) => setOfferPrice(e.target.value)}
        onFocus={() => setFocusedInput('price')}
        onBlur={() => setFocusedInput(null)}
        placeholder="Например: 1 250 000 ₽"
        style={{
          ...styles.input,
          ...(focusedInput === 'price' ? styles.inputFocus : {}),
        }}
      />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={styles.label}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle', marginRight: 4 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Ваши КП по этой заявке
      </div>
      <div style={{
        padding: '12px 14px',
        borderRadius: 10,
        backgroundColor: '#f8fafc',
        border: `1px solid #e2e8f0`,
        color: '#475569',
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        {myOffersForSelected.length === 0 ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#94a3b8" strokeWidth="2" />
              <path d="M8 12L11 14L16 9" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Пока нет отправленных КП
          </>
        ) : (
          <>
            <span style={styles.offerCount}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {myOffersForSelected.length}
            </span>
            отправлено
          </>
        )}
      </div>
    </div>
  </div>

  <div style={{ height: 16 }} />

  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={styles.label}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: 'middle', marginRight: 4 }} xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15C21 15.5523 20.5523 16 20 16H7L3 21V5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V15Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Комментарий / условия
    </div>
    <textarea
      value={offerComment}
      onChange={(e) => setOfferComment(e.target.value)}
      onFocus={() => setFocusedInput('comment')}
      onBlur={() => setFocusedInput(null)}
      placeholder="Сроки, условия, состав поставки и т.д."
      style={{
        ...styles.textarea,
        ...(focusedInput === 'comment' ? styles.inputFocus : {}),
      }}
    />
  </div>

  <div style={{ height: 20 }} />
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
    <button
      type="submit"
      style={{
        ...styles.button,
        ...(isPrimaryHovered ? styles.buttonHover : {}),
      }}
      onMouseEnter={() => setIsPrimaryHovered(true)}
      onMouseLeave={() => setIsPrimaryHovered(false)}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Отправить КП
    </button>
    <button
      type="button"
      onClick={() => setIsOfferOpen(false)}
      style={{
        ...styles.linkButton,
        ...(isLinkHovered ? styles.linkButtonHover : {}),
      }}
      onMouseEnter={() => setIsLinkHovered(true)}
      onMouseLeave={() => setIsLinkHovered(false)}
    >
      Отмена
    </button>
  </div>
</form>



function SupplierTile({ icon, title, value, empty, primary, hovered, onHover, onLeave }) {
  return (
    <div
      style={{
        ...tileStyles.tile,
        ...(hovered ? tileStyles.tileHover : {}),
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <p style={{ ...tileStyles.tileTitle, color: primary }}>
        {icon}
        {title}
      </p>
      <p style={{ ...tileStyles.tileValue, ...(empty ? tileStyles.emptyValue : {}) }}>
        {value}
      </p>
    </div>
  )
}

const tileStyles = {
  tile: {
    border: '1px solid #e2e8f0',
    borderRadius: 14,
    padding: 18,
    backgroundColor: '#f8fafc',
    transition: 'all 0.2s ease',
  },
  tileHover: {
    borderColor: '#4A85F6',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(74, 133, 246, 0.15)',
    transform: 'translateY(-2px)',
  },
  tileTitle: {
    margin: 0,
    fontSize: 11,
    fontWeight: 700,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  tileValue: {
    margin: 0,
    fontSize: 15,
    color: '#1e293b',
    fontWeight: 600,
    whiteSpace: 'pre-wrap',
    lineHeight: 1.5,
  },
  emptyValue: {
    color: '#94a3b8',
    fontStyle: 'italic',
  },
}
