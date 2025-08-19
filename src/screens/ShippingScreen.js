// import { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { saveShippingAddress } from "../actions/cartActions";
// import CheckoutSteps from "../components/CheckoutSteps";
// import FormContainer from "../components/FormContainer";

// function ShippingScreen() {
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [address, setAddress] = useState(shippingAddress.address);
//   const [city, setCity] = useState(shippingAddress.city);
//   const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
//   const [country, setCountry] = useState(shippingAddress.country);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(saveShippingAddress({ address, city, postalCode, country }));
//     navigate("/payment");
//   };

//   return (
//     <FormContainer>
//       <CheckoutSteps step1 step2 />
//       <h1>Shipping</h1>
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId="address">
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter address"
//             value={address ? address : ""}
//             onChange={(e) => setAddress(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="city">
//           <Form.Label>City</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter city"
//             value={city ? city : ""}
//             onChange={(e) => setCity(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="postalCode">
//           <Form.Label>Postal Code</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter postal code"
//             value={postalCode ? postalCode : ""}
//             onChange={(e) => setPostalCode(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group controlId="country">
//           <Form.Label>Country</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter country"
//             value={country ? country : ""}
//             onChange={(e) => setCountry(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button type="submit" variant="primary">
//           Continue
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// }

// export default ShippingScreen;
// import { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { saveShippingAddress } from "../actions/cartActions";
// import CheckoutSteps from "../components/CheckoutSteps";
// import FormContainer from "../components/FormContainer";

// function ShippingScreen() {
//   const { shippingAddress } = useSelector((state) => state.cart);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     address: shippingAddress?.address || "",
//     city: shippingAddress?.city || "",
//     postalCode: shippingAddress?.postalCode || "",
//     country: shippingAddress?.country || "",
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(saveShippingAddress(formData));
//     navigate("/payment");
//   };

//   return (
//     <FormContainer>
//       <CheckoutSteps step1 step2 />
//       <h1 className="mb-4">Shipping</h1>

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="address">
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter address"
//             value={formData.address}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="city">
//           <Form.Label>City</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter city"
//             value={formData.city}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="postalCode">
//           <Form.Label>Postal Code</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter postal code"
//             value={formData.postalCode}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Form.Group className="mb-4" controlId="country">
//           <Form.Label>Country</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter country"
//             value={formData.country}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Button type="submit" variant="dark" className="w-100">
//           Continue
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// }

// export default ShippingScreen;
// import { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { saveShippingAddress } from "../actions/cartActions";
// import CheckoutSteps from "../components/CheckoutSteps";
// import FormContainer from "../components/FormContainer";

// function ShippingScreen() {
//   const { shippingAddress } = useSelector((state) => state.cart);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     address: shippingAddress?.address || "",
//     city: shippingAddress?.city || "",
//     postalCode: shippingAddress?.postalCode || "",
//     country: shippingAddress?.country || "India",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));

//     // Clear error for that field when user types
//     setErrors((prev) => ({ ...prev, [id]: "" }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";

//     if (!formData.postalCode) {
//       newErrors.postalCode = "Postal Code is required";
//     } else if (!/^\d{4,6}$/.test(formData.postalCode)) {
//       newErrors.postalCode = "Postal Code must be 4–6 digits";
//     }

//     if (!formData.country.trim()) newErrors.country = "Country is required";

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     dispatch(saveShippingAddress(formData));
//     navigate("/payment");
//   };

//   return (
//     <FormContainer>
//       <CheckoutSteps step1 step2 />
//       <h1 className="mb-4">Shipping</h1>

//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="address">
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter address"
//             value={formData.address}
//             onChange={handleChange}
//             isInvalid={!!errors.address}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.address}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="city">
//           <Form.Label>City</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter city"
//             value={formData.city}
//             onChange={handleChange}
//             isInvalid={!!errors.city}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.city}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="postalCode">
//           <Form.Label>Postal Code</Form.Label>
//           <Form.Control
//             required
//             type="text"
//             placeholder="Enter postal code"
//             value={formData.postalCode}
//             onChange={handleChange}
//             isInvalid={!!errors.postalCode}
//           />
//           <Form.Control.Feedback type="invalid">
//             {errors.postalCode}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group className="mb-4" controlId="country">
//           <Form.Label>Country</Form.Label>
//           <Form.Select
//             required
//             value={formData.country}
//             onChange={handleChange}
//             isInvalid={!!errors.country}
//           >
//             <option value="">Select Country</option>
//             <option value="India">India</option>
//             <option value="USA">United States</option>
//             <option value="UK">United Kingdom</option>
//             <option value="Canada">Canada</option>
//             <option value="Australia">Australia</option>
//           </Form.Select>
//           <Form.Control.Feedback type="invalid">
//             {errors.country}
//           </Form.Control.Feedback>
//         </Form.Group>

//         <Button
//           type="submit"
//           variant="dark"
//           className="w-100"
//           disabled={Object.keys(errors).length > 0}
//         >
//           Continue
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// }

// export default ShippingScreen;
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

function ShippingScreen() {
  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
    state: shippingAddress?.state || "",
    country: shippingAddress?.country || "India",
  });

  const [errors, setErrors] = useState({});
  const [loadingPin, setLoadingPin] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // clear error for that field
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handlePostalLookup = async () => {
    if (!/^\d{6}$/.test(formData.postalCode)) {
      setErrors((prev) => ({
        ...prev,
        postalCode: "Postal Code must be 6 digits",
      }));
      return;
    }

    setLoadingPin(true);
    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${formData.postalCode}`
      );
      const data = await res.json();

      if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
        const office = data[0].PostOffice[0];
        setFormData((prev) => ({
          ...prev,
          city: office.District,
          state: office.State,
          country: "India",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          postalCode: "Invalid Postal Code",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        postalCode: "Failed to fetch postal details",
      }));
    }
    setLoadingPin(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode) {
      newErrors.postalCode = "Postal Code is required";
    } else if (!/^\d{6}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postal Code must be 6 digits";
    }
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(saveShippingAddress(formData));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="mb-4">Shipping</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
            isInvalid={!!errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>Postal Code (PIN)</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              required
              type="text"
              placeholder="Enter postal code"
              value={formData.postalCode}
              onChange={handleChange}
              isInvalid={!!errors.postalCode}
            />
            <Button
              variant="secondary"
              type="button"
              onClick={handlePostalLookup}
              disabled={loadingPin}
            >
              {loadingPin ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Lookup"
              )}
            </Button>
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.postalCode}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            isInvalid={!!errors.city}
          />
          <Form.Control.Feedback type="invalid">
            {errors.city}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Auto-filled state"
            value={formData.state}
            onChange={handleChange}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            value={formData.country}
            onChange={handleChange}
            readOnly
          />
        </Form.Group>

        <Button type="submit" variant="dark" className="w-100">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
