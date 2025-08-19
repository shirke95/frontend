// import { useEffect } from "react";
// import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { createOrder } from "../actions/orderActions";
// import CheckoutSteps from "../components/CheckoutSteps";
// import Message from "../components/Message";
// import { ORDER_CREATE_RESET } from "../constants/orderConstants";

// function PlaceOrderScreen() {
//   const orderCreate = useSelector((state) => state.orderCreate);
//   const { order, error, success } = orderCreate;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const cart = useSelector((state) => state.cart);

//   // ✅ Calculate values locally instead of mutating cart state
//   const itemsPrice = cart.cartItems
//     .reduce((acc, item) => acc + item.price * item.qty, 0)
//     .toFixed(2);

//   const shippingPrice = (itemsPrice > 100 ? 0 : 10).toFixed(2);
//   const taxPrice = Number(0.082 * itemsPrice).toFixed(2);

//   const totalPrice = (
//     Number(itemsPrice) +
//     Number(shippingPrice) +
//     Number(taxPrice)
//   ).toFixed(2);

//   useEffect(() => {
//     if (!cart.paymentMethod) {
//       navigate("/payment");
//     }
//   }, [cart.paymentMethod, navigate]);

//   useEffect(() => {
//     if (success) {
//       navigate(`/order/${order._id}`);
//       dispatch({ type: ORDER_CREATE_RESET });
//     }
//   }, [success, navigate, order, dispatch]);

//   const placeOrder = () => {
//     dispatch(
//       createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice,
//         shippingPrice,
//         taxPrice,
//         totalPrice,
//       })
//     );
//   };

