// import { Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Rating from "./Rating";

// function Product({ product }) {
//   return (
//     <Card className="my-3 p-3 rounded">
//       <Link to={`/product/${product._id}`}>
//         <Card.Img src={product.image} />
//       </Link>

//       <Card.Body>
//         <Link to={`/product/${product._id}`}>
//           <Card.Title as="div">
//             <strong>{product.name}</strong>
//           </Card.Title>
//         </Link>

//         <Card.Text as="div">
//           <div className="my-3">
//             <Rating
//               value={product.rating}
//               text={`${product.numReviews} reviews`}
//               color={"#f8e825"}
//             />
//           </div>
//         </Card.Text>

//         <Card.Text as="h3">${product.price}</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }

// export default Product;
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

/**
 * Product Component
 *
 * Displays a single product card with image, name, rating, and price.
 *
 * Props:
 * - product: object → product data including _id, name, image, rating, numReviews, price
 */
// function Product({ product }) {
//   const { _id, name, image, rating, numReviews, price } = product;

//   return (
//     <Card className="my-3 p-3 rounded shadow-sm hover-shadow">
//       {/* Product Image */}
//       <Link to={`/product/${_id}`}>
//         <Card.Img src={image} alt={name} variant="top" />
//       </Link>

//       <Card.Body>
//         {/* Product Name */}
//         <Link to={`/product/${_id}`} className="text-decoration-none">
//           <Card.Title as="h5" className="mb-2">
//             <strong>{name}</strong>
//           </Card.Title>
//         </Link>

//         {/* Product Rating */}
//         <Card.Text as="div" className="mb-3">
//           <Rating
//             value={rating}
//             text={`${numReviews} reviews`}
//             color="#f8e825"
//           />
//         </Card.Text>

//         {/* Product Price */}
//         <Card.Text as="h6" className="text-primary">
//           ${price}
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }

// export default Product;

/**
 * Product Component
 *
 * Displays a single product card with image, name, rating, and price.
 *
 * Props:
 * - product: object → product data including _id, name, image, rating, numReviews, price
 */

/**
 * Product Component
 *
 * Displays a single product card with image, name, rating, and price.
 *
 * Props:
 * - product: object → product data including _id, name, image, rating, numReviews, price
 */
function Product({ product }) {
  const { _id, name, image, rating, numReviews, price } = product;

  // Format price in Indian Rupees
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

  return (
    <Card className="my-3 p-3 rounded shadow-sm hover-shadow h-100">
      <div className="d-flex flex-column h-100">
        {/* Product Image */}
        <Link to={`/product/${_id}`}>
          <Card.Img
            src={image}
            alt={name}
            variant="top"
            style={{ height: "200px", objectFit: "contain" }}
          />
        </Link>

        <Card.Body className="d-flex flex-column justify-content-between mt-3">
          {/* Product Name */}
          <Link to={`/product/${_id}`} className="text-decoration-none">
            <Card.Title as="h5" className="mb-2">
              <strong>{name}</strong>
            </Card.Title>
          </Link>

          {/* Product Rating */}
          <Card.Text as="div" className="mb-3">
            <Rating
              value={rating}
              text={`${numReviews} reviews`}
              color="#f8e825"
            />
          </Card.Text>

          {/* Product Price */}
          <Card.Text as="h6" className="text-primary mt-auto">
            {formattedPrice}
          </Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
}

export default Product;
