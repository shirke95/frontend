import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox"; // ✅ Import the search box

/**
 * Header Component
 *
 * Renders the top navigation bar with branding, cart, login/logout,
 * profile dropdown, and optional admin controls.
 */
function Header() {
  const dispatch = useDispatch();

  // Access user login state from Redux
  const { userInfo } = useSelector((state) => state.userLogin);

  // Handle user logout
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* Brand / Logo */}
          <LinkContainer to="/">
            <Navbar.Brand>E-com</Navbar.Brand>
          </LinkContainer>

          {/* Mobile toggle */}
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            {/* ✅ Search box aligned left */}
            <SearchBox />
            <Nav className="ms-auto">
              {/* Cart link */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart me-1"></i> Cart
                </Nav.Link>
              </LinkContainer>

              {/* User dropdown / login */}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user me-1"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin dropdown (only if user is admin) */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
