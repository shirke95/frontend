// // import { useEffect, useMemo, useState } from "react";
// // import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
// // // import { PayPalButton } from "react-paypal-button-v2";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import {
// //   deliverOrder,
// //   getOrderDetails,
// //   payOrder,
// // } from "../actions/orderActions";
// // import Loader from "../components/Loader";
// // import Message from "../components/Message";
// // import {
// //   ORDER_DELIVER_RESET,
// //   ORDER_PAY_RESET,
// // } from "../constants/orderConstants";

// // function OrderScreen() {
// //   const { id: orderId } = useParams(); // ✅ React Router v6 way
// //   const navigate = useNavigate(); // ✅ replaces history.push
// //   const dispatch = useDispatch();

// //   const [sdkReady, setSdkReady] = useState(false);

// //   const orderDetails = useSelector((state) => state.orderDetails);
// //   const { order, error, loading } = orderDetails;

// //   const orderPay = useSelector((state) => state.orderPay);
// //   const { loading: loadingPay, success: successPay } = orderPay;

// //   const orderDeliver = useSelector((state) => state.orderDeliver);
// //   const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

// //   const userLogin = useSelector((state) => state.userLogin);
// //   const { userInfo } = userLogin;

// //   // ✅ calculate itemsPrice without mutating Redux state
// //   const itemsPrice = useMemo(() => {
// //     if (!order?.orderItems) return 0;
// //     return order.orderItems
// //       .reduce((acc, item) => acc + item.price * item.qty, 0)
// //       .toFixed(2);
// //   }, [order]);

// //   const addPayPalScript = () => {
// //     const script = document.createElement("script");
// //     script.type = "text/javascript";
// //     script.src =
// //       "https://www.paypal.com/sdk/js?client-id=AeDXja18CkwFUkL-HQPySbzZsiTrN52cG13mf9Yz7KiV2vNnGfTDP0wDEN9sGlhZHrbb_USawcJzVDgn";
// //     script.async = true;
// //     script.onload = () => {
// //       setSdkReady(true);
// //     };
// //     document.body.appendChild(script);
// //   };

// //   useEffect(() => {
// //     if (!userInfo) {
// //       navigate("/login"); // ✅ replaced history.push
// //     }

// //     if (
// //       !order ||
// //       successPay ||
// //       successDeliver ||
// //       order._id !== Number(orderId)
// //     ) {
// //       dispatch({ type: ORDER_PAY_RESET });
// //       dispatch({ type: ORDER_DELIVER_RESET });

// //       dispatch(getOrderDetails(orderId));
// //     } else if (!order.isPaid) {
// //       if (!window.paypal) {
// //         addPayPalScript();
// //       } else {
// //         setSdkReady(true);
// //       }
// //     }
// //   }, [
// //     dispatch,
// //     order,
// //     orderId,
// //     successPay,
// //     successDeliver,
// //     userInfo,
// //     navigate,
// //   ]);

// //   const successPaymentHandler = (paymentResult) => {
// //     dispatch(payOrder(orderId, paymentResult));
// //   };

// //   const deliverHandler = () => {
// //     dispatch(deliverOrder(order));
// //   };

// //   return loading ? (
// //     <Loader />
// //   ) : error ? (
// //     <Message variant="danger">{error}</Message>
// //   ) : (
// //     <div>
// //       <h1>Order: {order._id}</h1>
// //       <Row>
// //         <Col md={8}>
// //           <ListGroup variant="flush">
// //             <ListGroup.Item>
// //               <h2>Shipping</h2>
// //               <p>
// //                 <strong>Name: </strong> {order.user.name}
// //               </p>
// //               <p>
// //                 <strong>Email: </strong>
// //                 <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
// //               </p>
// //               <p>
// //                 <strong>Shipping: </strong>
// //                 {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
// //                 {order.shippingAddress.postalCode},{" "}
// //                 {order.shippingAddress.country}
// //               </p>

// //               {order.isDelivered ? (
// //                 <Message variant="success">
// //                   Delivered on {order.deliveredAt}
// //                 </Message>
// //               ) : (
// //                 <Message variant="warning">Not Delivered</Message>
// //               )}
// //             </ListGroup.Item>

// //             <ListGroup.Item>
// //               <h2>Payment Method</h2>
// //               <p>
// //                 <strong>Method: </strong>
// //                 {order.paymentMethod}
// //               </p>
// //               {order.isPaid ? (
// //                 <Message variant="success">Paid on {order.paidAt}</Message>
// //               ) : (
// //                 <Message variant="warning">Not Paid</Message>
// //               )}
// //             </ListGroup.Item>

