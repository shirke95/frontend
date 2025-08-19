// import { useEffect, useState } from "react";
// import { Button, Col, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
// import { savePaymentMethod } from "../actions/cartActions";
// import CheckoutSteps from "../components/CheckoutSteps";
// import FormContainer from "../components/FormContainer";

// function PaymentScreen() {
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // ✅ initialize navigate

//   const [paymentMethod, setPaymentMethod] = useState("PayPal");

//   useEffect(() => {
//     if (!shippingAddress.address) {
//       navigate("/shipping"); // ✅ replace history.push
//     }
//   }, [shippingAddress, navigate]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(savePaymentMethod(paymentMethod));
//     navigate("/placeorder"); // ✅ replace history.push
//   };

//   return (
//     <FormContainer>
//       <CheckoutSteps step1 step2 step3 />

//       <Form onSubmit={submitHandler}>
//         <Form.Group>
//           <Form.Label as="legend">Select Method</Form.Label>
//           <Col>
//             <Form.Check
//               type="radio"
//               label="PayPal or Credit Card"
//               id="paypal"
//               name="paymentMethod"
//               value="PayPal" // ✅ added value to store correctly
//               checked={paymentMethod === "PayPal"}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             ></Form.Check>
//           </Col>
//         </Form.Group>

//         <Button type="submit" variant="primary">
//           Continue
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// }

// export default PaymentScreen;

import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

/**
 * PaymentScreen Component
 *
 * Allows the user to select a payment method and proceed to place order.
 */
function PaymentScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  // Redirect if shipping address is missing
  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      {/* Checkout steps indicator */}
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>
          <Col className="my-2">
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3 w-100">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
