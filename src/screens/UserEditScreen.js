// import { useEffect, useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getUserDetails, updateUser } from "../actions/userActions";
// import FormContainer from "../components/FormContainer";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { USER_UPDATE_RESET } from "../constants/userConstants";

// function UserEditScreen({ match, history }) {
//   const userId = match.params.id;

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);

//   const dispatch = useDispatch();

//   const userDetails = useSelector((state) => state.userDetails);
//   const { error, loading, user } = userDetails;

//   const userUpdate = useSelector((state) => state.userUpdate);
//   const {
//     error: errorUpdate,
//     loading: loadingUpdate,
//     success: successUpdate,
//   } = userUpdate;

//   // ✅ Handle update success
//   useEffect(() => {
//     if (successUpdate) {
//       dispatch({ type: USER_UPDATE_RESET });
//       history.push("/admin/userlist");
//     }
//   }, [dispatch, history, successUpdate]);

//   // ✅ Fetch user details if missing or mismatched
//   useEffect(() => {
//     if (!user || !user.name || user._id !== userId) {
//       dispatch(getUserDetails(userId));
//     } else {
//       setName(user.name);
//       setEmail(user.email);
//       setIsAdmin(user.isAdmin);
//     }
//   }, [dispatch, user, userId]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
//   };

//   return (
//     <div>
//       <Link to="/admin/userlist">Go Back</Link>

//       <FormContainer>
//         <h1>Edit User</h1>
//         {loadingUpdate && <Loader />}
//         {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

//         {loading ? (
//           <Loader />
//         ) : error ? (
//           <Message variant="danger">{error}</Message>
//         ) : (
//           <Form onSubmit={submitHandler}>
//             <Form.Group controlId="name">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId="email">
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId="isadmin">
//               <Form.Check
//                 type="checkbox"
//                 label="Is Admin"
//                 checked={isAdmin}
//                 onChange={(e) => setIsAdmin(e.target.checked)}
//               ></Form.Check>
//             </Form.Group>

//             <Button type="submit" variant="primary">
//               Update
//             </Button>
//           </Form>
//         )}
//       </FormContainer>
//     </div>
//   );
// }

// export default UserEditScreen;

// import { useEffect, useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { getUserDetails, updateUser } from "../actions/userActions";
// import FormContainer from "../components/FormContainer";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { USER_UPDATE_RESET } from "../constants/userConstants";

// function UserEditScreen() {
//   const { id: userId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     isAdmin: false,
//   });

//   const { error, loading, user } = useSelector((state) => state.userDetails);

//   const {
//     error: errorUpdate,
//     loading: loadingUpdate,
//     success: successUpdate,
//   } = useSelector((state) => state.userUpdate);

//   // ✅ Handle successful update
//   useEffect(() => {
//     if (successUpdate) {
//       dispatch({ type: USER_UPDATE_RESET });
//       navigate("/admin/userlist");
//     }
//   }, [dispatch, navigate, successUpdate]);

//   // ✅ Fetch user details if missing/mismatched
//   useEffect(() => {
//     if (!user || !user.name || user._id !== userId) {
//       dispatch(getUserDetails(userId));
//     } else {
//       setFormData({
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//       });
//     }
//   }, [dispatch, user, userId]);

//   const handleChange = (e) => {
//     const { id, type, checked, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUser({ _id: user._id, ...formData }));
//   };

//   return (
//     <>
//       <Link to="/admin/userlist" className="btn btn-light mb-3">
//         Go Back
//       </Link>

//       <FormContainer>
//         <h1 className="mb-4">Edit User</h1>

//         {loadingUpdate && <Loader />}
//         {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

//         {loading ? (
//           <Loader />
//         ) : error ? (
//           <Message variant="danger">{error}</Message>
//         ) : (
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="name" className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="email" className="mb-3">
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="isAdmin" className="mb-4">
//               <Form.Check
//                 type="checkbox"
//                 label="Is Admin"
//                 checked={formData.isAdmin}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Button
//               type="submit"
//               variant="primary"
//               className="w-100"
//               disabled={loadingUpdate}
//             >
//               {loadingUpdate ? "Updating..." : "Update"}
//             </Button>
//           </Form>
//         )}
//       </FormContainer>
//     </>
//   );
// }

// export default UserEditScreen;

// import { useEffect, useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { getUserDetails, updateUser } from "../actions/userActions";
// import FormContainer from "../components/FormContainer";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { USER_UPDATE_RESET } from "../constants/userConstants";

// function UserEditScreen() {
//   const { id: userId } = useParams(); // ✅ replaces match.params.id
//   const navigate = useNavigate(); // ✅ replaces history.push

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);

//   const dispatch = useDispatch();

//   const { error, loading, user } = useSelector((state) => state.userDetails);

//   const {
//     error: errorUpdate,
//     loading: loadingUpdate,
//     success: successUpdate,
//   } = useSelector((state) => state.userUpdate);

//   // ✅ Handle update success
//   useEffect(() => {
//     if (successUpdate) {
//       dispatch({ type: USER_UPDATE_RESET });
//       navigate("/admin/userlist"); // ✅ replaces history.push
//     }
//   }, [dispatch, navigate, successUpdate]);

//   // // ✅ Fetch user details if missing/mismatched
//   // useEffect(() => {
//   //   if (!user || !user.name || user._id !== userId) {
//   //     dispatch(getUserDetails(userId));
//   //   } else {
//   //     setName(user.name);
//   //     setEmail(user.email);
//   //     setIsAdmin(user.isAdmin);
//   //   }
//   // }, [dispatch, user, userId]);
//   useEffect(() => {
//     // console.log("user in state:", user);
//     // console.log("param userId:", userId);

//     if (!user || !user.name || String(user._id) !== String(userId)) {
//       dispatch(getUserDetails(userId));
//     } else {
//       setName(user.name);
//       setEmail(user.email);
//       setIsAdmin(user.isAdmin);
//     }
//   }, [dispatch, user, userId]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
//   };

//   return (
//     <>
//       <Link to="/admin/userlist" className="btn btn-light mb-3">
//         Go Back
//       </Link>

//       <FormContainer>
//         <h1>Edit User</h1>
//         {loadingUpdate && <Loader />}
//         {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

//         {loading ? (
//           <Loader />
//         ) : error ? (
//           <Message variant="danger">{error}</Message>
//         ) : (
//           <Form onSubmit={submitHandler}>
//             <Form.Group controlId="name" className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="email" className="mb-3">
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="isAdmin" className="mb-3">
//               <Form.Check
//                 type="checkbox"
//                 label="Is Admin"
//                 checked={isAdmin}
//                 onChange={(e) => setIsAdmin(e.target.checked)}
//               />
//             </Form.Group>

//             <Button type="submit" variant="primary" className="w-100">
//               Update
//             </Button>
//           </Form>
//         )}
//       </FormContainer>
//     </>
//   );
// }

// export default UserEditScreen;
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

function UserEditScreen() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdate);

  // ✅ Redirect after update
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    }
  }, [dispatch, navigate, successUpdate]);

  // ✅ Fetch user details if not loaded / mismatched
  useEffect(() => {
    if (!user || String(user._id) !== String(userId)) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name || "");
      setEmail(user.email || "");
      setIsAdmin(!!user.isAdmin);
    }
  }, [dispatch, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  // ✅ Loading state
  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light mb-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="isAdmin" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default UserEditScreen;
