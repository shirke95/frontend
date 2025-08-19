// import React from 'react'
// import { Alert } from 'react-bootstrap'

// function Message({variant, children}) {
//   return (
//     <Alert variant={variant}>
//         {children}
//     </Alert>
//   )
// }

// export default Message
// import React from "react";
// import PropTypes from "prop-types";
// import { Alert } from "react-bootstrap";

// /**
//  * Message Component
//  *
//  * Reusable alert/message component using React-Bootstrap.
//  *
//  * Props:
//  * - variant: string (default "info") → controls alert color
//  * - children: node → content inside the alert
//  */
// function Message({ variant = "info", children }) {
//   return <Alert variant={variant}>{children}</Alert>;
// }

// // Type checking
// Message.propTypes = {
//   variant: PropTypes.string,
//   children: PropTypes.node.isRequired,
// };

// export default Message;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

/**
 * Message Component
 *
 * Reusable alert/message component using React-Bootstrap.
 * Supports dismissible alerts and optional auto-hide.
 *
 * Props:
 * - variant: string (default "info") → controls alert color
 * - children: node → content inside the alert
 * - dismissible: boolean (default false) → makes alert closable
 * - autoHide: number (optional) → milliseconds after which alert disappears
 */
function Message({ variant = "info", children, dismissible = false, autoHide }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timer;
    if (autoHide) {
      timer = setTimeout(() => setShow(false), autoHide);
    }
    return () => clearTimeout(timer);
  }, [autoHide]);

  if (!show) return null;

  return (
    <Alert
      variant={variant}
      dismissible={dismissible}
      onClose={() => setShow(false)}
    >
      {children}
    </Alert>
  );
}

// Type checking
Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
  dismissible: PropTypes.bool,
  autoHide: PropTypes.number,
};

export default Message;
// // Simple info message
// <Message>Welcome to the store!</Message>

// // Dismissible error message
// <Message variant="danger" dismissible>
//   Something went wrong!
// </Message>

// // Success message auto-hides after 3 seconds
// <Message variant="success" autoHide={3000}>
//   Order placed successfully!
// </Message>
