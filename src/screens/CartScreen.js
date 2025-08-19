// import { useEffect } from "react";
// import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { addToCart, removeFromCart } from "../actions/cartActions";
// import Message from "../components/Message";

// function CartScreen({ match, history }) {
//   const productId = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const qty = location.search
//     ? Number(new URLSearchParams(location.search).get("qty"))
//     : 1;
//   // const qty = location.search ? Number(location.search.split('=')[1]) : 1
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   useEffect(() => {
//     if (productId.id) {
//       dispatch(addToCart(productId.id, qty));
//     }
//   }, [dispatch, productId.id, qty]);

//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const checkoutHandler = () => {
//     navigate(`/login?redirect=/shipping`);
//     // navigate("/shipping");
//   };

//   return (
//     <Row>
//       <Col md={8}>
//         <h1>Shopping Cart</h1>
//         {cartItems.length === 0 ? (
//           <Message variant="info">
//             Your cart is empty <Link to="/">Go Back</Link>
//           </Message>
//         ) : (
//           <ListGroup variant="flush">

//             {cartItems.map((item) => (

//               <ListGroup.Item key={item.product}>
//                 <Row>
//                   <Col md={2}>
//                     <Image src={item.image} alt={item.name} fluid rounded />
//                   </Col>
//                   <Col md={3}>
//                     <Link to={`/product/${item.product}`}>{item.name}</Link>
//                   </Col>

//                   <Col md={2}>${item.price}</Col>

//                   <Col md={3}>
//                     <select
//                       value={item.qty}
//                       onChange={(e) =>
//                         dispatch(
//                           addToCart(item.product, Number(e.target.value))
//                         )
//                       }
//                       className="form-control"
//                     >
//                       {Array.from(
//                         { length: item.countInStock },
//                         (_, i) => i + 1
//                       ).map((val) => (
//                         <option key={val} value={val}>
//                           {val}
//                         </option>
//                       ))}
//                     </select>
//                   </Col>

//                   <Col md={1}>
//                     <Button
//                       type="button"
//                       variant="light"
//                       onClick={() => removeFromCartHandler(item.product)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </Button>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//       </Col>

//       <Col md={4}>
//         <Card>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h2>
//                 Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
//                 items
//               </h2>
//               $
//               {cartItems
//                 .reduce((acc, item) => acc + item.qty * item.price, 0)
//                 .toFixed(2)}
//             </ListGroup.Item>
//           </ListGroup>

//           <ListGroup.Item>
//             <Button
//               type="button"
//               className="btn-block"
//               disabled={cartItems.length === 0}
//               onClick={checkoutHandler}
//             >
//               Proceed To Checkout
//             </Button>
//           </ListGroup.Item>
//         </Card>
//       </Col>
//     </Row>
//   );
// }

// export default CartScreen;

import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

/**
 * CartScreen Component
 *
 * Displays items in the shopping cart with quantity controls, subtotal, and checkout button.
 */
function CartScreen() {
  const { id: productId } = useParams(); // Destructured productId
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract quantity from query string
  const qty = location.search
    ? Number(new URLSearchParams(location.search).get("qty"))
    : 1;

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  // Remove item from cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Proceed to checkout
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  // Format currency in INR
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  // Total items and subtotal
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{formatPrice(item.price)}</Col>
                  <Col md={3}>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                      className="form-control"
                    >
                      {Array.from(
                        { length: item.countInStock },
                        (_, i) => i + 1
                      ).map((val) => (
                        <option key={val} value={val}>
                          {val}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({totalItems}) {totalItems === 1 ? "item" : "items"}
              </h2>
              <strong>{formatPrice(subtotal)}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block w-100"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
