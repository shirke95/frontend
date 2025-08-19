// import { useEffect, useState } from "react";
// import { Col, Image, ListGroup, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { listProductDetails } from "../actions/productActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import Rating from "../components/Rating";

// function ProductScreen({ match }) {
//   const [qty, setQty] = useState(1);
//   const dispatch = useDispatch();
//   const productDetails = useSelector((state) => state.productDetails);
//   const { loading, error, product } = productDetails;
//   const productId = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(listProductDetails(productId.id));
//   }, [productId.id, dispatch]);

//   const addToCartHandler = () => {
//     // Navigate to the cart with the product ID and quantity
//     navigate(`/cart/${productId.id}?qty=${qty}`);
//     // window.location.href = `/cart/${id}?qty=${qty}`;
//   };

//   return (
//     <div>
//       <Link to="/" className="btn btn-light my-3">
//         Go Back
//       </Link>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : product ? (
//         <Row>
//           <Col md={6}>
//             <Image src={product.image} alt={product.name} fluid />
//           </Col>
//           <Col md={3}>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h3>{product.name}</h3>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Rating
//                   value={product.rating}
//                   text={product.numReviews}
//                   reviews
//                 />
//               </ListGroup.Item>
//               <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
//               <ListGroup.Item>
//                 Description: {product.description}
//               </ListGroup.Item>
//             </ListGroup>
//           </Col>
//           <Col md={3}>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Price:</Col>
//                   <Col>${product.price}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Status:</Col>
//                   <Col>
//                     {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
//                   </Col>{" "}
//                 </Row>
//               </ListGroup.Item>
//               {product.countInStock > 0 && (
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Qty</Col>
//                     <Col xs="auto" className="my-1">
//                       <select
//                         value={qty}
//                         onChange={(e) => setQty(e.target.value)}
//                         className="form-control"
//                       >
//                         {[...Array(product.countInStock).keys()].map((x) => (
//                           <option key={x + 1} value={x + 1}>
//                             {x + 1}
//                           </option>
//                         ))}
//                       </select>
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//               )}
//               <ListGroup.Item>
//                 <button
//                   onClick={addToCartHandler}
//                   className="btn btn-block btn-dark"
//                   type="button"
//                   disabled={product.countInStock === 0}
//                 >
//                   Add to Cart
//                 </button>
//               </ListGroup.Item>
//             </ListGroup>
//           </Col>
//         </Row>
//       ) : null}
//     </div>
//   );
// }

// export default ProductScreen;

import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (productId) {
      dispatch(listProductDetails(productId));
    }
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : product ? (
        <Row>
          {/* Product Image */}
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          {/* Product Details */}
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price:</strong> ₹{product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Purchase Section */}
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>₹{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    variant="dark"
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      ) : null}
    </>
  );
}

export default ProductScreen;
