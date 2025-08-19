// import { useEffect } from "react";
// import { Carousel, Image } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { listTopProducts } from "../actions/productActions";
// import Loader from "./Loader";
// import Message from "./Message";

// function ProductCarousel() {
//   const dispatch = useDispatch();

//   const productTopRated = useSelector((state) => state.productTopRated);
//   const { error, loading, products } = productTopRated;

//   useEffect(() => {
//     dispatch(listTopProducts());
//   }, [dispatch]);

//   return loading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant="danger">{error}</Message>
//   ) : (
//     <Carousel pause="hover" className="bg-dark">
//       {products.map((product) => (
//         <Carousel.Item key={product._id}>
//           <Link to={`/product/${product._id}`}>
//             <Image src={product.image} alt={product.name} fluid />
//             <Carousel.Caption className="carousel.caption">
//               <h4>
//                 {product.name} (${product.price})
//               </h4>
//             </Carousel.Caption>
//           </Link>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// }

// export default ProductCarousel;
import { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { listTopProducts } from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";

function ProductCarousel() {
  const dispatch = useDispatch();

  const {
    error,
    loading,
    products = [],
  } = useSelector((state) => state.productTopRated);

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  // ✅ Format currency in INR
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(value);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <Carousel pause="hover" className="bg-dark rounded shadow-sm">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="d-block mx-auto"
            />
            <Carousel.Caption className="bg-opacity-75 bg-dark rounded p-2">
              <h5 className="fw-bold text-light">
                {product.name} — {formatCurrency(product.price)}
              </h5>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
