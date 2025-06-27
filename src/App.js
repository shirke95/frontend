import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Headers from "./components/Headers";
import HomeScreens from "./screens/HomeScreens";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <Router>
      <Headers />
      <main>
        <Container>
          <Routes>
            {/* Add more routes as needed */}{" "}
            <Route path="/" element={<HomeScreens />} />
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
