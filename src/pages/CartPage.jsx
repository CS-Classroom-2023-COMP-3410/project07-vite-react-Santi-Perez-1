import ShoppingCart from '../components/ShoppingCart';

function CartPage({ cartItems, onRemove, onClear }) {
  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ShoppingCart cartItems={cartItems} onRemove={onRemove} onClear={onClear} />
      )}
    </div>
  );
}
export default CartPage;
