// import { useEffect, useState } from "react";
// import { Button, Col, Form, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getUserDetails, updateUserProfile } from "../actions/userActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

// function ProfileScreen() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const userDetails = useSelector((state) => state.userDetails);
//   const { loading, error, user } = userDetails;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;
//   // const { userInfo: loggedInUser } = userLogin;
//   const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
//   const { success } = userUpdateProfile;

//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/login");
//     } else {
//       if (!user || !user.name || success || userInfo._id !== user._id) {
//         dispatch({ type: USER_UPDATE_PROFILE_RESET });
//         dispatch(getUserDetails("profile"));
//         // dispatch(listMyOrders());
//       } else {
//         setName(user.name);
//         setEmail(user.email);
//       }
//     }
//   }, [dispatch, navigate, userInfo, user, success]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match");
//     } else {
//       dispatch(
//         updateUserProfile({
//           id: user._id,
//           name: name,
//           email: email,
//           password: password,
//         })
//       );
//       setMessage("");
//     }
//   };
//   return (
//     <Row>
//       <Col md={3}>
//         <h2>User Profile</h2>

//         {message && <Message variant="danger">{message}</Message>}
//         {error && <Message variant="danger">{error}</Message>}
//         {loading && <Loader />}
//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               required
//               type="name"
//               placeholder="Enter name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             ></Form.Control>
//           </Form.Group>

//           <Form.Group controlId="email">
//             <Form.Label>Email Address</Form.Label>
//             <Form.Control
//               required
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             ></Form.Control>
//           </Form.Group>

//           <Form.Group controlId="password">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             ></Form.Control>
//           </Form.Group>

//           <Form.Group controlId="passwordConfirm">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             ></Form.Control>
//           </Form.Group>

//           <Button type="submit" variant="primary">
//             Update
//           </Button>
//         </Form>
//       </Col>
//       <Col md={9}>
//         <h2>My Orders</h2>
//         {/* Orders list will go here */}
//       </Col>
//     </Row>
//   );
// }

// export default ProfileScreen;

// import { useEffect, useState } from "react";
// import { Button, Col, Form, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getUserDetails, updateUserProfile } from "../actions/userActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

// function ProfileScreen() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [message, setMessage] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, user } = useSelector((state) => state.userDetails);
//   const { userInfo } = useSelector((state) => state.userLogin);
//   const { success } = useSelector((state) => state.userUpdateProfile);

//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/login");
//     } else {
//       if (!user || !user.name || success || userInfo._id !== user._id) {
//         dispatch({ type: USER_UPDATE_PROFILE_RESET });
//         dispatch(getUserDetails("profile"));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           name: user.name,
//           email: user.email,
//         }));
//       }
//     }
//   }, [dispatch, navigate, userInfo, user, success]);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, email, password, confirmPassword } = formData;

//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match");
//     } else {
//       dispatch(updateUserProfile({ id: user._id, name, email, password }));
//       setMessage("");
//     }
//   };

//   return (
//     <Row>
//       {/* Profile Section */}
//       <Col md={3}>
//         <h2>User Profile</h2>

//         {message && <Message variant="danger">{message}</Message>}
//         {error && <Message variant="danger">{error}</Message>}
//         {success && <Message variant="success">Profile Updated!</Message>}
//         {loading && <Loader />}

//         <Form onSubmit={handleSubmit} className="mt-3">
//           <Form.Group className="mb-3" controlId="name">
//             <Form.Label>Name</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="email">
//             <Form.Label>Email Address</Form.Label>
//             <Form.Control
//               required
//               type="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="password">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter new password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="confirmPassword">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Confirm new password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Button type="submit" variant="dark" className="w-100">
//             Update Profile
//           </Button>
//         </Form>
//       </Col>

//       {/* Orders Section */}
//       <Col md={9}>
//         <h2>My Orders</h2>
//         {/* TODO: Add order list component */}
//       </Col>
//     </Row>
//   );
// }

// export default ProfileScreen;
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listMyOrders } from "../actions/orderActions";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux states
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdateProfile);

  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = useSelector((state) => state.orderListMy);

  // Fetch user details & orders
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setFormData((prev) => ({
          ...prev,
          name: user.name,
          email: user.email,
        }));
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  // Form handlers
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
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setMessage("");
    }
  };

  return (
    <Row>
      {/* Profile Section */}
      <Col md={3}>
        <h2>User Profile</h2>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated!</Message>}
        {loading && <Loader />}

        <Form onSubmit={handleSubmit} className="mt-3">
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
              type="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">
            Update Profile
          </Button>
        </Form>
      </Col>

      {/* Orders Section */}
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : orders && orders.length > 0 ? (
          <Table striped bordered hover responsive className="table-sm mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Message>No orders found</Message>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
