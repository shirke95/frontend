// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { listProductDetails, updateProduct } from "../actions/productActions";
// import FormContainer from "../components/FormContainer";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

// function ProductEditScreen({ match, history }) {
//   const productId = match.params.id;

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState(0);
//   const [image, setImage] = useState("");
//   const [brand, setBrand] = useState("");
//   const [category, setCategory] = useState("");
//   const [countInStock, setCountInStock] = useState(0);
//   const [description, setDescription] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const dispatch = useDispatch();

//   const productDetails = useSelector((state) => state.productDetails);
//   const { error, loading, product } = productDetails;

//   const productUpdate = useSelector((state) => state.productUpdate);
//   const {
//     error: errorUpdate,
//     loading: loadingUpdate,
//     success: successUpdate,
//   } = productUpdate;

//   useEffect(() => {
//     if (successUpdate) {
//       dispatch({ type: PRODUCT_UPDATE_RESET });
//       history.push("/admin/productlist");
//     } else {
//       if (!product.name || product._id !== Number(productId)) {
//         dispatch(listProductDetails(productId));
//       } else {
//         setName(product.name);
//         setPrice(product.price);
//         setImage(product.image);
//         setBrand(product.brand);
//         setCategory(product.category);
//         setCountInStock(product.countInStock);
//         setDescription(product.description);
//       }
//     }
//   }, [dispatch, product, productId, history, successUpdate]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(
//       updateProduct({
//         _id: productId,
//         name,
//         price,
//         image,
//         brand,
//         category,
//         countInStock,
//         description,
//       })
//     );
//   };

//   const uploadFileHandler = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();

//     formData.append("image", file);
//     formData.append("product_id", productId);

//     setUploading(true);

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/products/upload/",
//         formData,
//         config
//       );

//       setImage(data);
//       setUploading(false);
//     } catch (error) {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <Link to="/admin/productlist">Go Back</Link>

//       <FormContainer>
//         <h1>Edit Product</h1>
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
//                 type="name"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId="price">
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter price"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId="image">
//               <Form.Label>Image</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter image"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//               ></Form.Control>

//               <Form.File
//                 id="image-file"
//                 label="Choose File"
//                 custom
//                 onChange={uploadFileHandler}
//               ></Form.File>
//               {uploading && <Loader />}
//             </Form.Group>

//             <Form.Group controlId="brand">
//               <Form.Label>Brand</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter brand"
//                 value={brand}
//                 onChange={(e) => setBrand(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId="countinstock">
//               <Form.Label>Stock</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter stock"
//                 value={countInStock}
//                 onChange={(e) => setCountInStock(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId="category">
//               <Form.Label>Category</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter category"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               ></Form.Control>
//             </Form.Group>

//             <Form.Group controlId="description">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               ></Form.Control>
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

// export default ProductEditScreen;

import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditScreen() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
  });

  const [uploading, setUploading] = useState(false);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product?.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setFormData({
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description,
        });
      }
    }
  }, [dispatch, navigate, product, productId, successUpdate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: productId, ...formData }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);
    data.append("product_id", productId);

    setUploading(true);
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post("/api/products/upload/", data, config);
      setFormData((prev) => ({ ...prev, image: res.data }));
    } catch (err) {
      console.error("File upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={handleChange}
              />
              <Form.Control
                type="file"
                label="Choose File"
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={formData.countInStock}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default ProductEditScreen;