// //             <ListGroup.Item>
// //               <h2>Order Items</h2>
// //               {order.orderItems.length === 0 ? (
// //                 <Message variant="info">Order is empty</Message>
// //               ) : (
// //                 <ListGroup variant="flush">
// //                   {order.orderItems.map((item, index) => (
// //                     <ListGroup.Item key={index}>
// //                       <Row>
// //                         <Col md={1}>
// //                           <Image
// //                             src={item.image}
// //                             alt={item.name}
// //                             fluid
// //                             rounded
// //                           />
// //                         </Col>

// //                         <Col>
// //                           <Link to={`/product/${item.product}`}>
// //                             {item.name}
// //                           </Link>
// //                         </Col>

// //                         <Col md={4}>
// //                           {item.qty} X ${item.price} = $
// //                           {(item.qty * item.price).toFixed(2)}
// //                         </Col>
// //                       </Row>
// //                     </ListGroup.Item>
// //                   ))}
// //                 </ListGroup>
// //               )}
// //             </ListGroup.Item>
// //           </ListGroup>
// //         </Col>

// //         <Col md={4}>
// //           <Card>
// //             <ListGroup variant="flush">
// //               <ListGroup.Item>
// //                 <h2>Order Summary</h2>
// //               </ListGroup.Item>

// //               <ListGroup.Item>
// //                 <Row>
// //                   <Col>Items:</Col>
// //                   <Col>${itemsPrice}</Col>
// //                 </Row>
// //               </ListGroup.Item>

// //               <ListGroup.Item>
// //                 <Row>
// //                   <Col>Shipping:</Col>
// //                   <Col>${order.shippingPrice}</Col>
// //                 </Row>
// //               </ListGroup.Item>

// //               <ListGroup.Item>
// //                 <Row>
// //                   <Col>Tax:</Col>
// //                   <Col>${order.taxPrice}</Col>
// //                 </Row>
// //               </ListGroup.Item>

// //               <ListGroup.Item>
// //                 <Row>
// //                   <Col>Total:</Col>
// //                   <Col>${order.totalPrice}</Col>
// //                 </Row>
// //               </ListGroup.Item>

// //               {!order.isPaid && (
// //                 <ListGroup.Item>
// //                   {loadingPay && <Loader />}

// //                   {!sdkReady ? (
// //                     <Loader />
// //                   ) : (
// //                     // <PayPalButton
// //                     //   amount={order.totalPrice}
// //                     //   onSuccess={successPaymentHandler}
// //                     // />
// //                     <button onClick={() => successPaymentHandler({})}>
// //                       Pay Now
// //                     </button>
// //                   )}
// //                 </ListGroup.Item>
// //               )}
// //             </ListGroup>

// //             {loadingDeliver && <Loader />}
// //             {userInfo &&
// //               userInfo.isAdmin &&
// //               order.isPaid &&
// //               !order.isDelivered && (
// //                 <ListGroup.Item>
// //                   <Button
// //                     type="button"
// //                     className="btn btn-block"
// //                     onClick={deliverHandler}
// //                   >
// //                     Mark As Delivered
// //                   </Button>
// //                 </ListGroup.Item>
// //               )}
// //           </Card>
// //         </Col>
// //       </Row>
// //     </div>
// //   );
// // }

// // export default OrderScreen;
// import { useEffect, useMemo } from "react";
// import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { getOrderDetails, payOrder,  deliverOrder } from "../actions/orderActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import {
//   ORDER_DELIVER_RESET,
//   ORDER_PAY_RESET,
// } from "../constants/orderConstants";

// function OrderScreen() {
//   const { id: orderId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const orderDetails = useSelector((state) => state.orderDetails);
//   const { order, error, loading } = orderDetails;

//   const orderPay = useSelector((state) => state.orderPay);
//   const { loading: loadingPay, success: successPay } = orderPay;

//   const orderDeliver = useSelector((state) => state.orderDeliver);
//   const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   // ✅ calculate itemsPrice safely
//   const itemsPrice = useMemo(() => {
//     if (!order?.orderItems) return 0;
//     return order.orderItems
//       .reduce((acc, item) => acc + item.price * item.qty, 0)
//       .toFixed(2);
//   }, [order]);

//   const addRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (window.Razorpay) {
//       resolve(true);
//       return;
//     }
//     const script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     script.onload = () => {
//       resolve(true);
//     };
//     document.body.appendChild(script);
//   });
// };

//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/login");
//     }

//     if (
//       !order ||
//       successPay ||
//       successDeliver ||
//       order._id !== Number(orderId)
//     ) {
//       dispatch({ type: ORDER_PAY_RESET });
//       dispatch({ type: ORDER_DELIVER_RESET });
//       dispatch(getOrderDetails(orderId));
//     }
//     else if (!order.isPaid){
//       addRazorpayScript();
//     }
//   }, [
//     dispatch,
//     order,
//     orderId,
//     successPay,
//     successDeliver,
//     userInfo,
//     navigate,
//   ]);

