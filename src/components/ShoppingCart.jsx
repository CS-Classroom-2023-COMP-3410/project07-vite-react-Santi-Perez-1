function ShoppingCart({ cartItems, onRemove, onClear }) {
  if (!cartItems || cartItems.length === 0) return null;

  const totalQty = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '12px', background: '#fff', marginBottom: '20px' }}>
      <h3 style={{ margin: 0, marginBottom: '8px' }}>
        Cart Summary ({totalQty} item{totalQty !== 1 ? 's' : ''})
      </h3>

      <p style={{ marginTop: 0, color: '#555' }}>Total: ${totalPrice.toFixed(2)}</p>

      <ul style={{ paddingLeft: '18px', margin: '10px 0' }}>
        {cartItems.map((item) => (
          <li key={item.id} style={{ marginBottom: '6px' }}>
            {item.title} (x{item.quantity}) - ${item.price.toFixed(2)}
            <button onClick={() => onRemove(item.id)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
              remove
            </button>
          </li>
        ))}
      </ul>

      <button onClick={onClear} style={{ cursor: 'pointer' }}>clear cart</button>
    </div>
  );
}
export default ShoppingCart;
