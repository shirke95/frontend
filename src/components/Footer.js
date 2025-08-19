// import { Container, Row, Col } from "react-bootstrap";

// function Footer() {
//   return (
//     <footer>
//       <Container>
//         <Row>
//           <Col className="text-center py-3">Copyright &copy; ecom</Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// }

// export default Footer;
import { Container } from "react-bootstrap";

/**
 * Footer Component
 *
 * A simple footer that stays at the bottom of the page.
 * Uses Bootstrap for responsive layout and alignment.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light border-top mt-auto py-3">
      <Container className="text-center text-muted">
        &copy; {currentYear} ecom. All rights reserved.
      </Container>
    </footer>
  );
}

export default Footer;