//   // ✅ Razorpay Checkout Handler
//   const handleRazorpayPayment = () => {
//     if (!order) return;

//     const options = {
//       key: "rzp_test_R6fd0saEoS33VI", // 🔑 Replace with your Razorpay key_id
//       amount: order.totalPrice * 100, // amount in paise
//       currency: "INR",
//       name: "MyShop",
//       description: `Order #${order._id}`,
//       order_id: order.razorpayOrderId, // ideally from backend
//       handler: function (response) {
//         // response has: razorpay_payment_id, razorpay_order_id, razorpay_signature
//         dispatch(
//           payOrder(orderId, {
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             razorpaySignature: response.razorpay_signature,
//           })
//         );
//       },
//       prefill: {
//         name: order.user.name,
//         email: order.user.email,
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   // ✅ Add this back
//   const deliverHandler = () => {
//     dispatch(deliverOrder(order));
//   };

//   return loading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant="danger">{error}</Message>
//   ) : (
//     <div>
//       <h1>Order: {order._id}</h1>
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Name: </strong> {order.user.name}
//               </p>
//               <p>
//                 <strong>Email: </strong>
//                 <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
//               </p>
//               <p>
//                 <strong>Shipping: </strong>
//                 {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
//                 {order.shippingAddress.postalCode},{" "}
//                 {order.shippingAddress.country}
//               </p>

//               {order.isDelivered ? (
//                 <Message variant="success">
//                   Delivered on {order.deliveredAt}
//                 </Message>
//               ) : (
//                 <Message variant="warning">Not Delivered</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method: </strong>
//                 {order.paymentMethod}
//               </p>
//               {order.isPaid ? (
//                 <Message variant="success">Paid on {order.paidAt}</Message>
//               ) : (
//                 <Message variant="warning">Not Paid</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {order.orderItems.length === 0 ? (
//                 <Message variant="info">Order is empty</Message>
//               ) : (
//                 <ListGroup variant="flush">
//                   {order.orderItems.map((item, index) => (
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
//                           {item.qty} X ₹{item.price} = ₹
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
//                   <Col>₹{itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping:</Col>
//                   <Col>₹{order.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax:</Col>
//                   <Col>₹{order.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total:</Col>
//                   <Col>₹{order.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>

//               {!order.isPaid && (
//                 <ListGroup.Item>
//                   {loadingPay && <Loader />}

//                   <Button
//                     type="button"
//                     className="btn btn-primary w-100"
//                     onClick={handleRazorpayPayment}
//                   >
//                     Pay with Razorpay
//                   </Button>
//                 </ListGroup.Item>
//               )}
//             </ListGroup>

//             {loadingDeliver && <Loader />}
//             {userInfo &&
//               userInfo.isAdmin &&
//               order.isPaid &&
//               !order.isDelivered && (
//                 <ListGroup.Item>
//                   <Button
//                     type="button"
//                     className="btn btn-block"
//                     onClick={deliverHandler}
//                   >
//                     Mark As Delivered
//                   </Button>
//                 </ListGroup.Item>
//               )}
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default OrderScreen;

import { useEffect, useMemo } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";

/**
 * OrderScreen Component
 *
 * Displays detailed information about a single order.
 * Handles payment (Razorpay) and marking as delivered for admin users.
 */
function OrderScreen() {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );
  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  // Calculate items price safely
  const itemsPrice = useMemo(() => {
    if (!order?.orderItems) return 0;
    return order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }, [order]);

  // Load Razorpay script dynamically
  const addRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });

  useEffect(() => {
    if (!userInfo) navigate("/login");

    if (
      !order ||
      successPay ||
      successDeliver ||
      order._id !== Number(orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      addRazorpayScript();
    }
  }, [
    dispatch,
    order,
    orderId,
    successPay,
    successDeliver,
    userInfo,
    navigate,
  ]);

  // Razorpay payment handler
  const handleRazorpayPayment = () => {
    if (!order) return;

    const options = {
      key: "rzp_test_R6fd0saEoS33VI", // Replace with your Razorpay key_id
      amount: order.totalPrice * 100, // in paise
      currency: "INR",
      name: "MyShop",
      description: `Order #${order._id}`,
      order_id: order.razorpayOrderId, // from backend ideally
      handler: (response) => {
        dispatch(
          payOrder(orderId, {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          })
        );
      },
      prefill: {
        name: order.user.name,
        email: order.user.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Admin mark as delivered handler
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  // Render
  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        {/* Order Details */}
        <Col md={8}>
          <ListGroup variant="flush">
            {/* Shipping */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            {/* Payment */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
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
                          {item.qty} X ₹{item.price} = ₹
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>₹{itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  <Button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleRazorpayPayment}
                  >
                    Pay with Razorpay
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>

            {loadingDeliver && <Loader />}
            {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </Button>
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
