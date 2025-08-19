// import { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

// function SearchBox() {
//   const [keyword, setKeyword] = useState("");

//   let history = useHistory();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (keyword) {
//       history.push(`/?keyword=${keyword}&page=1`);
//     } else {
//       history.push(history.push(history.location.pathname));
//     }
//   };
//   return (
//     <Form onSubmit={submitHandler} inline>
//       <Form.Control
//         type="text"
//         name="q"
//         onChange={(e) => setKeyword(e.target.value)}
//         className="mr-sm-2 ml-sm-5"
//       ></Form.Control>

//       <Button type="submit" variant="outline-success" className="p-2">
//         Submit
//       </Button>
//     </Form>
//   );
// }

// export default SearchBox;
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * SearchBox Component with live autocomplete
 *
 * Fetches product suggestions from backend while typing
 * and allows selecting a suggestion or submitting manually.
 */
function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  // Fetch product suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (keyword.trim()) {
        try {
          const { data } = await axios.get(`/api/products?keyword=${keyword}`);
          setSuggestions(data.slice(0, 5)); // limit results
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300); // debounce for smoother typing
    return () => clearTimeout(debounce);
  }, [keyword]);

  // Handle form submit
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setShowSuggestions(false);
    } else {
      navigate("/");
    }
  };

  // Handle clicking a suggestion
  const suggestionClickHandler = (suggestion) => {
    setKeyword(suggestion.name);
    setShowSuggestions(false);
    navigate(`/product/${suggestion._id}`);
  };

  return (
    <div className="position-relative me-3" style={{ minWidth: "250px" }}>
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search Products..."
          className="me-2"
          autoComplete="off"
        />
        <Button type="submit" variant="outline-light">
          <i className="fas fa-search"></i>
        </Button>
      </Form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ListGroup
          className="position-absolute w-100 shadow-sm"
          style={{ zIndex: 1000 }}
        >
          {suggestions.map((item) => (
            <ListGroup.Item
              key={item._id}
              action
              onClick={() => suggestionClickHandler(item)}
            >
              {item.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default SearchBox;
