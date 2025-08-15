// import { useRazorpay } from "react-razorpay";

// const OrderScreen = () => {
//   const { error, isLoading, Razorpay } = useRazorpay();

//   const handlePayment = () => {
//     const options = {
//       key: "rzp_test_ZmiQyb9ThJ3oWI",
//       amount: 50000, // Amount in paise
//       currency: "INR",
//       name: "Test Company",
//       description: "Test Transaction",
//       order_id: "order_9A33XWu170gUtm", // Generate order_id on server
//       handler: (response) => {
//         console.log(response);
//         alert("Payment Successful!");
//       },
//       prefill: {
//         name: "John Doe",
//         email: "john.doe@example.com",
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     const razorpayInstance = new Razorpay(options);
//     razorpayInstance.open();
//   };

//   return (
//     <div>
//       <h1>Payment Page</h1>
//       {isLoading && <p>Loading Razorpay...</p>}
//       {error && <p>Error loading Razorpay: {error}</p>}
//       <button onClick={handlePayment} disabled={isLoading}>
//         Pay Now
//       </button>
//     </div>
//   );
// };

// export default OrderScreen;

import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deliverOrder, getOrderDetails } from "../actions/orderActions";
import {
  createRazorpayOrder,
  resetPaymentVerify,
  resetRazorpayOrder,
  verifyPayment,
} from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";

function OrderScreen() {
  const { id: orderId } = useParams(); // ✅ React Router v6
  const navigate = useNavigate(); // ✅ React Router v6
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const razorpayOrder = useSelector((state) => state.razorpayOrder);
  const { loading: loadingRazor, order: rzpOrder } = razorpayOrder;
  console.log(razorpayOrder);

  const paymentVerifyState = useSelector((state) => state.paymentVerify);
  const { loading: loadingVerify, success: successVerify } = paymentVerifyState;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    await dispatch(createRazorpayOrder(order.totalPrice));

    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: rzpOrder?.key,
      amount: rzpOrder?.amount,
      currency: rzpOrder?.currency,
      order_id: rzpOrder?.order_id,
      name: "My Ecom Store",
      description: `Order #${order._id}`,
      handler: function (response) {
        dispatch(
          verifyPayment({
            order_id: rzpOrder.order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
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
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (
      !order ||
      order._id !== Number(orderId) ||
      successVerify ||
      successDeliver
    ) {
      dispatch(resetRazorpayOrder());
      dispatch(resetPaymentVerify());
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    order,
    orderId,
    successVerify,
    successDeliver,
    navigate,
    userInfo,
  ]);

  useEffect(() => {
    if (successVerify) {
      alert("Payment Successful!");
      dispatch(resetRazorpayOrder());
      dispatch(resetPaymentVerify());
      dispatch(getOrderDetails(orderId));
    }
  }, [successVerify, dispatch, orderId]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

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
                          {item.qty} x ₹{item.price} = ₹
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

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>₹{order.itemsPrice}</Col>
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
                  {loadingRazor || loadingVerify ? (
                    <Loader />
                  ) : (
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={handlePayment}
                    >
                      Pay with Razorpay
                    </Button>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
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
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
