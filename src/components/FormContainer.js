import { Col, Container, Row } from "react-bootstrap";

function FormContainer({ children }) {
  return (
    <Container className="py-3">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
