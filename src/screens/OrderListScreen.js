// import { useEffect } from "react";
// import { Button, Table } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { LinkContainer } from "react-router-bootstrap";
// import { listOrders } from "../actions/orderActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";

// function OrderListScreen({ history }) {
//   const dispatch = useDispatch();

//   const orderList = useSelector((state) => state.orderList);
//   const { loading, error, orders } = orderList;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     if (userInfo && userInfo.isAdmin) {
//       dispatch(listOrders());
//     } else {
//       history.push("/login");
//     }
//   }, [dispatch, history, userInfo]);

//   return (
//     <div>
//       <h1>Orders</h1>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <Table striped bordered hover responsive className="table-sm">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>USER</th>
//               <th>DATE</th>
//               <th>Total</th>
//               <th>PAID</th>
//               <th>DELIVERED</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.user && order.user.name}</td>
//                 <td>{order.createdAt.substring(0, 10)}</td>
//                 <td>${order.totalPrice}</td>

//                 <td>
//                   {order.isPaid ? (
//                     order.paidAt.substring(0, 10)
//                   ) : (
//                     <i className="fas fa-check" style={{ color: "red" }}></i>
//                   )}
//                 </td>

//                 <td>
//                   {order.isDelivered ? (
//                     order.deliveredAt.substring(0, 10)
//                   ) : (
//                     <i className="fas fa-check" style={{ color: "red" }}></i>
//                   )}
//                 </td>

//                 <td>
//                   <LinkContainer to={`/order/${order._id}`}>
//                     <Button variant="light" className="btn-sm">
//                       Details
//                     </Button>
//                   </LinkContainer>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// }

// export default OrderListScreen;

import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { listOrders } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

/**
 * OrderListScreen Component
 *
 * Displays a list of all orders for admin users.
 */
function OrderListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get order list from Redux state
  const { loading, error, orders } = useSelector((state) => state.orderList);

  // Get logged-in user info
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  // Format currency in INR
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  // Format date as YYYY-MM-DD
  const formatDate = (dateString) => dateString?.substring(0, 10);

  return (
    <div>
      <h1 className="mb-4">Orders</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td>{formatCurrency(order.totalPrice)}</td>

                <td>
                  {order.isPaid ? (
                    formatDate(order.paidAt)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    formatDate(order.deliveredAt)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrderListScreen;