//   return (
//     <div>
//       <CheckoutSteps step1 step2 step3 step4 />
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Shipping: </strong>
//                 {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
//                 {cart.shippingAddress.postalCode},{" "}
//                 {cart.shippingAddress.country}
//               </p>
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method: </strong>
//                 {cart.paymentMethod}
//               </p>
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {cart.cartItems.length === 0 ? (
//                 <Message variant="info">Your cart is empty</Message>
//               ) : (
//                 <ListGroup variant="flush">
//                   {cart.cartItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ${item.price} = $
//                           {(item.qty * item.price).toFixed(2)}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>

//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items:</Col>
//                   <Col>${itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping:</Col>
//                   <Col>${shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax:</Col>
//                   <Col>${taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total:</Col>
//                   <Col>${totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 {error && <Message variant="danger">{error}</Message>}
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Button
//                   type="button"
//                   className="btn-block"
//                   disabled={cart.cartItems.length === 0}
//                   onClick={placeOrder}
//                 >
//                   Place Order
//                 </Button>
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default PlaceOrderScreen;
// import { useEffect, useMemo } from "react";
// import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { createOrder } from "../actions/orderActions";
// import CheckoutSteps from "../components/CheckoutSteps";
// import Message from "../components/Message";
// import { ORDER_CREATE_RESET } from "../constants/orderConstants";

// function PlaceOrderScreen() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const cart = useSelector((state) => state.cart || {});
//   const cartItems = cart.cartItems || [];
//   const shippingAddress = cart.shippingAddress || {};
//   const paymentMethod = cart.paymentMethod;

//   // Format prices in Indian Rupees
//   const formatINR = (num) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(num);

//   // Calculate prices
//   const itemsPrice = useMemo(() => {
//     return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
//   }, [cartItems]);

//   const shippingPrice = useMemo(
//     () => (itemsPrice > 1000 ? 0 : 50),
//     [itemsPrice]
//   ); // Free shipping above ₹1000
//   const taxPrice = useMemo(() => itemsPrice * 0.18, [itemsPrice]); // 18% GST
//   const totalPrice = useMemo(
//     () => itemsPrice + shippingPrice + taxPrice,
//     [itemsPrice, shippingPrice, taxPrice]
//   );

//   const orderCreate = useSelector((state) => state.orderCreate || {});
//   const { order, error, success } = orderCreate;

//   useEffect(() => {
//     if (!paymentMethod) navigate("/payment");
//   }, [paymentMethod, navigate]);

//   useEffect(() => {
//     if (success && order?._id) {
//       navigate(`/order/${order._id}`);
//       dispatch({ type: ORDER_CREATE_RESET });
//     }
//   }, [success, navigate, order, dispatch]);

//   const placeOrderHandler = () => {
//     dispatch(
//       createOrder({
//         orderItems: cartItems,
//         shippingAddress,
//         paymentMethod,
//         itemsPrice,
//         shippingPrice,
//         taxPrice,
//         totalPrice,
//       })
//     );
//   };

//   return (
//     <div>
//       <CheckoutSteps step1 step2 step3 step4 />
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             {/* Shipping Info */}
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Address:</strong> {shippingAddress.address},{" "}
//                 {shippingAddress.city} {shippingAddress.postalCode},{" "}
//                 {shippingAddress.country}
//               </p>
//             </ListGroup.Item>

//             {/* Payment Method */}
//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method:</strong> {paymentMethod}
//               </p>
//             </ListGroup.Item>

//             {/* Order Items */}
//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {cartItems.length === 0 ? (
//                 <Message variant="info">Your cart is empty</Message>
//               ) : (
//                 <ListGroup variant="flush">
//                   {cartItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row className="align-items-center">
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x {formatINR(item.price)} ={" "}
//                           {formatINR(item.qty * item.price)}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>

//         {/* Order Summary */}
//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items:</Col>
//                   <Col>{formatINR(itemsPrice)}</Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping:</Col>
//                   <Col>{formatINR(shippingPrice)}</Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>GST (18%):</Col>
//                   <Col>{formatINR(taxPrice)}</Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total:</Col>
//                   <Col>{formatINR(totalPrice)}</Col>
//                 </Row>
//               </ListGroup.Item>

//               {error && (
//                 <ListGroup.Item>
//                   <Message variant="danger">{error}</Message>
//                 </ListGroup.Item>
//               )}

//               <ListGroup.Item>
//                 <Button
//                   type="button"
//                   className="btn-block"
//                   disabled={cartItems.length === 0}
//                   onClick={placeOrderHandler}
//                 >
//                   Place Order
//                 </Button>
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default PlaceOrderScreen;

import { useEffect, useMemo } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart || {});

  // ✅ Ensure cartItems is stable using useMemo
  const cartItems = useMemo(() => cart.cartItems || [], [cart.cartItems]);
  const shippingAddress = cart.shippingAddress || {};
  const paymentMethod = cart.paymentMethod;

  // ✅ Format prices in Indian Rupees
  const formatINR = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(num);

  // ✅ Price calculations
  const itemsPrice = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    [cartItems]
  );

  const shippingPrice = useMemo(
    () => (itemsPrice > 1000 ? 0 : 50),
    [itemsPrice]
  ); // Free shipping above ₹1000
  const taxPrice = useMemo(() => itemsPrice * 0.18, [itemsPrice]); // 18% GST
  const totalPrice = useMemo(
    () => itemsPrice + shippingPrice + taxPrice,
    [itemsPrice, shippingPrice, taxPrice]
  );

  const orderCreate = useSelector((state) => state.orderCreate || {});
  const { order, error, success } = orderCreate;

  useEffect(() => {
    if (!paymentMethod) navigate("/payment");
  }, [paymentMethod, navigate]);

  useEffect(() => {
    if (success && order?._id) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, navigate, order, dispatch]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        {/* Left Side */}
        <Col md={8}>
          <ListGroup variant="flush">
            {/* Shipping Info */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {shippingAddress.address},{" "}
                {shippingAddress.city} {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>

            {/* Payment Method */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {paymentMethod}
              </p>
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className="align-items-center">
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {formatINR(item.price)} ={" "}
                          {formatINR(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Right Side - Order Summary */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>{formatINR(itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{formatINR(shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>GST (18%):</Col>
                  <Col>{formatINR(taxPrice)}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>{formatINR(totalPrice)}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
