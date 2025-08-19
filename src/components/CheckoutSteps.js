// import { Nav } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";

// function CheckoutSteps({ step1, step2, step3, step4 }) {
//   return (
//     <Nav className="justify-content-center mb-4">
//       <Nav.Item>
//         {step1 ? (
//           <LinkContainer to="/login">
//             <Nav.Link>Login</Nav.Link>
//           </LinkContainer>
//         ) : (
//           <Nav.Link disabled>Login</Nav.Link>
//         )}
//       </Nav.Item>

//       <Nav.Item>
//         {step2 ? (
//           <LinkContainer to="/shipping">
//             <Nav.Link>Shipping</Nav.Link>
//           </LinkContainer>
//         ) : (
//           <Nav.Link disabled>Shipping</Nav.Link>
//         )}
//       </Nav.Item>

//       <Nav.Item>
//         {step3 ? (
//           <LinkContainer to="/payment">
//             <Nav.Link>Payment</Nav.Link>
//           </LinkContainer>
//         ) : (
//           <Nav.Link disabled>Payment</Nav.Link>
//         )}
//       </Nav.Item>

//       <Nav.Item>
//         {step4 ? (
//           <LinkContainer to="/placeorder">
//             <Nav.Link>Place Order</Nav.Link>
//           </LinkContainer>
//         ) : (
//           <Nav.Link disabled>Place Order</Nav.Link>
//         )}
//       </Nav.Item>
//     </Nav>
//   );
// }

// export default CheckoutSteps;
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

/**
 * CheckoutSteps Component
 *
 * This component renders the checkout progress steps (Login → Shipping → Payment → Place Order).
 * Each step becomes clickable if it's enabled (true), otherwise it is shown as disabled.
 *
 * Props:
 * - step1, step2, step3, step4 (booleans):
 *   Control which steps are active and clickable.
 * - currentStep (number):
 *   Indicates which step the user is currently on (1 → 4).
 */
function CheckoutSteps({ step1, step2, step3, step4, currentStep }) {
  // Define steps in an array for easier management and iteration
  const steps = [
    { step: step1, label: "Login", path: "/login" },
    { step: step2, label: "Shipping", path: "/shipping" },
    { step: step3, label: "Payment", path: "/payment" },
    { step: step4, label: "Place Order", path: "/placeorder" },
  ];

  return (
    // Bootstrap Nav component to align steps horizontally
    <Nav className="justify-content-center mb-4">
      {steps.map(({ step, label, path }, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep; // Check if this step is the current one

        return (
          <Nav.Item key={label}>
            {step ? (
              <LinkContainer to={path}>
                <Nav.Link active={isActive}>
                  {/* Highlight current step in bold */}
                  {isActive ? <strong>{label}</strong> : label}
                </Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>{label}</Nav.Link>
            )}
          </Nav.Item>
        );
      })}
    </Nav>
  );
}

export default CheckoutSteps;
