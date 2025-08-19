// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../actions/userActions";
// import FormContainer from "../components/FormContainer";
// function LoginScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const redirect = location.search ? location.search.split("=")[1] : "/";

//   const userLogin = useSelector((state) => state.userLogin);
//   const { loading, error, userInfo } = userLogin;

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [userInfo, redirect, navigate]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(login(email, password));
//   };

//   return (
//     <FormContainer>
//       <h1>Sign In</h1>
//       {error && <Message variant="danger">{error}</Message>}
//       {loading && <Loader />}
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId="email">
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>
//         <br />
//         <Button type="submit" variant="primary">
//           Sign In
//         </Button>
//       </Form>
//       <Row className="py-3">
//         <Col>
//           New Customer?{" "}
//           <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
//             Register
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// }

// export default LoginScreen;
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

/**
 * LoginScreen Component
 *
 * Handles user login with email and password.
 * Redirects to a specified page after successful login.
 */
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract redirect path from query string or default to "/"
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  // Get user login state from Redux
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  // Form submission handler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className="mb-4">Sign In</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
