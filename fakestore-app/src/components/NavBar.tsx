import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/authSlice';
import { logoutUser } from '../firebase/authService';

const NavBar = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(setUser(null));
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          FakeStore
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Shop
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            🛍️    <Badge bg="light" text="dark">{totalCount}</Badge>
          </Nav.Link>
          {user ? (
            <>
              <Nav.Link as={Link} to="/profile">Hi, {user.name}</Nav.Link>
              <Nav.Link as={Link} to="/manage-products">Manage Products</Nav.Link>
              <Nav.Link as={Link} to="/orders">Order History</Nav.Link>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;