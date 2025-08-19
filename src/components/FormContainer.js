// import { Col, Container, Row } from "react-bootstrap";

// function FormContainer({ children }) {
//   return (
//     <Container className="py-3">
//       <Row className="justify-content-md-center">
//         <Col xs={12} md={6}>
//           {children}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default FormContainer;
// import { Col, Container, Row } from "react-bootstrap";

// /**
//  * FormContainer Component
//  *
//  * A reusable layout wrapper that centers forms horizontally
//  * and provides responsive sizing.
//  *
//  * Props:
//  * - children: The form or content to be rendered inside.
//  */
// function FormContainer({ children }) {
//   return (
//     <Container as="main" className="py-4">
//       <Row className="justify-content-center">
//         <Col xs={12} md={6} lg={5}>
//           {children}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default FormContainer;

import { Card, Col, Container, Row } from "react-bootstrap";

/**
 * FormContainer Component
 *
 * A reusable layout wrapper that centers forms inside a styled card.
 *
 * Props:
 * - children: The form or content to be rendered inside.
 * - title (string, optional): If provided, displays a heading above the form.
 */
function FormContainer({ children, title }) {
  return (
    <Container as="main" className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Body className="p-4">
              {title && (
                <h2 className="text-center mb-4 fw-bold text-primary">
                  {title}
                </h2>
              )}
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
