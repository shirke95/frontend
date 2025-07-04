import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';

const CartScreen = ({match}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Get productId and qty from URL
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('productId');
  const qty = Number(searchParams.get('qty')) || 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  // const removeFromCartHandler = (id) => {
  //   dispatch(removeFromCart(id));
  // };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <div className="cart-screen">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty. <Link to="/">Go Back</Link>
        </div>
      ) : (
        <div className="cart-content">
          <ul>
            {cartItems.map((item) => (
              <li key={item.product} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} width="80" />
                </div>
                <div className="cart-item-details">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <div>${item.price}</div>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  {/* <button
                    type="button"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    Remove
                  </button> */}
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h2>
            <div>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </div>
            <button
              type="button"
              className="btn"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;