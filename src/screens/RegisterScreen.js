// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { useDispatch, useSelector } from "react-redux";
// import { register } from "../actions/userActions";
// import FormContainer from "../components/FormContainer";

// function RegisterScreen() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const redirect = location.search ? location.search.split("=")[1] : "/";

//   const userRegister = useSelector((state) => state.userRegister);
//   const { loading, error, userInfo } = userRegister;

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [userInfo, redirect, navigate]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match");
//     } else {
//       dispatch(register(name, email, password));
//     }
//   };

//   return (
//     <FormContainer>
//       <h1>Sign Up</h1>
//       {message && <Message variant="danger">{message}</Message>}
//       {error && <Message variant="danger">{error}</Message>}
//       {loading && <Loader />}
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="email">
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             required
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             required
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="confirmPassword">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             required
//             type="password"
//             placeholder="Confirm password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <br />
//         <Button type="submit" variant="primary">
//           Register
//         </Button>
//       </Form>
//       <Row className="py-3">
//         <Col>
//           Already have an account?{" "}
//           <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
//             Login
//           </Link>
//         </Col>
//       </Row>
//     </FormContainer>
//   );
// }

// export default RegisterScreen;
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage("");
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1 className="mb-4">Sign Up</h1>

      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="dark" className="w-100">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
